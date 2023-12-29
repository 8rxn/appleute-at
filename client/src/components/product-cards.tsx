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
        <Button variant={"default"}>
          <span className="text-xs">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

export const CartCard = (props: Props) => {
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
        <Button variant={"secondary"}>
          <XIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
