import { Product } from "@/types";
import NoResult from "./ui/no-result";
import ProductsCard from "./ui/product-card";

interface ProductsListProps {
  items: Product[];
  title: string;
}
const ProductsList: React.FC<ProductsListProps> = ({ items, title }) => {
  if (!items || items.length === 0) {
    return <div>No products found</div>;
  }
  // console.log("Products to render:", items); // Log the products to be rendered
  return (
    <div className="space-y-4 p-3">
      <h3 className="font-bold text-2xl dark:text-white">{title}</h3>
      {items.length === 0 && <NoResult />}
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <ProductsCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
