import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductGender, ProductGroup } from "../app/generated/prisma/client";
import products from "../lib/products.json";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type RawProduct = {
  slug: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  currency?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  tag?: string;
  style?: string;
  group: "shoes" | "apparel" | "kids" | "accessories";
  gender: "women" | "men" | "unisex";
  type?: string;
};

function mapGroup(group: RawProduct["group"]): ProductGroup {
  switch (group) {
    case "shoes":
      return ProductGroup.shoes;
    case "apparel":
      return ProductGroup.apparel;
    case "kids":
      return ProductGroup.kids;
    case "accessories":
      return ProductGroup.accessories;
    default:
      return ProductGroup.apparel;
  }
}

function mapGender(gender: RawProduct["gender"]): ProductGender {
  switch (gender) {
    case "women":
      return ProductGender.women;
    case "men":
      return ProductGender.men;
    case "unisex":
      return ProductGender.unisex;
    default:
      return ProductGender.unisex;
  }
}

async function main() {
  for (const product of products as RawProduct[]) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description ?? null,
        category: product.category,
        price: product.price,
        currency: product.currency ?? "UAH",
        images: product.images ?? [],
        sizes: product.sizes ?? [],
        colors: product.colors ?? [],
        tag: product.tag ?? null,
        style: product.style ?? null,
        type: product.type ?? null,
        group: mapGroup(product.group),
        gender: mapGender(product.gender),
      },
      create: {
        slug: product.slug,
        name: product.name,
        description: product.description ?? null,
        category: product.category,
        price: product.price,
        currency: product.currency ?? "UAH",
        images: product.images ?? [],
        sizes: product.sizes ?? [],
        colors: product.colors ?? [],
        tag: product.tag ?? null,
        style: product.style ?? null,
        type: product.type ?? null,
        group: mapGroup(product.group),
        gender: mapGender(product.gender),
      },
    });
  }

  console.log("Products seeded successfully");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });