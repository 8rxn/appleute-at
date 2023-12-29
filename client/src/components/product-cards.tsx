"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { XIcon } from "lucide-react";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth";

import Image from "next/image";
import { Button } from "./ui/button";
type Props = {
  price: string;
  name: string;
  imgSrc: string;
  description: string;
  id: string;
};

const ProductCard = (props: Props) => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const addToCart = async () => {
    const res = await fetch(`http://localhost:3000/cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productIds: [props.id] }),
      credentials: "include",
    });
    const cart = await res.json();
    console.log(cart);
  };

  return (
    <Card className="w-fit mx-auto min-w-72">
      {/* <CardContent className="grid place-items-center"> */}
      <Image
        src={props.imgSrc || "/next.svg"}
        alt={"product image"}
        className="p-2 w-full object-cover rounded-xl"
        width={150}
        height={200}
      ></Image>
      {/* </CardContent> */}
      <CardHeader>
        <CardTitle>{props.name || "Product Name"}</CardTitle>
        <CardDescription>
          {props.description || "Product Description"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <CardTitle>{props.price || "$ 0"}</CardTitle>
        {isLoggedIn && (
          <Button variant={"default"} onClick={addToCart}>
            <span className="text-xs">Add to Cart</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

export const CartCard = (
  props: Props & {
    removeFromCart: (id: string) => void;
  }
) => {
  return (
    <Card className=" flex flex-row justify-between">
      {/* <CardContent className="grid place-items-center"> */}
      <Image
        src={props.imgSrc || "/next.svg"}
        alt={"product image"}
        className="p-2"
        width={75}
        height={100}
      ></Image>
      {/* </CardContent> */}
      <CardHeader>
        <CardTitle>{props.name || "Product Name"}</CardTitle>
        <CardDescription>{props.price || "Product price"}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between gap-6 ">
        <Button
          variant={"secondary"}
          onClick={() => {
            props.removeFromCart(props.id);
          }}
        >
          <XIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
