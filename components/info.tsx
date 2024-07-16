"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/Button";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
        {data.name}
      </h1>
      <div className="flex justify-between items-end mt-3">
        <p className="font-bold text-2xl text-gray-900 dark:text-white">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black dark:text-white">Size:</h3>
          <div className="text-zinc-500">{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black dark:text-white">Color:</h3>
          <div
            className="border-[1px] border-gray-600 dark:border-white bg-black rounded-full w-6 h-6"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3 mt-10">
        <Button
          onClick={() => cart.addItem(data)}
          className="flex items-center gap-x-2"
        >
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
