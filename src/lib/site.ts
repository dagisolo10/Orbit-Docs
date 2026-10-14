export const siteConfig = {
    name: "Orbit",
    title: "Orbit — Local project workspace for developers",
    tagline: "Every project on your disk, finally in one place.",
    description:
        "Orbit is a local, offline desktop workspace that scans your machine for JavaScript and TypeScript projects, detects the technologies each one uses, and turns them into a fast, searchable dashboard. No accounts, no cloud, no telemetry.",
    url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://orbit.dagidev.com",
    locale: "en_US",
    author: {
        name: "Dagmawi Solomon",
        url: "https://dagidev.com",
    },
    repo: {
        owner: "dagisolo10",
        name: "Orbit",
        url: "https://github.com/dagisolo10/Orbit",
        releasesUrl: "https://github.com/dagisolo10/Orbit/releases",
        issuesUrl: "https://github.com/dagisolo10/Orbit/issues",
    },
    version: "1.1.0",
    releaseDate: "2026-10-14",
    copyrightYear: 2026,
    keywords: [
        "Orbit",
        "project workspace",
        "developer tools",
        "local project manager",
        "electron app",
        "project scanner",
        "technology detection",
        "monorepo manager",
        "developer dashboard",
        "offline developer tools",
        "open source developer tools",
    ],
} as const;

export function absoluteUrl(path = "/"): string {
    return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
