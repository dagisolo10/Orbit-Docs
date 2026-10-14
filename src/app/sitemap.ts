import { docHref, docsFlat } from "@/content/docs/nav";
import { releaseDetailPath, releases } from "@/content/releases";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date(siteConfig.releaseDate);
    const docsRoutes = docsFlat
        .filter((item) => item.slug !== "introduction")
        .map((item) => ({
            url: absoluteUrl(docHref(item.slug)),
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));
    const releaseRoutes = releases.map((release) => ({
        url: absoluteUrl(releaseDetailPath(release.tag)),
        lastModified: new Date(release.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
    }));

    return [
        { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: absoluteUrl("/docs"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        ...docsRoutes,
        { url: absoluteUrl("/releases"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        ...releaseRoutes,
    ];
}
