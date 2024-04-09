"use client";
import { useQuery } from "@urql/next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FETCH_CART_ITEMS } from "./query";

const CartList = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  const [{ data, fetching, error }] = useQuery({
    query: FETCH_CART_ITEMS,
    variables: { cartId },
    pause: !cartId,
  });
  console.log(data, "data is her");
  useEffect(() => {
    const cartIdInLocalStorage = localStorage.getItem("cartId");

    if (!cartIdInLocalStorage) {
      redirect("/");
    } else {
      setCartId(cartIdInLocalStorage);
    }
  }, []);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-[800px] mx-auto py-10">
      <h2 className="text-center text-2xl font-bold">Cart List</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-3">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Total Items</th>
                <th className="px-4 py-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{data?.cart?.totalItems}</td>
                <td className="border px-4 py-2">
                  {data?.cart?.grandTotal?.formatted}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
        <div className="p-3">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.cart?.items.map((item: any) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item?.id}</td>

                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item?.quantity}</td>
                  <td className="border px-4 py-2">
                    {item?.lineTotal?.formatted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartList;
