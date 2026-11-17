import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticle, getRelated, formatDate } from "@/lib/articles";
import { getSection } from "@/lib/sections";
import { SITE, asset } from "@/lib/site";
import ShareButtons from "@/components/ShareButtons";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    openGraph: { title: a.title, description: a.dek, type: "article", publishedTime: a.date, images: [{ url: asset(a.image.src), width: a.image.width, height: a.image.height, alt: a.image.alt }] },
    twitter: { card: "summary_large_image", title: a.title, description: a.dek, images: [asset(a.image.src)] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const section = getSection(a.section);
  const related = getRelated(a, 3);
  const url = `${SITE.url}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/news/${a.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.dek,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    image: [SITE.url + asset(a.image.src)],
    author: { "@type": "Organization", name: SITE.byline },
    publisher: { "@type": "Organization", name: SITE.name },
  };
  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm">
          <Link href={`/section/${a.section}`} className="font-bold uppercase tracking-wider text-brand hover:underline">{section?.name}</Link>
          {a.location && <span className="ml-2 text-neutral-500 dark:text-neutral-400">· {a.location}</span>}
        </nav>
        <h1 className="mt-2 font-serif text-[2rem] font-bold leading-[1.15] text-neutral-950 sm:text-5xl dark:text-white">{a.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-700 sm:text-xl dark:text-neutral-300">{a.dek}</p>
        <div className="mt-5 flex flex-col gap-4 border-y border-neutral-200 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <p className="font-semibold text-neutral-900 dark:text-neutral-100">By {SITE.byline}</p>
            <p>
              <time dateTime={a.date}>{formatDate(a.date, true)}</time>
              {a.updated && <> · Updated <time dateTime={a.updated}>{formatDate(a.updated, true)}</time></>}
              {" "}· {a.readingMinutes} min read
            </p>
          </div>
          <ShareButtons url={url} title={a.title} />
        </div>
      </div>

      <figure className="mx-auto mt-6 max-w-5xl">
        <Image
          src={asset(a.image.src)}
          alt={a.image.alt}
          width={a.image.width}
          height={a.image.height}
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="aspect-[16/9] w-full rounded-sm object-cover"
        />
        <figcaption className="mx-auto mt-2 max-w-3xl text-sm text-neutral-600 dark:text-neutral-400">
          {a.image.caption && <span>{a.image.caption} </span>}
          <span className="text-neutral-500">
            {a.image.illustrative ? "Illustrative image. " : ""}Photo: {a.image.creditUrl ? <a className="underline underline-offset-2 hover:text-brand" href={a.image.creditUrl} target="_blank" rel="noopener noreferrer">{a.image.credit}</a> : a.image.credit}
            {a.image.license && <> ({a.image.licenseUrl ? <a className="underline underline-offset-2 hover:text-brand" href={a.image.licenseUrl} target="_blank" rel="noopener noreferrer license">{a.image.license}</a> : a.image.license})</>}
          </span>
        </figcaption>
      </figure>

      <div className="mx-auto mt-8 max-w-3xl">
        {a.keyPoints.length > 0 && (
          <section aria-labelledby="kp" className="mb-8 rounded-sm border-l-4 border-brand bg-neutral-50 p-5 dark:bg-neutral-900">
            <h2 id="kp" className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-300">The facts at a glance</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">
              {a.keyPoints.map((k) => <li key={k}>{k}</li>)}
            </ul>
          </section>
        )}

        <div className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">The reporting</div>
        <div
          className="article-body prose prose-lg prose-neutral mt-3 max-w-none font-serif dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-h2:text-xl prose-a:text-brand prose-a:underline-offset-2 prose-p:leading-[1.75]"
          dangerouslySetInnerHTML={{ __html: a.html }}
        />

        {a.video && <YouTubeEmbed id={a.video.youtubeId} title={a.video.title} credit={a.video.credit} />}

        {a.ourTake && (
          <aside aria-labelledby="take" className="my-10 rounded-sm border border-amber-300 bg-amber-50 p-6 dark:border-amber-700/60 dark:bg-amber-950/30">
            <div className="flex items-center gap-2">
              <span className="rounded-sm bg-amber-600 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">Analysis</span>
              <h2 id="take" className="font-serif text-xl font-bold text-neutral-950 dark:text-white">Our Take</h2>
            </div>
            <div className="prose prose-neutral mt-3 max-w-none dark:prose-invert prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: a.ourTakeHtml }} />
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">This section is opinion and analysis from {SITE.name}, not news reporting.</p>
          </aside>
        )}

        <section aria-labelledby="src" className="border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <h2 id="src" className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-300">Sources</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
            {a.sources.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 underline-offset-2 hover:text-brand hover:decoration-brand">{s.title}</a></li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">Spotted an error? Email <a className="underline" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Correction: " + a.title)}`}>{SITE.email}</a>.</p>
          <div className="mt-6"><ShareButtons url={url} title={a.title} /></div>
        </section>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="rel" className="mx-auto mt-14 max-w-7xl border-t-2 border-neutral-900 pt-6 dark:border-neutral-200">
          <h2 id="rel" className="mb-6 font-serif text-2xl font-bold text-neutral-950 dark:text-white">Related stories</h2>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ArticleCard key={r.slug} article={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}
