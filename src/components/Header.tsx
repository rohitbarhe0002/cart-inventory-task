"use client";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";

import { buttonVariants } from "./ui/button";
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-amber-500">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-start space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href={"/"} rel="noreferrer">
              <div
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                <p className="flex items-center gap-5 text-cyan-50">
                  <span>
                    <MdAddShoppingCart size={22} color="#fff" />
                  </span>
                  Add
                </p>
              </div>
            </Link>
            <Link href={"/cartList"} rel="noreferrer">
              <div
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                <p className="flex items-center gap-5 text-cyan-50">
                  <span>
                    <FiShoppingCart size={22} color="#fff" />
                  </span>
                  Cart
                </p>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
