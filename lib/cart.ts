// lib/cart.ts

export type CartItem = {
  slug: string;
  color: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  size: string;
  qty: number;
};

const KEY = "frm_cart_v1";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

const CART_EVENT = "frm_cart_updated";

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT)); // ✅ повідомляємо UI
}

export { CART_EVENT };

export function addToCart(item: CartItem) {
  const cart = getCart();

  const idx = cart.findIndex(
    (x) => x.slug === item.slug && x.size === item.size
  );

  if (idx >= 0) {
    cart[idx].qty += item.qty;
  } else {
    cart.push(item);
  }

  setCart(cart);
  return cart;
}

export function removeFromCart(slug: string, size: string) {
  const cart = getCart().filter(
    (x) => !(x.slug === slug && x.size === size)
  );
  setCart(cart);
  return cart;
}

export function clearCart() {
  setCart([]);
}

export function cartTotals(cart: CartItem[]) {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  return { totalQty, total };
}
