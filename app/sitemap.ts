import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export const dynamic = "force-static";

// One page; case files live under #work/<slug>, which crawlers treat as the same URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${profile.siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
