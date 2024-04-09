"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { generateRandomId as generateRandomUuid } from "@/lib/randomId";
import { useMutation, useQuery } from "@urql/next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ADD_CART, ADD_ITEMS } from "../cartList/query";
import AddCartItemForm from "./AddCartItemForm";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export default function AddCartForm() {
  const [cartId, setCartId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cartIdInLocalStorage = localStorage.getItem("cartId");

    if (!cartIdInLocalStorage) {
      cartIdInLocalStorage = generateRandomUuid(5);
    }
    setCartId(cartIdInLocalStorage);
  }, []);

  const [{ data, fetching, error }] = useQuery({
    query: ADD_CART,
    variables: { cartId },
    pause: !cartId,
  });

  const [, addCartItemMutation] = useMutation(ADD_ITEMS);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: null,
      quantity: null,
    },
  });

  function addItemsToCart(values: z.infer<typeof formSchema>) {
    const itemId = generateRandomUuid(5);
    addCartItemMutation({ cartId, ...values, id: itemId }).then((response) => {
      if (!response.error) {
        form.reset();
        router.push("/cartList");
      }
    });
  }

  return (
    <Card className="max-w-[500px] mx-auto flex-1 my-20">
      <CardHeader className="text-center text-2xl font-bold">
        Add Items to Cart
      </CardHeader>
      <CardContent>
        <AddCartItemForm form={form} handleAddItems={addItemsToCart} />
      </CardContent>
    </Card>
  );
}
