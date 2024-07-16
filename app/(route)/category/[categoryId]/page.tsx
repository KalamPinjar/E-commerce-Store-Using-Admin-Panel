"use client";

import useSWR from "swr";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResult from "@/components/ui/no-result";
import ProductsCard from "@/components/ui/product-card";
import { Category as CategoryType, Color, Size, Product } from "@/types";
import { Loader2 } from "lucide-react";
import MobileFilter from "./components/mobile-filter";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

interface CategoryProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId?: string;
    sizeId?: string;
  };
}

const buildProductUrl = (
  categoryId: string,
  colorId?: string,
  sizeId?: string
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}`;
  if (colorId) {
    url += `&colorId=${colorId}`;
  }
  if (sizeId) {
    url += `&sizeId=${sizeId}`;
  }
  return url;
};

const Category: React.FC<CategoryProps> = ({ params, searchParams }) => {
  const productUrl = buildProductUrl(
    params.categoryId,
    searchParams.colorId,
    searchParams.sizeId
  );

  const { data: products, error: productsError } = useSWR<Product[]>(
    productUrl,
    fetcher
  );
  const { data: sizes, error: sizesError } = useSWR<Size[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/sizes`,
    fetcher
  );
  const { data: colors, error: colorsError } = useSWR<Color[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/colors`,
    fetcher
  );
  const { data: category, error: categoryError } = useSWR<CategoryType>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${params.categoryId}`,
    fetcher
  );

  if (productsError || sizesError || colorsError || categoryError) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        Failed to load data. Please try again later.
      </div>
    );
  }

  if (!products || !sizes || !colors || !category) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:gap-x-8 lg:grid lg:grid-cols-5">
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="lg:block hidden">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              {products.length === 0 && <NoResult />}
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {products.map((item) => (
                  <ProductsCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;
