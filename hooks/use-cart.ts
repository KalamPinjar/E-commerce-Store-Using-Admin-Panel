import { Product } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const exitingItem = currentItems.find((item) => item.id === data.id);

        if (exitingItem) {
          return toast("Item already in cart");
        }
        set(state => ({ items: [...state.items, data] }));
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set(state => ({ items: state.items.filter((item) => item.id !== id) }));
        toast.success("Item removed from cart");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart");
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
