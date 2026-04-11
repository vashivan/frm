'use client'

import { useState } from "react"

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      fetch("/api/form", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      setTimeout(() => {
        setErrorMsg('Помилка при відправці форми. Спробуйте ще раз.');
      }, 3000);
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }
  };

  return (
    <section className="pt-25 pr-10 pl-10 flex flex-col text-center items-center">
      <h1 className="text-3xl pb-10 md:text-4xl font-medium">
        Зворотній зв'язок
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-8 w-full max-w-md"
      >
        <input
          value={formData.name}
          type="text"
          name="name"
          placeholder="Ваше ім'я"
          onChange={handleChange}
          className="border-b-2 outline-0 w-full"
        />
        <input
          value={formData.email}
          type="email"
          name="email"
          placeholder="Ваш email"
          onChange={handleChange}
          className="border-b-2 outline-0 w-full"
        />
        <input
          value={formData.phone}
          type="tel"
          name="phone"
          placeholder="Ваш телефон"
          onChange={handleChange}
          className="border-b-2 outline-0 w-full"
        />
        <textarea
          value={formData.message}
          name="message"
          placeholder="Ваше повідомлення"
          onChange={handleChange}
          className="border-b-2 outline-0 w-full"
        ></textarea>
        <button
          type="submit"
          className="btn border w-full cursor-pointer hover:bg-gray-500"
        >
          {loading ? "Відправка..." : "Відправити"}
        </button>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        {success && <p className="text-green-500">Форма успішно відправлена!</p>}
      </form>
    </section>
  )
}