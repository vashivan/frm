'use client'

import Link from "next/link";

export function Footer() {
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
            <li>
              <Link href="/shop/shoes">Взуття</Link>
            </li>
            <li>
              <Link href="/shop/apparel">Форма</Link>
            </li>
            <li>
              <Link href="/shop/kids">Kids</Link>
              </li>
            <li>
              <Link href="/shop/accessories">Аксесуари</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">FRM</h4>
          <ul className="footer-list">
            <li>
              <Link href="/about">Про FORM</Link>
            </li>
            {/* <li>
              <Link href="/blog">Блог</Link>
            </li> */}
            {/* <li>
              <Link href="/contact">Контакт</Link>
            </li> */}
            <li>
              <Link href="/shipping">Доставка та оплата</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Будь у формі</h4>
          <p className="footer-text">
            Новини, акції та корисні поради — прямо на твою пошту.
          </p>
          <form
            className="footer-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="Твій email"
              className="footer-input"
            />
            <button type="submit" className="footer-button">
              Підписатися
            </button>
          </form>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
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
