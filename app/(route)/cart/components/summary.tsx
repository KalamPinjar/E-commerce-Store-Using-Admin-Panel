"use client";

import { Button } from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Summary = () => {
  const items = useCart((state) => state.items);
  const searchParams = useSearchParams();
  const removeAll = useCart((state) => state.removeAll);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Order placed successfully");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong with the order. Please try again");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );
      window.location = response.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <div className="lg:col-span-5 bg-gray-50 mt-16 le:mt-0 px-4 py-6 sm:p-6 lg:p-8 rounded-lg">
      <h2>Order Summary</h2>
      <div className="space-y-4 mt-6">
        <div className="flex justify-between items-center border-gray-200 pt-4 border-t">
          <div className="font-medium text-base text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="dark:bg-slate-900 mt-6 w-full dark:text-white"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
