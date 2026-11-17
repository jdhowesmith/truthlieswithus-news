import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type ArticleImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  credit: string;
  creditUrl?: string;
  license?: string;
  licenseUrl?: string;
  illustrative?: boolean;
};

export type ArticleVideo = {
  youtubeId: string;
  title: string;
  credit: string;
};

export type Source = { title: string; url: string };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO with offset
  updated?: string;
  section: string;
  sections: string[]; // primary + extra
  tags: string[];
  priority: number; // higher = more prominent
  location?: string;
  image: ArticleImage;
  video?: ArticleVideo;
  keyPoints: string[];
  ourTake: string; // markdown
  ourTakeHtml: string;
  sources: Source[];
  html: string;
  readingMinutes: number;
};

const DIR = path.join(process.cwd(), "content", "articles");
const IMAGES: Record<string, ArticleImage> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "content", "images.json"), "utf8"),
);

function resolveImage(img: unknown, caption?: string): ArticleImage {
  const base = typeof img === "string" ? IMAGES[img] : (img as ArticleImage);
  if (!base) throw new Error(`Unknown image: ${String(img)} (add it to content/images.json)`);
  return { ...base, caption: caption ?? base.caption };
}

let cache: Article[] | null = null;

function load(): Article[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const list = files.map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = (data.slug as string) || file.replace(/\.md$/, "");
    const ourTake = String(data.ourTake || "").trim();
    const words = (content + " " + ourTake).split(/\s+/).filter(Boolean).length;
    const section = data.section as string;
    return {
      slug,
      title: data.title,
      dek: data.dek,
      date: new Date(data.date).toISOString(),
      updated: data.updated ? new Date(data.updated).toISOString() : undefined,
      section,
      sections: Array.from(new Set([section, ...((data.alsoIn as string[]) || [])])),
      tags: (data.tags as string[]) || [],
      priority: Number(data.priority ?? 0),
      location: data.location,
      image: resolveImage(data.image, data.imageCaption),
      video: data.video,
      keyPoints: (data.keyPoints as string[]) || [],
      ourTake,
      ourTakeHtml: marked.parse(ourTake, { async: false }) as string,
      sources: (data.sources as Source[]) || [],
      html: marked.parse(content, { async: false }) as string,
      readingMinutes: Math.max(1, Math.round(words / 225)),
    } satisfies Article;
  });
  list.sort((a, b) => {
    const da = a.date.slice(0, 10);
    const db = b.date.slice(0, 10);
    if (da !== db) return db.localeCompare(da);
    return b.priority - a.priority || b.date.localeCompare(a.date);
  });
  cache = list;
  return list;
}

export function getAllArticles() {
  return load();
}

export function getArticle(slug: string) {
  return load().find((a) => a.slug === slug);
}

export function getBySection(section: string) {
  if (section === "top-stories") return load().filter((a) => a.priority >= 7);
  return load().filter((a) => a.sections.includes(section));
}

export function getRelated(article: Article, n = 3) {
  const others = load().filter((a) => a.slug !== article.slug);
  const score = (a: Article) =>
    a.sections.filter((s) => article.sections.includes(s)).length * 3 +
    a.tags.filter((t) => article.tags.includes(t)).length * 2 +
    a.priority / 10;
  return others.sort((a, b) => score(b) - score(a)).slice(0, n);
}

// Times display in B.C. time, which matches UTC-7 for this edition.
const TZ = "Etc/GMT+7";

export function formatDate(iso: string, withTime = false) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-CA", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (!withTime) return date;
  const time = d.toLocaleTimeString("en-CA", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date}, ${time} B.C. time`;
}
