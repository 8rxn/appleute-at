"use client";

import { AuthContext } from "@/components/auth";
import ProductCard from "@/components/product-cards";
import { BaggageClaim, ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { useEffect } from "react";

type Props = {};

const Orders = (props: Props) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

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
        <div className="flex flex-col-reverse md:flex-row gap-8">
          {" "}
          {orders.map((order) => (
            <div className="bg-secondary rounded-lg">
              {order.orderDetails.map((product) => (
                <div>
                  <h2>{product.name}</h2>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
