import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://pagelypdf.com";
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/pdf-merge", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pdf-split", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/compress-pdf", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/extract-pdf", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/delete-pages", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/reorder-pages", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/rotate-pdf", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/protect-pdf", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/unlock-pdf", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/pdf-to-word", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pdf-to-jpg", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pdf-to-excel", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/pdf-to-ppt", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/word-to-pdf", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/jpg-to-pdf", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/ppt-to-pdf", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/excel-to-pdf", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
