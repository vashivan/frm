import Link from "next/link";

export default function Delivery() {
  return (
    <section className="px-6 py-20 md:px-20 flex flex-col text-center items-center">
      <div className="space-y-10 flex flex-col text-center items-center">

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-medium">
            Доставка та оплата
          </h1>
          <p className="text-white-500">
            Ми працюємо без складу — кожне замовлення формується індивідуально.
            Це дозволяє тримати якість і доступну ціну, але потребує трохи більше часу.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Як відбувається замовлення</h2>
          <p className="text-white-500">
            Після оформлення замовлення ми перевіряємо наявність товару або запускаємо його у виробництво.
            Всі позиції замовляються або виготовляються під замовлення.
          </p>
          <p className="text-white-500">
            Саме тому доставка займає в середньому{" "}
            <span className="text-black font-medium">
              10–14 робочих днів
            </span>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Доставка</h2>
          <p className="text-white-500">
            Доставка здійснюється по всій Україні через зручні поштові служби.
          </p>
          <p className="text-white-500">
            Після відправки ви отримуєте трек-номер для відстеження замовлення.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Оплата</h2>
          <p className="text-white-500">
            Оплата здійснюється будь-яким зручним способом: карткою, готівкою при отриманні або через банківський переказ.
          </p>
          <p className="text-white-500">
            Це дозволяє одразу запустити процес обробки та виготовлення товару без затримок.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Опт та індивідуальні замовлення</h2>
          <p className="text-white-500">
            Якщо вас цікавить опт, співпраця або викуп для студії чи команди —
            залиште заявку через форму на сайті.
          </p>
          <p className="text-white-500">
            Ми зв’яжемося з вами, уточнимо деталі та запропонуємо індивідуальні умови.
          </p>
          <button className="btn border flex p-0 cursor-pointer hover:bg-gray-500">
            <Link href="/contact" className="flex h-full w-full m-0">
            Лишити заявку
          </Link>
          </button>
        </div>
      </div>
    </section>
  );
}