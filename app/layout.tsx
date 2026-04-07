import type { Metadata } from "next";
import { Montserrat, Jura } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORM — Dance Wear & Shoes",
  description:
    "FRM — танцювальне взуття та форма. Стиль, що підкреслює рух. Магазин танцювального одягу, взуття та аксесуарів.",
  keywords: [
    "dance wear",
    "dance shoes",
    "форма для танців",
    "танцювальне взуття",
    "FRM",
  ],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "FORM — Dance Wear & Shoes",
    description: "Твій рух має форму.",
    url: "https://frm.store", // змінюєш на свій домен
    siteName: "FORM",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FRM — dance wear",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body
        className={`${montserrat.variable} ${jura.variable} antialiased site-body`}
      >
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
