import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-kicker">FORM / форма руху</p>
          <h1 className="hero-title">Твій рух має форму</h1>

          <div className="hero-actions">
            <Link href="/shop/shoes" className="btn btn-primary">
              Взуття для танцю
            </Link>
            <Link href="/shop/apparel" className="btn btn-outline">
              Форма для тренувань
            </Link>
          </div>

          <p className="hero-note">
            Для латини, стандарту, contemporary, jazz, kids — FORM тримає форму.
          </p>
        </div>
      </section>


      {/* CATEGORIES */}
      <section className="section section-main-categories">
        <div className="grid-cards">
          <Link href="/shop/shoes" className="category-card category-card-shoes">
            <h3>Взуття для танцю</h3>
          </Link>
          <Link href="/shop/apparel" className="category-card category-card-apparel">
            <h3>Тренувальна форма</h3>
          </Link>
          <Link href="/shop/kids" className="category-card category-card-kids">
            <h3>Kids</h3>
          </Link>
          <Link href="/shop/accessories" className="category-card category-card-accessories">
            <h3>Аксесуари</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
