import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/articles";
import { getSection } from "@/lib/sections";
import { asset, thumb } from "@/lib/site";

type Variant = "lead" | "standard" | "compact" | "horizontal";

export function Kicker({ article }: { article: Article }) {
  const s = getSection(article.section);
  return (
    <Link href={`/section/${article.section}`} className="text-xs font-bold uppercase tracking-wider text-brand hover:underline">
      {s?.short ?? s?.name}
    </Link>
  );
}

export default function ArticleCard({ article, variant = "standard", priority = false }: { article: Article; variant?: Variant; priority?: boolean }) {
  const href = `/news/${article.slug}`;
  if (variant === "lead") {
    return (
      <article className="group">
        <Link href={href} className="block overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={asset(article.image.src)}
            alt={article.image.alt}
            width={article.image.width}
            height={article.image.height}
            priority={priority}
            sizes="(min-width: 1024px) 760px, 100vw"
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </Link>
        <div className="mt-4">
          <Kicker article={article} />
          <h2 className="mt-1 font-serif text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl dark:text-white">
            <Link href={href} className="hover:underline decoration-2 underline-offset-4">{article.title}</Link>
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{article.dek}</p>
          <Meta article={article} />
        </div>
      </article>
    );
  }
  if (variant === "compact") {
    return (
      <article className="border-t border-neutral-200 py-3 first:border-t-0 dark:border-neutral-800">
        <Kicker article={article} />
        <h3 className="mt-0.5 font-serif text-lg font-semibold leading-snug text-neutral-950 dark:text-white">
          <Link href={href} className="hover:underline underline-offset-2">{article.title}</Link>
        </h3>
        <Meta article={article} small />
      </article>
    );
  }
  if (variant === "horizontal") {
    return (
      <article className="group grid grid-cols-[1fr_7rem] gap-4 border-t border-neutral-200 py-4 first:border-t-0 sm:grid-cols-[1fr_10rem] dark:border-neutral-800">
        <div>
          <Kicker article={article} />
          <h3 className="mt-0.5 font-serif text-lg font-semibold leading-snug text-neutral-950 sm:text-xl dark:text-white">
            <Link href={href} className="hover:underline underline-offset-2">{article.title}</Link>
          </h3>
          <p className="mt-1 hidden text-sm text-neutral-600 sm:block dark:text-neutral-400">{article.dek}</p>
          <Meta article={article} small />
        </div>
        <Link href={href} className="block self-start overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900">
          <Image src={thumb(article.image.src)} alt={article.image.alt} width={article.image.width} height={article.image.height} sizes="160px" className="aspect-[4/3] w-full object-cover" />
        </Link>
      </article>
    );
  }
  return (
    <article className="group">
      <Link href={href} className="block overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={thumb(article.image.src)}
          alt={article.image.alt}
          width={article.image.width}
          height={article.image.height}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="mt-3">
        <Kicker article={article} />
        <h3 className="mt-0.5 font-serif text-xl font-semibold leading-snug text-neutral-950 dark:text-white">
          <Link href={href} className="hover:underline underline-offset-2">{article.title}</Link>
        </h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">{article.dek}</p>
        <Meta article={article} small />
      </div>
    </article>
  );
}

function Meta({ article, small }: { article: Article; small?: boolean }) {
  return (
    <p className={`mt-2 flex flex-wrap items-center gap-x-2 text-neutral-500 dark:text-neutral-400 ${small ? "text-xs" : "text-sm"}`}>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden>·</span>
      <span>{article.readingMinutes} min read</span>
      {article.video && (<><span aria-hidden>·</span><span className="inline-flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z"/></svg>Video</span></>)}
    </p>
  );
}
