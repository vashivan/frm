'use client';

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("Subscribe error:", err);
      setError("Не вдалося підписати. Спробуй ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-logo">FORM</div>
          <p className="footer-text">
            FORM — танцювальне взуття та форма для тих, хто живе в русі.
            Точна посадка, чисті лінії, сцена і щоденна робота у залі.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Магазин</h4>
          <ul className="footer-list">
            <li><Link href="/shop/shoes">Взуття</Link></li>
            <li><Link href="/shop/apparel">Форма</Link></li>
            <li><Link href="/shop/kids">Kids</Link></li>
            <li><Link href="/shop/accessories">Аксесуари</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">FRM</h4>
          <ul className="footer-list">
            <li><Link href="/about">Про FORM</Link></li>
            <li><Link href="/shipping">Доставка та оплата</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Будь у формі</h4>
          <p className="footer-text">
            Новини, акції та корисні поради — прямо на твою пошту.
          </p>

          <form className="footer-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Твій email"
              className="footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer-button" disabled={loading}>
              {loading ? "..." : "Підписатися"}
            </button>
          </form>

          {success && <p className="mt-2 text-sm text-green-600">Дякуємо! Ти підписаний ✨</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div className="footer-social">
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FRM. Твій рух має форму.</span>
        <span className="footer-bottom-secondary">
          Зроблено з танцювальною любов’ю.
        </span>
      </div>
    </footer>
  );
}