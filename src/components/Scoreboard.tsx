import Link from "next/link";
import type { ScoreDay, Team } from "@/lib/data";

function Row({ team, win }: { team: Team; win: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 py-1.5 ${win ? "font-bold text-neutral-950 dark:text-white" : "text-neutral-600 dark:text-neutral-400"}`}>
      <span className="flex min-w-0 items-center gap-2">
        <span className="w-10 shrink-0 font-mono text-sm tracking-tight">{team.abbr}</span>
        <span className="truncate text-sm">{team.name}</span>
        {team.record && <span className="shrink-0 text-xs font-normal text-neutral-500">({team.record})</span>}
      </span>
      <span className="font-mono text-xl tabular-nums">{team.score}</span>
    </div>
  );
}

export default function Scoreboard({ data }: { data: ScoreDay }) {
  return (
    <section aria-labelledby="scores-h" className="rounded-sm border border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 id="scores-h" className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">Last night&rsquo;s scores</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{data.label} · Finals</p>
      </div>
      <div className="grid gap-6 p-4 md:grid-cols-2">
        {data.leagues.map((lg) => (
          <div key={lg.league}>
            <h3 className="flex items-baseline gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand">
              {lg.league}
              {lg.note && <span className="font-medium normal-case tracking-normal text-neutral-500">{lg.note}</span>}
            </h3>
            {lg.games.length === 0 && <p className="mt-2 text-sm text-neutral-500">No games.</p>}
            <ul className="mt-2 space-y-3">
              {lg.games.map((g, i) => {
                const awayWin = g.away.score > g.home.score;
                return (
                  <li key={i} className="rounded-sm border border-neutral-200 px-3 py-2 dark:border-neutral-800">
                    <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      <span>{g.status}</span>
                      {g.venue && <span className="font-normal normal-case tracking-normal">at {g.venue}</span>}
                    </div>
                    <Row team={g.away} win={awayWin} />
                    <Row team={g.home} win={!awayWin} />
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-100 pt-1.5 text-sm dark:border-neutral-800">
                      {g.story && <Link href={`/news/${g.story}`} className="font-semibold text-brand hover:underline">Our story</Link>}
                      {g.links.map((l) => (
                        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="text-neutral-600 underline-offset-2 hover:text-brand hover:underline dark:text-neutral-400">{l.label} ↗</a>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-neutral-200 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-800">
        Scores checked against {data.verifiedWith.join(", ")}. OT and SO mark overtime and shootout finals.
      </p>
    </section>
  );
}
