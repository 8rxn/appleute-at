import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

type Category = {
  id: number;
  name: string;
};

const Page = async (props: Props) => {
  const res = await fetch(`http://localhost:3000/category`);
  const categories: Category[] = await res.json();

  return (
    <div>
      <h1 className="w-full text-center mb-8">
        <span className="text-2xl font-bold">Categories</span>
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {categories.map((category) => {
          return (
            <Link href={"/?category=" + category.name}>
              <Button className="bg-gray-50 dark:bg-gray-900" variant={"link"}>
                {category.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
