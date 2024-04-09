"use client";

import { generateRandomId } from "@/lib/randomId";
import { useEffect } from "react";
import AddCartForm from "./addcart/addCartForm";

export default function Home() {
  useEffect(() => {
    const cartIdInLocalStorage = localStorage.getItem("cartId");

    if (!cartIdInLocalStorage) {
      const uniqueId = generateRandomId();
      localStorage.setItem("cartId", uniqueId);
    }
  }, []);
  return (
    <main className="">
      <AddCartForm />
    </main>
  );
}
