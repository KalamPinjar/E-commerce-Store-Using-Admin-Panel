"use client";

import useSWR from "swr";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductsList from "@/components/products-list";
import Container from "@/components/ui/container";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { data: product, error: productError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`,
    fetcher
  );
  const { data: allSuggestedProducts, error: suggestedProductsError } = useSWR(
    product
      ? `${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${product.category.id}`
      : null,
    fetcher
  );

  if (productError || suggestedProductsError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load product data. Please try again later.
      </div>
    );
  }

  if (!product || !allSuggestedProducts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  // Filter out products that don't belong to the same category
  const filteredSuggestedProducts = allSuggestedProducts.filter(
    (p: Product) => p.category.id === product.category.id
  );

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:items-start lg:gap-x-8 lg:grid lg:grid-cols-2">
            <Gallery images={product.images} />
            <div className="mt-10 sm:mt-16 lg:mt-0 sm:px-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductsList
            items={filteredSuggestedProducts}
            title="Related Products"
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
