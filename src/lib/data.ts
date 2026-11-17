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

export type XFlag = {
  label: string;
  kind: "confirmed" | "partial" | "unverified" | "disputed" | "older";
  note?: string;
  source?: { title: string; url: string };
};
export type XPostCard = {
  id: string;
  username: string;
  name: string;
  url: string;
  excerpt: string;
  createdAt: string;
  likes: number;
  reposts: number;
  replies: number;
  quotes: number;
  engagement: number;
};
export type XTheme = {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  flags: XFlag[];
  related: { title: string; slug: string }[];
  posts: XPostCard[];
};
export type XDay = {
  date: string;
  title: string;
  account: string;
  windowLabel: string;
  checked: string;
  checkedLabel: string;
  method: string;
  followingTotal: number;
  timelinePosts: number;
  trendsNote?: string;
  trends: { canada: { name: string; url: string }[]; us: { name: string; url: string }[]; worldwide: { name: string; url: string }[] };
  themes: XTheme[];
  mostEngaged: XPostCard[];
  mostEngagedNote?: string;
  following: { total: number; categories: { id: string; name: string; count: number; accounts: { username: string; name: string }[] }[] };
};

/** Newest file in content/x/ (named for the publish date). */
export const getLatestX = () => latest<XDay>("x");
