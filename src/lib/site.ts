export const SITE = {
  name: "Truth Lies With Us",
  tagline: "Clear, sourced news from the Shuswap to Fort Myers Beach.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://truthlieswithus.com",
  email: "truthlieswithus@gmail.com",
  byline: "Truth Lies With Us Staff",
};

/** Prefix a /public asset path with the deploy base path (needed for GitHub Pages). */
export function asset(src: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return src.startsWith("/") ? `${base}${src}` : src;
}

/** Smaller 800px variant for cards (created alongside each image as name-800.jpg). */
export function thumb(src: string) {
  return asset(src.replace(/\.jpg$/, "-800.jpg"));
}
