import type { NextConfig } from "next";

// Two deploy modes:
// - Vercel (default): full Next.js server with image optimization.
// - GitHub Pages (STATIC_EXPORT=1): static HTML in ./out, served under NEXT_PUBLIC_BASE_PATH.
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  basePath: basePath || undefined,
  images: {
    unoptimized: isExport,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
