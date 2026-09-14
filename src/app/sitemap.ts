import type { MetadataRoute } from "next";
import { getNewsSlugs } from "@/lib/content/news";
import { getCommunicationSlugs } from "@/lib/content/communications";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asemuch-coquimbo.vercel.app";

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/quienes-somos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/directiva", priority: 0.6, changeFrequency: "monthly" },
  { path: "/noticias", priority: 0.8, changeFrequency: "daily" },
  { path: "/convenios", priority: 0.8, changeFrequency: "weekly" },
  { path: "/comunicados", priority: 0.8, changeFrequency: "daily" },
  { path: "/documentos", priority: 0.7, changeFrequency: "weekly" },
  { path: "/biblioteca", priority: 0.6, changeFrequency: "monthly" },
  { path: "/dictamenes", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  { path: "/afiliarse", priority: 0.9, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [newsSlugs, communicationSlugs] = await Promise.all([
    getNewsSlugs().catch(() => []),
    getCommunicationSlugs().catch(() => []),
  ]);

  const newsEntries: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${SITE_URL}/noticias/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const communicationEntries: MetadataRoute.Sitemap = communicationSlugs.map((slug) => ({
    url: `${SITE_URL}/comunicados/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...newsEntries, ...communicationEntries];
}
