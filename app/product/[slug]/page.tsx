import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Товар не знайдено — FORM" };

  return {
    title: `${product.name} — FORM`,
    description: `${product.name} — ${product.category} від FORM`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();

  console.log("PARAM SLUG:", slug);
  console.log("KNOWN SLUGS:", products.map((p) => p.slug));

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return <ProductClient product={product} />;
}