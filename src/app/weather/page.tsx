import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import WeatherPanel from "@/components/WeatherPanel";
import { getBySection } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Weather",
  description: "Live forecasts and alert links for the Shuswap, B.C. and Fort Myers Beach, Fla., plus the day's weather stories.",
};

export default function WeatherPage() {
  const stories = getBySection("weather-alerts");
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="border-b-2 border-neutral-900 pb-4 dark:border-neutral-200">
        <h1 className="font-serif text-4xl font-bold text-neutral-950 dark:text-white">Weather</h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">Live conditions and 7-day forecasts for the Shuswap and Fort Myers Beach, with links to official alerts.</p>
      </header>
      <div className="py-6"><WeatherPanel /></div>
      {stories.length > 0 && (
        <section aria-labelledby="wx-stories" className="border-t-2 border-neutral-900 pt-6 dark:border-neutral-200">
          <h2 id="wx-stories" className="mb-6 font-serif text-2xl font-bold text-neutral-950 dark:text-white">Weather &amp; alert stories</h2>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}
    </div>
  );
}
