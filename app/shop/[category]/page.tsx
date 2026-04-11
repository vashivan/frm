import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";
import { getProducts } from "@/lib/products";
import type { Category } from "@/utils/types";

const validCategories: Category[] = ["shoes", "apparel", "kids", "accessories"];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!validCategories.includes(category as Category)) {
    notFound();
  }

  const products = await getProducts();

  return (
    <CategoryClient
      category={category as Category}
      products={products}
    />
  );
}