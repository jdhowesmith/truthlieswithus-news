import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles, getBySection, formatDate } from "@/lib/articles";
import { SECTIONS } from "@/lib/sections";


export default function Home() {
  const all = getAllArticles();
  const ranked = [...all].sort((a, b) => b.priority - a.priority);
  const lead = ranked[0];
  const side = ranked.slice(1, 5);
  const grid = ranked.slice(5, 11);
  const shown = new Set([lead, ...side, ...grid].map((a) => a.slug));
  const blocks = ["shuswap-bc", "florida", "canada", "world", "business", "weather-alerts", "sports", "culture"];
  const latest = all[0];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 py-3 text-sm dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-400">
          <span className="mr-2 inline-block rounded-sm bg-brand px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">Today</span>
          {latest ? `Morning edition · ${formatDate(latest.date)}` : "Morning edition"}
        </p>
        <p className="hidden text-neutral-500 sm:block dark:text-neutral-400">{all.length} stories · every one sourced</p>
      </div>

      <section aria-label="Top stories" className="grid gap-8 py-8 lg:grid-cols-12">
        <div className="lg:col-span-8">{lead && <ArticleCard article={lead} variant="lead" priority />}</div>
        <aside className="lg:col-span-4 lg:border-l lg:border-neutral-200 lg:pl-8 dark:lg:border-neutral-800">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">Also leading</h2>
          {side.map((a) => <ArticleCard key={a.slug} article={a} variant="horizontal" />)}
        </aside>
      </section>

      <section aria-label="More top stories" className="grid gap-x-8 gap-y-10 border-t border-neutral-200 py-8 sm:grid-cols-2 lg:grid-cols-3 dark:border-neutral-800">
        {grid.map((a) => <ArticleCard key={a.slug} article={a} />)}
      </section>

      {blocks.map((slug) => {
        const s = SECTIONS.find((x) => x.slug === slug)!;
        const items = getBySection(slug).slice(0, 4);
        if (!items.length) return null;
        return (
          <section key={slug} aria-labelledby={`h-${slug}`} className="border-t-2 border-neutral-900 py-6 dark:border-neutral-200">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 id={`h-${slug}`} className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{s.name}</h2>
              <Link href={`/section/${slug}`} className="text-sm font-semibold text-brand hover:underline">More {s.short ?? s.name} →</Link>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((a) => (
                <ArticleCard key={a.slug} article={a} variant={shown.has(a.slug) ? "compact" : "compact"} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
