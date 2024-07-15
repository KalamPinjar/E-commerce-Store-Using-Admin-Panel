"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

const ProductsCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const PreviewModal = usePreviewModal();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    PreviewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
  return (
    <div
      onClick={handleClick}
      className="space-y-4 bg-white shadow-lg hover:shadow-xl p-3 rounded-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
    >
      <div className="relative bg-gray-100 rounded-xl aspect-square">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md aspect-square object-cover"
          //   src={data?.images.map((image) => image.url)[0]}
          src={data?.images?.[0]?.url}
          alt={data?.name}
        />
        <div className="bottom-5 absolute opacity-0 hover:opacity-100 group-hover:opacity-100 px-6 w-full transition">
          <div className="flex justify-center gap-x-6">
            <IconButton
              icon={<Expand size={20} className="text-gray-600" />}
              onClick={onPreview}
            />
            <IconButton
              icon={<ShoppingCart size={20} className="text-gray-600" />}
              onClick={onAddToCart}
            />
          </div>
        </div>
      </div>
      <div>
        <p>{data.name}</p>
        <p className="text-gray-500 text-sm">{data.category?.name}</p>
      </div>
      <div className="flex justify-between items-center">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductsCard;
