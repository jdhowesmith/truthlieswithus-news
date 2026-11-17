export type Section = { slug: string; name: string; short?: string; blurb: string };

export const SECTIONS: Section[] = [
  { slug: "top-stories", name: "Top Stories", short: "Top", blurb: "The day's biggest stories." },
  { slug: "shuswap-bc", name: "Shuswap & B.C.", short: "Shuswap/BC", blurb: "Blind Bay, Salmon Arm, the Shuswap and British Columbia." },
  { slug: "florida", name: "Fort Myers Beach & Florida", short: "Florida", blurb: "Fort Myers Beach, Lee County and Southwest Florida." },
  { slug: "canada", name: "Canada", blurb: "National news from Ottawa and across the country." },
  { slug: "us", name: "U.S.", blurb: "American news that reaches across the border." },
  { slug: "world", name: "World", blurb: "Major international stories." },
  { slug: "business", name: "Business & Money", short: "Business", blurb: "Rates, housing, banking and your wallet." },
  { slug: "weather-alerts", name: "Weather & Alerts", short: "Weather", blurb: "Forecasts, advisories and emergency alerts for the Shuswap and Fort Myers Beach." },
  { slug: "sports", name: "Sports", blurb: "Last night's NFL and NHL scores, the big stories and the facts that slipped through." },
  { slug: "culture", name: "Culture & Obituaries", short: "Culture", blurb: "Streaming, music, entertainment and lives remembered." },
  { slug: "x", name: "X", blurb: "A daily read of what accounts we follow are posting, with claims checked and labelled." },
];

export function getSection(slug: string) {
  return SECTIONS.find((s) => s.slug === slug);
}

/** Canonical public URL for a section tab. */
export function sectionHref(slug: string) {
  if (slug === "top-stories") return "/";
  if (slug === "weather-alerts") return "/weather";
  return `/section/${slug}`;
}
