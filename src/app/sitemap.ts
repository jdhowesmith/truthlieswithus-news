import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SECTIONS, sectionHref } from "@/lib/sections";
import { SITE } from "@/lib/site";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/` },
    ...SECTIONS.slice(1).map((s) => ({ url: `${SITE.url}${process.env.NEXT_PUBLIC_BASE_PATH || ""}${sectionHref(s.slug)}` })),
    ...getAllArticles().map((a) => ({ url: `${SITE.url}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/news/${a.slug}`, lastModified: a.updated ?? a.date })),
  ];
}
