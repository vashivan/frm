import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({
    where: {
      status: "active",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
  });
}