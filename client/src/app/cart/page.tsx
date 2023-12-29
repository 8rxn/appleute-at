"use client";
import React, { useEffect, useState } from "react";
import { AuthContext } from "@/components/auth";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { CartCard } from "@/components/product-cards";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/product-gallery";

type Props = {};

const Cart = (props: Props) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [cart, setCart] = useState<{ id: number | null; products: Product[] }>({
    id: null,
    products: [],
  });
  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`http://localhost:3000/cart/`, {
        credentials: "include",
      });
      const cart = await res.json();
      console.log(cart);
      setCart(cart);
    };
    fetchCart();
  }, []);
  if (!isLoggedIn) return redirect("/login");
  console.log(user);

  const orderButtonClick = async () => {
    const order = await fetch(`http://localhost:3000/order/${cart.id}`, {
      method: "POST",
      credentials: "include",
    });
    const orderJson = await order.json();
    console.log(orderJson);
  };

  return (
    <div>
      <h1 className="w-full text-center mb-8 text-2xl font-bold">Cart</h1>
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="flex flex-col gap-4">
          {cart.products?.map((product) => (
            <CartCard
              price={`$ ${product.price}`}
              name={product.name}
              imgSrc={product.imgSrc}
              description={product.description}
              id={product.id}
            ></CartCard>
          ))}
        </div>
        <div className="flex flex-col bg-secondary p-4 rounded-lg h-fit gap-4">
          <div className="flex flex-row justify-between gap-32">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-base font-semibold">$ 100</span>
          </div>
          <div className="flex flex-row justify-between gap-32">
            <span className="text-sm font-semibold">Shipping</span>
            <span className="text-base font-semibold">$ 10</span>
          </div>
          <div className="flex flex-row justify-between gap-32">
            <span className="text-sm font-semibold">Tax</span>
            <span className="text-base font-semibold">$ 10</span>
          </div>
          <div className="flex flex-row justify-between gap-32">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-base font-semibold">$ 120</span>
          </div>
          <Button onClick={orderButtonClick}>Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
