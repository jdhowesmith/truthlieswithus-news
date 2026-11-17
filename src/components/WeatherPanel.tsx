"use client";
import { useState } from "react";
import { PLACES } from "@/lib/locations";
import LiveWeather from "./LiveWeather";

type Mode = "local" | "metric" | "imperial";

export default function WeatherPanel() {
  const [mode, setMode] = useState<Mode>("local");
  const opts: { v: Mode; l: string }[] = [
    { v: "local", l: "Local units" },
    { v: "metric", l: "°C" },
    { v: "imperial", l: "°F" },
  ];
  return (
    <div>
      <div role="radiogroup" aria-label="Units" className="mb-4 inline-flex rounded-full border border-neutral-300 p-0.5 text-sm dark:border-neutral-700">
        {opts.map((o) => (
          <button key={o.v} role="radio" aria-checked={mode === o.v} onClick={() => setMode(o.v)}
            className={`rounded-full px-3 py-1 font-medium ${mode === o.v ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-600 dark:text-neutral-300"}`}>
            {o.l}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {PLACES.map((p) => <LiveWeather key={p.id} place={p} units={mode === "local" ? undefined : mode} />)}
      </div>
    </div>
  );
}
