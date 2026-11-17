import type { StreamingDay, StreamItem } from "@/lib/data";

function Item({ it }: { it: StreamItem }) {
  return (
    <li className="border-t border-neutral-200 py-3 first:border-t-0 dark:border-neutral-800">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-sm bg-neutral-900 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white dark:bg-neutral-100 dark:text-neutral-900">{it.service}</span>
        <span className="text-xs text-neutral-500">{it.date} · {it.type}</span>
      </div>
      <p className="mt-1 font-serif text-lg font-semibold text-neutral-950 dark:text-white">
        <a href={it.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">{it.title}</a>
      </p>
      <p className="text-[15px] text-neutral-700 dark:text-neutral-300">{it.summary}</p>
      <p className="mt-0.5 text-xs text-neutral-500">{it.availability}</p>
    </li>
  );
}

export default function Streaming({ data }: { data: StreamingDay }) {
  return (
    <section aria-labelledby="stream-h" className="rounded-sm border border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 id="stream-h" className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{data.title}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Updated {new Date(data.date + "T12:00:00Z").toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })}</p>
      </div>
      <div className="grid gap-6 p-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Out today</h3>
          <ul className="mt-1">{data.outToday.map((it) => <Item key={it.title} it={it} />)}</ul>
          {data.recent.length > 0 && (<>
            <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand">New this past week</h3>
            <ul className="mt-1">{data.recent.map((it) => <Item key={it.title} it={it} />)}</ul>
          </>)}
        </div>
        {data.charts && (
          <aside className="rounded-sm bg-neutral-50 p-4 dark:bg-neutral-900">
            <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">{data.charts.name}</h3>
            <p className="text-xs text-neutral-500">Week of {data.charts.week}</p>
            {data.charts.lists.map((l) => (
              <div key={l.label} className="mt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">{l.label}</p>
                <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm text-neutral-800 dark:text-neutral-200">{l.items.map((x) => <li key={x}>{x}</li>)}</ol>
              </div>
            ))}
            <a href={data.charts.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">Full charts ↗</a>
          </aside>
        )}
      </div>
      <div className="border-t border-neutral-200 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-800">
        {data.canadaNote && <p>{data.canadaNote}</p>}
        <p className="mt-1">Sources: {data.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">{s.title}</a></span>)}. Each title links to its official page.</p>
      </div>
    </section>
  );
}
