"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateRandomId as generateRandomUuid } from "@/lib/randomId";
import { useMutation, useQuery } from "@urql/next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ADD_CART, ADD_ITEMS } from "../cartList/query";

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(addItemsToCart)}
            className="space-y-8"
          >
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please Enter  Product Name"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full md:w-1/2 px-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please enter a price"
                          type="number"
                          onChange={({ target: { value } }) =>
                            field.onChange(Number(value))
                          }
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full md:w-1/2 px-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please enter a quantity"
                          type="number"
                          onChange={({ target: { value } }) =>
                            field.onChange(parseInt(value))
                          }
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 flex h mx-auto mt-30 bg-amber-500"
            >
              Add to Cart
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
