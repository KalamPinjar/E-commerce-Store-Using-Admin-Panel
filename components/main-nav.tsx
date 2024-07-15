"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import useSWR from "swr";
import { Loader2 } from "lucide-react";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

const MainNav: React.FC = () => {
  const pathname = usePathname();
  const { data: categories, error } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher
  );

  if (error) {
    console.error("Failed to load categories", error);
    return <div className="ml-4">Failed to load categories</div>;
  }

  if (!categories) {
    return (
      <div className="ml-4">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  // console.log("Categories loaded", categories);

  const routes = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="flex items-center gap-x-4 space-x-4 lg:space-x-0 mx-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-color hover:text-black",
            route.active ? " text-black" : "text-neutral"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
