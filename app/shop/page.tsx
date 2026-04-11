import { getProducts } from "@/lib/products";
import Link from "next/link";

const categories = [
  {
    slug: "shoes",
    title: "Взуття",
    description:
      "Латина, стандарт і тренувальні моделі — взуття, яке тримає форму й баланс.",
    items: ["Взуття для латини", "Взуття для стандарту", "Training heel"],
  },
  {
    slug: "apparel",
    title: "Форма",
    description:
      "Тренувальні комплекти, спідниці, топи, боді — те, у чому хочеться рухатися.",
    items: ["Тренувальна форма", "Studio line", "Performance"],
  },
  {
    slug: "kids",
    title: "Kids",
    description:
      "Форма й взуття для юніорів, які лише починають свій шлях на турнірах.",
    items: ["Базова форма", "Взуття для перших турнірів"],
  },
  {
    slug: "accessories",
    title: "Аксесуари",
    description:
      "Чохли, шкарпетки, ремінці — дрібні деталі, що додають комфорту.",
    items: ["Чохли", "Шкарпетки", "Ремінці / стрічки"],
  },
];

export default async function ShopPage() {
  const products = await getProducts();

  const categoriesWithCount = categories.map((cat) => {
    const count = products.filter((product) => product.group === cat.slug).length;

    return {
      ...cat,
      count,
    };
  });

  return (
    <div className="shop-page">
      <section className="section p-0">
        <div className="section-header">
          <h1 className="shop-title">Магазин FRM</h1>
          <p className="shop-subtitle">
            Обери категорію: взуття, форма, kids або аксесуари. Далі — моделі під твій стиль танцю.
          </p>
        </div>

        <div className="grid-cards">
          {categoriesWithCount.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className={`category-card shop-category-card shop-category-card-${cat.slug}`}
            >
              <div className="shop-category-header">
                <h2>{cat.title}</h2>
                {/* <span className="shop-category-count">{cat.count} товарів</span> */}
              </div>

              <p>{cat.description}</p>

              <ul className="shop-category-list">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <span className="shop-category-pill">Перейти →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}