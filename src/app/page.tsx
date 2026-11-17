import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles, getTopStories, formatDate } from "@/lib/articles";
import { SECTIONS, sectionHref } from "@/lib/sections";

export default function Home() {
  const all = getAllArticles();
  const top = getTopStories(5);
  const lead = top[0];
  const side = top.slice(1);
  const latest = all[0];
  const more = SECTIONS.filter((s) => s.slug !== "top-stories");
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 py-3 text-sm dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-400">
          <span className="mr-2 inline-block rounded-sm bg-brand px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">Today</span>
          {latest ? `Morning edition · ${formatDate(latest.date)}` : "Morning edition"}
        </p>
        <p className="hidden text-neutral-500 sm:block dark:text-neutral-400">
          {top.length} top stories · {all.length} in all sections
        </p>
      </div>

      <section aria-label="Top stories" className="grid gap-8 py-8 lg:grid-cols-12">
        <div className="lg:col-span-8">{lead && <ArticleCard article={lead} variant="lead" priority />}</div>
        <aside className="lg:col-span-4 lg:border-l lg:border-neutral-200 lg:pl-8 dark:lg:border-neutral-800">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">Also leading</h2>
          {side.map((a) => <ArticleCard key={a.slug} article={a} variant="horizontal" />)}
        </aside>
      </section>

      <nav aria-label="More stories in each section" className="border-t border-neutral-200 py-8 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          The rest of today’s stories live on their section pages — each story appears in only one section.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {more.map((s) => (
            <li key={s.slug}>
              <Link
                href={sectionHref(s.slug)}
                className="inline-block rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:border-brand hover:text-brand dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-brand"
              >
                {s.short ?? s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
