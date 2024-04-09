"use client";
import { useQuery } from "@urql/next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItems } from "./CartItems";
import { CartSummary } from "./CartSummary";
import { FETCH_CART_ITEMS } from "./query";

const CartList = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const cartIdInLocalStorage = localStorage.getItem("cartId");

    if (!cartIdInLocalStorage) {
      redirect("/");
    } else {
      setCartId(cartIdInLocalStorage);
    }
  }, []);

  const [{ data, fetching, error }] = useQuery({
    query: FETCH_CART_ITEMS,
    variables: { cartId },
    pause: !cartId,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-[800px] mx-auto py-10">
      <h2 className="text-center text-2xl font-bold">Cart List</h2>
      <CartTable data={data} />
    </div>
  );
};

const CartTable = ({ data }: any) => {
  return (
    <>
      <CartSummary cart={data?.cart} />
      <CartItems items={data?.cart?.items} />
    </>
  );
};

export default CartList;
