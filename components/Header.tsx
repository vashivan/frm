"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartTotals, getCart, CART_EVENT } from "@/lib/cart";

const navLinks = [
  { href: "/shop", label: "Магазин" },
  { href: "/about", label: "Про FRM" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Контакт" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [totalQty, setTotalQty] = useState(0);

  // init + subscribe to cart updates
  useEffect(() => {
    const sync = () => {
      const cart = getCart();
      setTotalQty(cartTotals(cart).totalQty);
    };

    sync(); // ✅ одразу при монтуванні

    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync); // ✅ якщо відкрито іншу вкладку

    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span>FORM</span>
          <span className="logo-sub">dance wear & shoes</span>
        </Link>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/checkout" className="header-icon" aria-label="Cart">
            {totalQty>0 && (
              <div className="header-icon__full color-black">{totalQty}</div>
            )}
          </Link>

          <button
            className={`burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <button
        className={`drawer-overlay ${open ? "is-open" : ""}`}
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
      />

      {/* Drawer */}
      <aside
        id="mobile-drawer"
        className={`drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="drawer-header">
          <div className="drawer-title">MENU</div>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close">
            ✕
          </button>
        </div>

        <nav className="drawer-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="drawer-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}
