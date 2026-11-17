import Link from "next/link";
import type { XDay, XFlag, XPostCard } from "@/lib/data";

function count(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function when(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-CA", {
    timeZone: "America/Vancouver",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }) + " B.C. time";
}

const flagClass: Record<XFlag["kind"], string> = {
  confirmed: "bg-emerald-700 text-white dark:bg-emerald-600",
  partial: "bg-sky-800 text-white dark:bg-sky-700",
  unverified: "bg-amber-600 text-white dark:bg-amber-500 dark:text-neutral-950",
  disputed: "bg-brand text-white",
  older: "bg-neutral-600 text-white dark:bg-neutral-500",
};

function Flag({ flag }: { flag: XFlag }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className={`rounded-sm px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${flagClass[flag.kind]}`}>
        {flag.label}
      </span>
      {flag.note && <span className="text-xs text-neutral-600 dark:text-neutral-400">{flag.note}</span>}
      {flag.source && (
        <a href={flag.source.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand underline-offset-2 hover:underline">
          {flag.source.title} ↗
        </a>
      )}
    </span>
  );
}

function PostCard({ post }: { post: XPostCard }) {
  return (
    <li className="rounded-sm border border-neutral-200 p-3 dark:border-neutral-800">
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90">
        <p className="text-sm font-semibold text-neutral-950 dark:text-white">
          {post.name} <span className="font-normal text-neutral-500">@{post.username}</span>
        </p>
        <p className="mt-1 text-[15px] leading-snug text-neutral-800 dark:text-neutral-200">“{post.excerpt}”</p>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-neutral-500">
          <span>{when(post.createdAt)}</span>
          <span>{count(post.likes)} likes</span>
          <span>{count(post.reposts)} reposts</span>
          <span>{count(post.replies)} replies</span>
        </p>
      </a>
    </li>
  );
}

function TrendRow({ label, items }: { label: string; items: { name: string; url: string }[] }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">{label}</p>
      <ul className="no-scrollbar mt-1 flex gap-2 overflow-x-auto pb-1">
        {items.map((t) => (
          <li key={label + t.name} className="shrink-0">
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-neutral-300 px-2.5 py-1 text-sm text-neutral-800 hover:border-brand hover:text-brand dark:border-neutral-700 dark:text-neutral-200"
            >
              {t.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function XFeed({ data }: { data: XDay }) {
  return (
    <div className="space-y-10">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        From the @{data.account} home timeline, {data.windowLabel}. Checked {data.checkedLabel}.
        Posts are quoted and attributed; a claim in a post is not a fact until it is confirmed. Counts may have changed since this check.
      </p>

      <section aria-labelledby="trends-h" className="rounded-sm border border-neutral-200 dark:border-neutral-800">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 id="trends-h" className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">Trending on X</h2>
        </div>
        <div className="space-y-4 p-4">
          <TrendRow label="Canada" items={data.trends.canada} />
          <TrendRow label="United States" items={data.trends.us} />
          <TrendRow label="Worldwide" items={data.trends.worldwide} />
          {data.trendsNote && <p className="text-xs text-neutral-500">{data.trendsNote}</p>}
        </div>
      </section>

      <section aria-labelledby="today-x-h">
        <h2 id="today-x-h" className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{data.title}</h2>
        <ol className="mt-4 space-y-8">
          {data.themes.map((theme, i) => (
            <li key={theme.id} className="rounded-sm border border-neutral-200 dark:border-neutral-800">
              <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Theme {i + 1}</p>
                <h3 className="mt-1 font-serif text-xl font-bold text-neutral-950 sm:text-2xl dark:text-white">{theme.title}</h3>
                <div className="mt-2 flex flex-col gap-1.5">
                  {theme.flags.map((f) => <Flag key={f.label} flag={f} />)}
                </div>
              </div>
              <div className="space-y-3 px-4 py-4">
                <p className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200">{theme.summary}</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-semibold text-neutral-950 dark:text-white">Why it matters. </span>
                  {theme.whyItMatters}
                </p>
                {theme.related.length > 0 && (
                  <p className="text-sm">
                    <span className="font-semibold text-neutral-950 dark:text-white">Related on this site: </span>
                    {theme.related.map((r, j) => (
                      <span key={r.slug}>
                        {j > 0 && " · "}
                        <Link href={`/news/${r.slug}`} className="font-medium text-brand underline-offset-2 hover:underline">{r.title}</Link>
                      </span>
                    ))}
                  </p>
                )}
                <ul className="grid gap-3 sm:grid-cols-2">
                  {theme.posts.map((p) => <PostCard key={p.id} post={p} />)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="engaged-h" className="rounded-sm border border-neutral-200 dark:border-neutral-800">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 id="engaged-h" className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">Most engaged posts</h2>
          {data.mostEngagedNote && <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{data.mostEngagedNote}</p>}
        </div>
        <ol className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {data.mostEngaged.map((p, i) => (
            <li key={p.id} className="px-4 py-3">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:opacity-90">
                <span className="w-6 shrink-0 font-serif text-lg font-bold text-neutral-400">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {p.name} <span className="font-normal text-neutral-500">@{p.username}</span>
                  </p>
                  <p className="mt-0.5 text-[15px] text-neutral-800 dark:text-neutral-200">“{p.excerpt}”</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {count(p.likes)} likes · {count(p.reposts)} reposts · {count(p.engagement)} total engagement
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="follow-h" className="rounded-sm border border-neutral-200 dark:border-neutral-800">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 id="follow-h" className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">Who we follow</h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            @{data.account} follows {data.following.total} accounts. Grouped below by category, with a few well-known names in each. This is not a list of anyone else’s followers.
          </p>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.following.categories.map((c) => (
            <div key={c.id}>
              <p className="text-sm font-bold text-neutral-950 dark:text-white">
                {c.name} <span className="font-normal text-neutral-500">({c.count})</span>
              </p>
              <ul className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                {c.accounts.map((a) => (
                  <li key={a.username}>
                    <a href={`https://x.com/${a.username}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand hover:underline underline-offset-2">
                      {a.name} <span className="text-neutral-500">@{a.username}</span>
                    </a>
                  </li>
                ))}
                {c.count > c.accounts.length && (
                  <li className="text-xs text-neutral-500">+{c.count - c.accounts.length} more</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-neutral-500">{data.method}</p>
    </div>
  );
}
