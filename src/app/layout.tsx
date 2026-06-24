import type { Metadata } from "next";
import { Open_Sans, Source_Sans_3 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asemuch-coquimbo.vercel.app";
const SITE_DESCRIPTION =
  "Asociación de Empleados Municipales — Sede Región de Coquimbo. Defendemos los derechos laborales de los funcionarios municipales de las 15 comunas de la IV Región.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ASEMUCH Coquimbo | Sede Región de Coquimbo",
    template: "%s | ASEMUCH Coquimbo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ASEMUCH",
    "funcionarios municipales",
    "Región de Coquimbo",
    "La Serena",
    "sindicato municipal",
    "derechos laborales",
    "estatuto municipal",
  ],
  authors: [{ name: "ASEMUCH Sede Regional Coquimbo" }],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: "ASEMUCH Coquimbo",
    title: "ASEMUCH Coquimbo | Sede Región de Coquimbo",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ASEMUCH — Sede Región de Coquimbo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASEMUCH Coquimbo | Sede Región de Coquimbo",
    description: SITE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${openSans.variable} ${sourceSans3.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
