"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartItem, clearCart, getCart, cartTotals, removeFromCart } from "@/lib/cart";

type CheckoutForm = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  comment: string;
  payment: "Card now" | "Cash on delivery" | "Card (later)";
  delivery: "Nova Poshta" | "Sefl pickup";
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    comment: "",
    payment: "Cash on delivery",
    delivery: "Nova Poshta",
  });

  useEffect(() => setCart(getCart()), []);
  const totals = useMemo(() => cartTotals(cart), [cart]);

  const onChange = (k: keyof CheckoutForm, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onRemove = (slug: string, size: string, color: string) => {
    setCart(removeFromCart(slug, size, color));
  };

  const onSubmit = async () => {
    setError("");

    if (!cart.length) return setError("Кошик порожній.");
    if (!form.fullName || !form.phone) return setError("Вкажи імʼя та телефон.");
    if (form.delivery !== "Sefl pickup" && (!form.city || !form.address))
      return setError("Вкажи місто та адресу доставки.");

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, customer: form }),
      });

      const data = await res.json();

      if(data.payment === "Card now" && data.paymentData) {
        // @ts-ignore
        const wayforpay = new Wayforpay();

        wayforpay.run(data.paymentData);
      } else {
        router.push(`/checkout/success?order=${data.orderNumber}`);
      }
    } catch (e: any) {
      setError(e?.message || "Помилка.");
    } finally {
      setLoading(false);
      clearCart();
    }
  };

  return (
    <div className="checkout-page">
      <h1>Оформлення замовлення</h1>

      {!cart.length ? (
        <p>
          Кошик порожній. <Link href="/shop">Повернутися в магазин →</Link>
        </p>
      ) : (
        <div className="checkout-layout">
          <div className="checkout-form">
            <div className="field">
              <label>Імʼя та прізвище*</label>
              <input value={form.fullName} onChange={(e) => onChange("fullName", e.target.value)} />
            </div>

            <div className="field">
              <label>Телефон*</label>
              <input value={form.phone} onChange={(e) => onChange("phone", e.target.value)} />
            </div>

            <div className="field">
              <label>Email (опц.)</label>
              <input value={form.email} onChange={(e) => onChange("email", e.target.value)} />
            </div>

            <div className="field">
              <label>Доставка</label>
              <select value={form.delivery} onChange={(e) => onChange("delivery", e.target.value)}>
                <option value="Nova Poshta">Нова Пошта</option>
                <option value="Self pickup">Самовивіз</option>
              </select>
            </div>

            {form.delivery !== "Sefl pickup" && (
              <>
                <div className="field">
                  <label>Місто*</label>
                  <input value={form.city} onChange={(e) => onChange("city", e.target.value)} />
                </div>
                <div className="field">
                  <label>Адреса / номер відділення*</label>
                  <input value={form.address} onChange={(e) => onChange("address", e.target.value)} />
                </div>
              </>
            )}

            <div className="field">
              <label>Оплата</label>
              <select value={form.payment} onChange={(e) => onChange("payment", e.target.value)}>
                <option value="Card now">Оплата онлай (зараз)</option>
                <option value="Cash on delivery">Накладений платіж</option>
                <option value="Card (later)">Карткою (пізніше)</option>
              </select>
            </div>

            <div className="field">
              <label>Коментар</label>
              <p>Вкажіть ваші параметри, такі як довжина стопи, ширина, зріст та обхват грудей для більш детального та правильного підбору розміру саме для вас.</p>
              <textarea value={form.comment} onChange={(e) => onChange("comment", e.target.value)} />
            </div>

            {error && <p className="error">{error}</p>}

            <button className="btn btn-primary" onClick={onSubmit} disabled={loading}>
              {loading ? "Оформлюємо..." : "Підтвердити замовлення"}
            </button>
          </div>

          <div className="checkout-summary">
            <h2>Твоє замовлення</h2>

            {cart.map((i) => (
              <div key={`${i.slug}_${i.size}_${i.color}`} className="cart-item">
                <div>
                  <div className="title">{i.name}</div>
                  <div className="meta">Розмір: {i.size} • К-ть: {i.qty}</div>
                  <div className="meta">Колір: {i.color}</div>
                  <div className="price">
                    {(i.price * i.qty).toLocaleString("uk-UA")} {i.currency}
                  </div>
                </div>
                <button onClick={() => onRemove(i.slug, i.color, i.size || '')}>✕</button>
              </div>
            ))}

            <div className="totals">
              <div>К-ть: <b>{totals.totalQty}</b></div>
              <div>Сума: <b>{totals.total.toLocaleString("uk-UA")} {cart[0]?.currency}</b></div>
            </div>
          </div>
        </div>
      )}
      <script
        id="widget-wfp-script"
        src="https://secure.wayforpay.com/server/pay-widget.js"
        async
      />
    </div>
  );
}
