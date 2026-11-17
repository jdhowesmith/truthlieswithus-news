import type { ScoreDay } from "@/lib/data";

export default function UnderReported({ data }: { data: ScoreDay }) {
  if (!data.underReported?.length) return null;
  return (
    <section aria-labelledby="ur-h" className="mt-8">
      <h2 id="ur-h" className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">Under-reported</h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Verified facts from last night that didn&rsquo;t make most headlines.</p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {data.underReported.map((lg) => (
          <div key={lg.league} className="rounded-sm border-l-4 border-brand bg-neutral-50 p-4 dark:bg-neutral-900">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{lg.league}</h3>
            <ul className="mt-2 space-y-4">
              {lg.items.map((it) => (
                <li key={it.headline}>
                  <p className="font-serif text-lg font-semibold text-neutral-950 dark:text-white">{it.headline}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">{it.text}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Source:{" "}
                    {it.sources.map((s, i) => (
                      <span key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">{s.title}</a></span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
