import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${res.statusText}`);
  }

  return res.json();
};

export default getCategory;
