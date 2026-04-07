export type Gender = "women" | "men" | "unisex";

export type ShoeType = "heels" | "ballet" | "sneakers" | "training" | "other";

export type Category = "shoes" | "apparel" | "kids" | "accessories";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  label?: string;
  images: string[];
  colors?: string[];
  tag?: string;
  style?: string;
  group: string;
  gender: string;
  description?: string; 
  type: string;
  sizes?: string[];
};

export type ProductPageProps = {
  params: { slug: string };
};