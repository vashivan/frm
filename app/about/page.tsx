// app/about/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Про FORM",
  description:
    "FORM — бренд, створений танцюристами для танцюристів: красиво, зручно, доступно. Опт і викуп товарів для танцю та гімнастики.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="about-kicker">FORM / Dance essentials</p>

          <h1 className="about-title">
            Ми теж танцюристи — і робимо форму, яка працює{" "}
            <span>в русі</span>.
          </h1>

          <p className="about-subtitle">
            Ми знаємо, що таке багатогодинні тренування, стерті ноги, незручні
            колодки й форма, яка заважає руху. Тому FORM — це про{" "}
            <b>зручність</b>, <b>красу</b> і <b>доступну ціну</b> без переплат.
          </p>

          <div className="about-hero-actions">
            <Link href="/shop" className="btn btn-primary">
              Перейти в магазин
            </Link>
          </div>
        </div>
      </section>

      {/* WHY FORM */}
      <section className="about-section">
        <div className="about-section-head">
          <h2>Чому FORM</h2>
          <p>Коротко про те, як ми мислимо — з позиції танцюриста.</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>Ми танцюємо — і розуміємо</h3>
            <p>
              Думаємо не лише про дизайн, а про посадку, баланс, підтримку стопи
              та відчуття в русі.
            </p>
          </div>

          <div className="about-card">
            <h3>Гарно ≠ дорого</h3>
            <p>
              Комфорт і стиль не повинні бути розкішшю. Ми підбираємо моделі так,
              щоб це було доступно.
            </p>
          </div>

          <div className="about-card">
            <h3>Мінімалізм і форма</h3>
            <p>
              Чисті лінії, акуратні кольори, нічого зайвого — щоб форма
              підкреслювала рух, а не відволікала.
            </p>
          </div>
        </div>
      </section>

      {/* FOR WHOM + QUALITY */}
      <section className="about-section about-split">
        <div className="about-split-left">
          <h2>Для кого FORM</h2>
          <p>
            FORM підійде, якщо ти займаєшся спортивними бальними танцями (латина
            / стандарт), тренуєшся регулярно, готуєшся до виступів, або
            підбираєш форму для дітей.
          </p>

          <ul className="about-list">
            <li>Латина / стандарт / тренування</li>
            <li>Дорослі й діти (kids)</li>
            <li>Зал і сцена</li>
            <li>Форма, взуття, базові аксесуари</li>
          </ul>

          <p style={{ marginTop: 12, opacity: 0.85, lineHeight: 1.7 }}>
            Ми створюємо і відбираємо речі так, ніби обираємо їх{" "}
            <b>для себе</b>.
          </p>
        </div>

        <div className="about-split-right">
          <div className="about-panel">
            <p className="about-panel-title">Категорії</p>
            <div className="about-panel-links">
              <Link href="/shop/shoes" className="about-link">
                Взуття <span>→</span>
              </Link>
              <Link href="/shop/apparel" className="about-link">
                Форма <span>→</span>
              </Link>
              <Link href="/shop/kids" className="about-link">
                Kids <span>→</span>
              </Link>
            </div>
          </div>

          <div className="about-panel">
            <p className="about-panel-title">Підбір розміру</p>
            <p className="about-panel-text">
              Якщо сумніваєшся — відкрий гайд або напиши нам.
            </p>
            <Link href="/fit-guide" className="btn btn-outline">
              Fit guide →
            </Link>
          </div>
        </div>
      </section>

      {/* WHOLESALE / BUYOUT */}
      <section className="about-section">
        <div className="about-section-head">
          <h2>Опт та викуп товарів</h2>
          <p>Працюємо не тільки в роздріб — можемо закривати запити команд і студій.</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>Оптові замовлення</h3>
            <p>
              Для студій, клубів, команд. Допоможемо з підбором моделей, розмірів
              та регулярними закупівлями.
            </p>
          </div>

          <div className="about-card">
            <h3>Викуп будь-яких товарів</h3>
            <p>
              Можемо організувати викуп товарів для{" "}
              <b>танцювального спорту</b> або <b>художньої гімнастики</b> — під
              конкретний запит.
            </p>
          </div>

          <div className="about-card">
            <h3>Співпраця</h3>
            <p>
              Якщо ти тренер/керівник студії — напиши нам. Знайдемо оптимальне
              рішення під бюджет і задачі.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <h2>FORM — це про рух</h2>
          <p>
            Коли форма не заважає, взуття тримає баланс, а ти почуваєшся впевнено
            — тоді можна думати тільки про танець.
          </p>

          <div className="about-hero-actions">
            <Link href="/shop" className="btn btn-primary">
              Відкрити магазин
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
