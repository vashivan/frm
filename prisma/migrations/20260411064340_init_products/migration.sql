-- CreateEnum
CREATE TYPE "ProductGroup" AS ENUM ('shoes', 'apparel', 'kids', 'accessories');

-- CreateEnum
CREATE TYPE "ProductGender" AS ENUM ('women', 'men', 'unisex');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('active', 'draft', 'archived');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'UAH',
    "images" TEXT[],
    "sizes" TEXT[],
    "colors" TEXT[],
    "tag" TEXT,
    "style" TEXT,
    "type" TEXT,
    "group" "ProductGroup" NOT NULL,
    "gender" "ProductGender" NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_group_idx" ON "Product"("group");

-- CreateIndex
CREATE INDEX "Product_gender_idx" ON "Product"("gender");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_status_idx" ON "Product"("status");
