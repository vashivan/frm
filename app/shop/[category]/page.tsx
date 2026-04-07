import CategoryClient from "./CategoryClient";
import type { Category } from "@/utils/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: Category }>;
}) {
  const { category } = await params; // ✅ розпаковуємо Promise

  return <CategoryClient category={category} />;
}
