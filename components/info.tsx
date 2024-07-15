"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/Button";
import { ShoppingCart } from "lucide-react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl text-gray-900">{data.name}</h1>
      <div className="flex justify-between items-end mt-3">
        <p className="font-bold text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="border-gray-600 bg-black rounded-full w-6 h-6"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3 mt-10">
        <Button className="flex items-center gap-x-2">
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
