"use client";
import React from "react";
import ProductCard from "./product-cards";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imgSrc: string;
  category: string;
};

const ProductGallery = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const params = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `http://localhost:3000/product${
          category ? "/category/" + category : ""
        }`,
        { cache: "force-cache" }
      );
      const data = await res.json();
      if (data.error) return console.log(data.error);
      setProducts(data);
    };
    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, [category]);

  //   console.log(products);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-flow-row w-full justify-evenly gap-4 xl:gap-8 ">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            description={prod.description}
            name={prod.name}
            price={`Rs. ${prod.price}`}
            imgSrc={prod.imgSrc}
            id={prod.id}
          ></ProductCard>
        ))}
      </div>
    </>
  );
};

export default ProductGallery;
