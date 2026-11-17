import type { MetadataRoute } from "next";
// Preview: block indexing until the real domain is live. Flip to allow: "/" at launch.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
