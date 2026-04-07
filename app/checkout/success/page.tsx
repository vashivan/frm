import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="checkout-success">
      <div className="success-card">
        <div className="success-badge">✅ Оплата успішна</div>

        <h1 className="success-title">Дякуємо! Замовлення прийнято</h1>
        <p className="success-text">
          Ми вже отримали твоє замовлення і скоро звʼяжемося для підтвердження деталей.
        </p>

        <div className="success-order">
          Номер замовлення: <b>{order || "—"}</b>
        </div>

        <div className="success-actions">
          <Link className="btn btn-primary" href="/shop">
            Повернутися в магазин
          </Link>
          <Link className="btn btn-outline" href="/checkout">
            Відкрити корзину
          </Link>
        </div>
      </div>
    </div>
  );
}
