"use client";
import { useEffect, useState } from "react";
import type { Place } from "@/lib/locations";

type Units = "metric" | "imperial";
type Wx = {
  current: { time: string; temperature_2m: number; apparent_temperature: number; relative_humidity_2m: number; weather_code: number; wind_speed_10m: number; wind_gusts_10m: number; wind_direction_10m: number; precipitation: number };
  daily: { time: string[]; weather_code: number[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[]; precipitation_sum: number[]; wind_gusts_10m_max: number[] };
};

const WMO: Record<number, string> = {
  0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Cloudy", 45: "Fog", 48: "Freezing fog",
  51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 56: "Freezing drizzle", 57: "Freezing drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain", 66: "Freezing rain", 67: "Freezing rain",
  71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains", 80: "Showers", 81: "Showers", 82: "Heavy showers",
  85: "Snow showers", 86: "Heavy snow showers", 95: "Thunderstorms", 96: "Thunderstorms, hail", 99: "Thunderstorms, hail",
};
const icon = (c: number) => (c === 0 || c === 1 ? "☀" : c === 2 ? "⛅" : c === 3 ? "☁" : c <= 48 ? "🌫" : c >= 95 ? "⛈" : (c >= 71 && c <= 77) || c === 85 || c === 86 ? "❄" : "🌧");
const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export default function LiveWeather({ place, units: forced }: { place: Place; units?: Units }) {
  const units = forced ?? place.defaultUnits;
  const [wx, setWx] = useState<Wx | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams({
      latitude: String(place.lat), longitude: String(place.lon), timezone: place.timezone, forecast_days: "7",
      current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,precipitation",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_gusts_10m_max",
      temperature_unit: units === "metric" ? "celsius" : "fahrenheit",
      wind_speed_unit: units === "metric" ? "kmh" : "mph",
      precipitation_unit: units === "metric" ? "mm" : "inch",
    });
    setWx(null); setErr(false);
    fetch(`https://api.open-meteo.com/v1/forecast?${q}`).then((r) => (r.ok ? r.json() : Promise.reject())).then(setWx).catch(() => setErr(true));
  }, [place, units]);

  const t = units === "metric" ? "°C" : "°F";
  const w = units === "metric" ? "km/h" : "mph";
  const p = units === "metric" ? "mm" : "in";
  return (
    <section aria-labelledby={`wx-${place.id}`} className="min-w-0 overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-800">
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 id={`wx-${place.id}`} className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">{place.name}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{place.region} · live forecast</p>
      </div>
      <div className="p-4" aria-live="polite">
        {err && <p className="text-sm text-neutral-600">The live forecast couldn&rsquo;t load. Use the official forecast links below.</p>}
        {!wx && !err && <div className="h-40 animate-pulse rounded-sm bg-neutral-100 dark:bg-neutral-900" aria-label="Loading forecast" />}
        {wx && (
          <>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
              <div className="flex items-center gap-3">
                <span className="text-5xl" aria-hidden>{icon(wx.current.weather_code)}</span>
                <span className="font-serif text-5xl font-bold tabular-nums text-neutral-950 dark:text-white">{Math.round(wx.current.temperature_2m)}{t}</span>
              </div>
              <div className="text-sm text-neutral-700 dark:text-neutral-300">
                <p className="font-semibold">{WMO[wx.current.weather_code] ?? "—"}</p>
                <p>Feels like {Math.round(wx.current.apparent_temperature)}{t} · Humidity {wx.current.relative_humidity_2m}%</p>
                <p>Wind {dirs[Math.round(wx.current.wind_direction_10m / 45) % 8]} {Math.round(wx.current.wind_speed_10m)} {w}, gusts {Math.round(wx.current.wind_gusts_10m)} {w}</p>
              </div>
            </div>
            <ol className="no-scrollbar mt-5 grid grid-flow-col auto-cols-[minmax(5.5rem,1fr)] gap-2 overflow-x-auto pb-1">
              {wx.daily.time.map((d, i) => (
                <li key={d} className="rounded-sm border border-neutral-200 p-2 text-center text-sm dark:border-neutral-800">
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">{i === 0 ? "Today" : new Date(d + "T12:00:00Z").toLocaleDateString("en-CA", { weekday: "short", timeZone: "UTC" })}</p>
                  <p className="text-2xl" aria-hidden>{icon(wx.daily.weather_code[i])}</p>
                  <p className="text-[11px] text-neutral-500">{WMO[wx.daily.weather_code[i]] ?? ""}</p>
                  <p className="mt-1 tabular-nums"><span className="font-bold text-neutral-950 dark:text-white">{Math.round(wx.daily.temperature_2m_max[i])}°</span> <span className="text-neutral-500">{Math.round(wx.daily.temperature_2m_min[i])}°</span></p>
                  <p className="text-[11px] text-sky-700 dark:text-sky-400">{wx.daily.precipitation_probability_max[i] ?? 0}% · {wx.daily.precipitation_sum[i]} {p}</p>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-[11px] text-neutral-500">Model data from <a className="underline" href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>, updated {wx.current.time.replace("T", " ")} local time. For official warnings, use the links below.</p>
          </>
        )}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Active alerts</p>
            <ul className="mt-1 space-y-1 text-sm">{place.alerts.map((a) => <li key={a.url}><a className="underline underline-offset-2 hover:text-brand" href={a.url} target="_blank" rel="noopener noreferrer">{a.label} ↗</a></li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">Official forecast</p>
            <ul className="mt-1 space-y-1 text-sm">{place.forecastLinks.map((a) => <li key={a.url}><a className="underline underline-offset-2 hover:text-brand" href={a.url} target="_blank" rel="noopener noreferrer">{a.label} ↗</a></li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
