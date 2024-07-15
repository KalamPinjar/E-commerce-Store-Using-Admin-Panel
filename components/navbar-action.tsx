"use client";

import { ShoppingBag } from "lucide-react";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

const NavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex items-center gap-x-4 ml-auto">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center bg-black px-4 py-2 rounded-full"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 font-medium text-sm text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarAction;
