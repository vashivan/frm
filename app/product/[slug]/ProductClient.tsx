"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import type { Product } from "@/app/generated/prisma/client";


export default function ProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updatesParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/product/${product.slug}?${params.toString()}`, {
      scroll: false,
    });
  }

  const selectedSize = searchParams.get('size') || '';
  const selectedColor = searchParams.get('color') || '';
  const [msg, setMsg] = useState<string>('');


  const [activeImage, setActiveImage] = useState<string>(
    product.images[0]
  );

  const onAddToCart = () => {
    if (product.sizes.length === 0) {
      addToCart({
        slug: product.slug,
        color: selectedColor,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: activeImage,
        size: selectedSize,
        qty: 1,
      });
      setMsg('Товар додано до кошика');

    } if (product.sizes && !selectedSize) {
      setMsg('Оберіть розмір');
    } else {
      addToCart({
        slug: product.slug,
        color: selectedColor,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: activeImage, 
        size: selectedSize,
        qty: 1,
      });
      setMsg('Товар додано до кошика');
    }

    setTimeout(() => (
      setMsg('')
    ), 3000)
  };

  const groupDetect = (group: string) => {
    if (group === 'shoes') {
      return 'Взуття';
    }
    if (group === 'apparel') {
      return 'Одяг';
    }
    if (group === 'accessories') {
      return 'Аксесуари';
    } else {
      return "Дитяче"
    }
  };

  return (
    <div className="product-page pt-5">
      {/* Breadcrumbs */}
      < nav className="product-breadcrumbs" >
        <Link href="/shop" className="product-breadcrumb-link">Магазин</Link>
        <span> / </span>
        <Link href={`/shop/${product.group}`} className="product-breadcrumb-link">
          {groupDetect(product.group)}
        </Link>
        <span> / </span>
        <span className="product-breadcrumb-current">{product.name}</span>
      </nav >

      <div className="product-layout">
        {/* GALLERY */}
        <div className="product-gallery">
          {/* MAIN IMAGE */}
          <div className="product-image-main">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              className="product-image-main-img"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="product-thumbs">
            {product.images.map((img, index) => (
              <button
                key={index}
                type="button"
                className={`product-thumb ${activeImage === img ? "is-active" : ""
                  }`}
                onClick={() => setActiveImage(img)}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="product-thumb-img"
                />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.name}</h1>
          {/* DESCRIPTION */}
          <div className="product-description text-justify">
            <p>{product.description}</p>
          </div>
          <div className="product-price-row">
            <span className="product-price">
              {product.price.toLocaleString("uk-UA")} {product.currency}
            </span>
          </div>

          {/* SIZES */}
          <div className="product-sizes">
            {product.sizes.length > 0 && (
              <div className="product-sizes-grid field w-53">
                <h1>Розмір</h1>
                <div className="product-sizes-grid">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => updatesParams('size', size)}
                      className={`product-size-btn ${selectedSize === size ? "btn-active" : ""
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors &&
              (<div className="product-sizes-grid field w-53">
                <h1>Колір</h1>
                <div className="product-sizes-grid">
                  {product.colors?.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`product-size-btn ${selectedColor === color ? "btn-active" : ""
                        }`}
                      onClick={() => updatesParams('color', color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              )}
          </div>

          {/* CTA */}
          <div className="product-actions">
            <button
              className="btn btn-primary product-add-to-cart"
              onClick={onAddToCart}
            // disabled={!selectedSize}
            >
              {msg ? `${msg}` : "Додати в кошик"}
            </button>
            {!selectedSize && (
              <p className="text-sm opacity-60 mt-2">
                Оберіть розмір, щоб додати товар у кошик.
              </p>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
