import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  // console.log("Requesting URL:", url); // Log the constructed URL
  const res = await fetch(url);
  // console.log("Response Status:", res.status); // Log the response status
  const products = await res.json();
  // console.log("Fetched Products Count:", products.length); // Log the count of fetched products
  return products;
};

export default getProducts;
