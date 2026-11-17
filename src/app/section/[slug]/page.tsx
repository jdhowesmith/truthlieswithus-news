import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getBySection } from "@/lib/articles";
import { SECTIONS, getSection } from "@/lib/sections";
import { getLatestScores, getLatestStreaming, getLatestX } from "@/lib/data";
import Scoreboard from "@/components/Scoreboard";
import UnderReported from "@/components/UnderReported";
import Streaming from "@/components/Streaming";
import WeatherPanel from "@/components/WeatherPanel";
import XFeed from "@/components/XFeed";

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSection(slug);
  return { title: s?.name ?? "Section", description: s?.blurb };
}

export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSection(slug);
  if (!s) notFound();
  const items = getBySection(slug);
  const [first, ...rest] = items;
  const scores = slug === "sports" ? getLatestScores() : null;
  const streaming = slug === "culture" ? getLatestStreaming() : null;
  const xday = slug === "x" ? getLatestX() : null;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="border-b-2 border-neutral-900 pb-4 dark:border-neutral-200">
        <h1 className="font-serif text-4xl font-bold text-neutral-950 dark:text-white">{s.name}</h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">{s.blurb}</p>
      </header>
      {scores && (
        <div className="pt-6">
          <Scoreboard data={scores} />
          <UnderReported data={scores} />
        </div>
      )}
      {streaming && <div className="pt-6"><Streaming data={streaming} /></div>}
      {xday && <div className="pt-6"><XFeed data={xday} /></div>}
      {slug === "weather-alerts" && <div className="pt-6"><WeatherPanel /></div>}
      {first ? (
        <>
          <div className="py-8 lg:w-2/3"><ArticleCard article={first} variant="lead" priority /></div>
          <div className="grid gap-x-8 gap-y-10 border-t border-neutral-200 pt-8 sm:grid-cols-2 lg:grid-cols-3 dark:border-neutral-800">
            {rest.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </>
      ) : !xday ? (
        <p className="py-16 text-center text-neutral-500">No stories in this section yet. Check back tomorrow morning.</p>
      ) : null}
    </div>
  );
}
