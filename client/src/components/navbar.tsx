import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { ShoppingCart, ListFilter, Shirt } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <nav className=" flex justify-between items-center w-full fixed md:top-0 md:px-8 py-4 p-4  rounded-lg bg-transparent backdrop-blur-sm ">
        <div className="flex gap-4 items-center justify-between sm:justify-start w-full ">
          <Link href={"/"}>
            <Button variant={"link"} className="font-semibold text-xl">Hello Shopper</Button>
          </Link>
          <ThemeToggle></ThemeToggle>
          <div className="h-full w-[2px] bg-gray-800 dark:bg-gray-50 rounded-full sm:block hidden"></div>

          <Link href={"/categories"} className="sm:block hidden">
            <Button variant={"ghost"} className="">
              <p>Categories</p>
            </Button>
          </Link>
        </div>
        <div className="flex ">
          <Link href={"/orders"}>
            <Button variant={"ghost"} className="sm:block hidden">
              <p>Your Orders</p>
            </Button>
          </Link>

          <Link href={"/cart"} className="sm:block hidden">
            <Button variant={"ghost"} className="">
              <ShoppingCart />
            </Button>
          </Link>
        </div>
      </nav>
      <div className="fixed bottom-2 sm:hidden w-full px-2 ">
        <div className="rounded-lg bg-white/10 backdrop-blur-md flex justify-evenly">
          <Link href={"/categories"}>
            <Button variant={"ghost"} className="sm:hidden block">
              <ListFilter></ListFilter>
            </Button>
          </Link>

          <Link href={"/orders"}>
            <Button variant={"ghost"} className="sm:hidden block">
              <Shirt></Shirt>
            </Button>
          </Link>

          <Link href={"/cart"} className="sm:hidden block">
            <Button variant={"ghost"} className="">
              <ShoppingCart />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
