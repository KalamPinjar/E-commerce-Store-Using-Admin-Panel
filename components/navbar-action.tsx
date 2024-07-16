"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { ModeToggle } from "./theme-changer";
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
      <ModeToggle />
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center bg-black dark:bg-white hover:opacity-75 px-4 py-2 rounded-full text-white dark:text-black transition"
      >
        <ShoppingBag size={20}   />
        <span className="ml-2 font-medium text-sm text-white dark:text-black">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarAction;
