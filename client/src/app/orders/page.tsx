"use client";

import { AuthContext } from "@/components/auth";
import ProductCard from "@/components/product-cards";
import { BaggageClaim, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { useEffect } from "react";

type Props = {};

type OrderType = {
  orderId: number;
  orderAmount: number;
  orderDate: string;
  orderDetails: {
    amount: number;
    product: {
      description: string;
      id: number;
      imgSrc: string;
      name: string;
      price: number;
    };
  }[];
};

const Orders = (props: Props) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await fetch(`http://localhost:3000/order`, {
        credentials: "include",
      });
      if (orders.ok) {
        const ordersJson = await orders.json();
        console.log(ordersJson);
        setOrders(ordersJson);
      }
    };
    fetchOrders();
  }, []);

  if (!isLoggedIn) return redirect("/login");
  console.log(user);

  return (
    <div>
      <h1 className="w-full text-center mb-8 text-2xl font-bold">Orders</h1>
      {orders.length === 0 && (
        <div className="flex flex-col items-center">
          <BaggageClaim className="w-32 h-32 mb-4" />
          <span className=" text-2xl">No orders found</span>
        </div>
      )}
      {orders && (
        <div className="flex flex-col-reverse gap-8">
          {" "}
          {orders.map((order) => (
            <div className="bg-secondary rounded-lg">
              <div className="flex flex-col sm:flex-row gap-20">
                <div className="p-10 flex flex-col gap-4">
                  <div>
                    <span className="text-2xl font-bold">Amount</span>
                    <p className="text-xl">$ {order.orderAmount}</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">Order Id</span>
                    <p className="text-xl">{order.orderId}</p>
                  </div>

                  <div>
                    <span className="text-2xl font-bold">Date</span>
                    <p className="text-xl">
                      {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="p-10">
                  <h2 className=" text-2xl font-bold w-full text-center underline underline-offset-2 ">Products</h2>
                  {order.orderDetails.map((product) => (
                    <div className="flex justify-between gap-8 items-center p-4 rounded-lg flex-wrap-reverse">
                      <span className="text-2xl font-bold">
                        $ {product.amount}
                      </span>
                      <div>
                        <p className="text-xl font-semibold">
                          {product.product.name}
                        </p>
                        <p className="text-lg ">
                          {product.product.description}
                        </p>
                      </div>
                      <Image
                        src={product.product.imgSrc}
                        alt={"product image"}
                        width={100}
                        height={100}
                      ></Image>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
