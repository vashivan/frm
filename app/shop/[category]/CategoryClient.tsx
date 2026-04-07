"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Category, Gender, ShoeType, Product } from "@/utils/types";
import productsData from "@/lib/products.json";


const categoryMeta: Record<Category, { title: string; description: string }> = {
  shoes: {
    title: "Взуття",
    description:
      "Латина, стандарт, балетки й кросівки для танцю — взуття, яке тримає форму й баланс.",
  },
  apparel: {
    title: "Форма",
    description:
      "Тренувальні комплекти, топи, спідниці та боді для щоденної роботи в залі.",
  },
  kids: {
    title: "Kids",
    description:
      "Форма та взуття для юних танцюристів, що відповідає вимогам турнірів.",
  },
  accessories: {
    title: "Аксесуари",
    description:
      "Чохли, шкарпетки, ремінці — дрібні деталі, що впливають на комфорт.",
  },
};

export default function CategoryClient({ category }: { category: Category }) {
  const meta = categoryMeta[category];

  const [genderFilter, setGenderFilter] = useState<"all" | Gender>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | ShoeType>("all");

  const baseProducts = useMemo(
    () => (productsData as Product[]).filter((p) => p.group === category),
    [category]
  );

  const filteredProducts = useMemo(
    () =>
      baseProducts
        .filter((p) => (genderFilter === "all" ? true : p.gender === genderFilter))
        .filter((p) => (typeFilter === "all" ? true : p.type === typeFilter)),
    [baseProducts, genderFilter, typeFilter]
  );

  return (
    <div className="shop-page pt-5">
      <div className="shop-header">
        <div>
          <p className="product-category">Категорія: {meta.title}</p>
          <h1 className="shop-title">{meta.title} — FRM</h1>
          {meta.description && <p className="shop-subtitle">{meta.description}</p>}
        </div>

        <Link href="/shop" className="shop-back-link">
          Назад
        </Link>
      </div>

      <div className="shop-filters">
        <div className="shop-filters-left">
          <div className="filter-group">
            <span className="filter-label">Для кого</span>
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-pill ${genderFilter === "all" ? "filter-pill-active" : ""}`}
                onClick={() => setGenderFilter("all")}
              >
                Усі
              </button>
              <button
                type="button"
                className={`filter-pill ${genderFilter === "women" ? "filter-pill-active" : ""}`}
                onClick={() => setGenderFilter("women")}
              >
                Жіноче
              </button>
              <button
                type="button"
                className={`filter-pill ${genderFilter === "men" ? "filter-pill-active" : ""}`}
                onClick={() => setGenderFilter("men")}
              >
                Чоловіче
              </button>
              <button
                type="button"
                className={`filter-pill ${genderFilter === "unisex" ? "filter-pill-active" : ""}`}
                onClick={() => setGenderFilter("unisex")}
              >
                Unisex
              </button>
            </div>
          </div>

          {category === "shoes" && (
            <div className="filter-group">
              <span className="filter-label">Тип взуття</span>
              <div className="filter-pills">
                <button
                  type="button"
                  className={`filter-pill ${typeFilter === "all" ? "filter-pill-active" : ""}`}
                  onClick={() => setTypeFilter("all")}
                >
                  Усе
                </button>
                <button
                  type="button"
                  className={`filter-pill ${typeFilter === "heels" ? "filter-pill-active" : ""}`}
                  onClick={() => setTypeFilter("heels")}
                >
                  Туфлі / підбори
                </button>
                <button
                  type="button"
                  className={`filter-pill ${typeFilter === "ballet" ? "filter-pill-active" : ""}`}
                  onClick={() => setTypeFilter("ballet")}
                >
                  Балетки
                </button>
                <button
                  type="button"
                  className={`filter-pill ${typeFilter === "sneakers" ? "filter-pill-active" : ""}`}
                  onClick={() => setTypeFilter("sneakers")}
                >
                  Кросівки для танцю
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="shop-empty">
          Поки немає моделей із такими параметрами. Спробуй змінити фільтри.
        </p>
      ) : (
        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`} className="product-card">
              <div className="product-card-image-wrap">
                <div className="product-card-image">
                  <Image src={product.images[0]} alt={product.name} fill className="product-card-image-img" />
                </div>
                {product.label && <span className="product-card-label">{product.label}</span>}
              </div>

              <div className="product-card-body">
                <p className="product-card-category">{product.category}</p>
                <h2 className="product-card-title">{product.name}</h2>
                <div className="product-card-meta">
                  {product.tag && <span className="product-card-tag">{product.tag}</span>}
                  <span className="product-card-price">
                    {product.price.toLocaleString("uk-UA")} {product.currency}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
