import type { Metadata } from "next";
import { Open_Sans, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TitleReveal from "@/components/TitleReveal";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
  "Asociación Comunal de Funcionarios Municipales de la Municipalidad de Coquimbo, afiliada a ASEMUCH desde 1911. Defendemos los derechos laborales de los funcionarios municipales de Coquimbo.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ASEMUCH Coquimbo",
  alternateName: "Asociación Comunal de Funcionarios Municipales de la Municipalidad de Coquimbo",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.webp`,
  foundingDate: "1911",
  email: "coquimbo.asemuch@gmail.com",
  telephone: "+56991899920",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Varela 1090",
    addressLocality: "Coquimbo",
    addressRegion: "Coquimbo",
    addressCountry: "CL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+56991899920",
    contactType: "customer service",
    availableLanguage: "Spanish",
    hoursAvailable: "Mo-Fr 09:00-17:30",
  },
  memberOf: {
    "@type": "Organization",
    name: "Confederación Nacional de Funcionarios Municipales de Chile ASEMUCH",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ASEMUCH Coquimbo | Asociación de Funcionarios Municipales",
    template: "%s | ASEMUCH Coquimbo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ASEMUCH Coquimbo",
    "funcionarios municipales Coquimbo",
    "asociación funcionarios municipales",
    "sindicato municipal Coquimbo",
    "derechos laborales municipales",
    "estatuto administrativo municipal",
    "IV Región Coquimbo",
    "afiliación ASEMUCH",
  ],
  authors: [{ name: "ASEMUCH Coquimbo" }],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: "ASEMUCH Coquimbo",
    title: "ASEMUCH Coquimbo | Asociación de Funcionarios Municipales",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/logo.webp",
        width: 600,
        height: 600,
        alt: "ASEMUCH Coquimbo — Asociación Comunal de Funcionarios Municipales",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ASEMUCH Coquimbo | Asociación de Funcionarios Municipales",
    description: SITE_DESCRIPTION,
    images: ["/images/logo.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <GoogleAnalytics />
        <TitleReveal />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
