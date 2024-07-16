"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  data: Product;
}
const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };
  return (
    <li className="flex py-6 border-b">
      <div className="relative rounded-md w-24 sm:w-48 h-24 sm:h-48 overflow-hidden">
        <Image
          fill
          src={data?.images?.[0]?.url}
          alt=""
          className="object-center object-cover"
        />
      </div>
      <div className="relative flex flex-col flex-1 justify-between gap-y-2 ml-4 sm:ml-6">
        <div className="top-0 right-0 z-10 absolute">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative sm:gap-x-6 sm:grid sm:grid-cols-2 pr-9 sm:pr-0">
          <div className="flex justify-between">
            <p className="font-semibold text-black text-lg dark:text-zinc-300 underline">
              {data.name}
            </p>
          </div>
          <div className="flex mt-1 text-sm">
            <p className="text-gray-500 capitalize">{data.color.name}</p>
            <p className="border-gray-200 ml-4 pl-4 border-l text-gray-500 capitalize">
              {data.size.name}
            </p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
