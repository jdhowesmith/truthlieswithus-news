import fs from "node:fs";
import path from "node:path";

type Link = { label: string; url: string };
export type Team = { name: string; abbr: string; score: number; record?: string };
export type Game = { away: Team; home: Team; status: string; venue?: string; links: Link[]; story?: string };
export type ScoreDay = {
  date: string;
  label: string;
  checked: string;
  verifiedWith: string[];
  leagues: { league: string; note?: string; games: Game[] }[];
  underReported: { league: string; items: { headline: string; text: string; sources: { title: string; url: string }[] }[] }[];
};

export type StreamItem = { title: string; type: string; service: string; availability: string; date: string; summary: string; url: string };
export type StreamingDay = {
  date: string;
  title: string;
  canadaNote?: string;
  outToday: StreamItem[];
  recent: StreamItem[];
  charts?: { name: string; week: string; url: string; lists: { label: string; items: string[] }[] };
  sources: { title: string; url: string }[];
};

function latest<T>(dir: string): T | null {
  const full = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(full)) return null;
  const files = fs.readdirSync(full).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
  const last = files.at(-1);
  return last ? (JSON.parse(fs.readFileSync(path.join(full, last), "utf8")) as T) : null;
}

/** Newest file in content/scores/ (named for the game date, e.g. 2026-11-16.json). */
export const getLatestScores = () => latest<ScoreDay>("scores");
/** Newest file in content/streaming/ (named for the publish date). */
export const getLatestStreaming = () => latest<StreamingDay>("streaming");
