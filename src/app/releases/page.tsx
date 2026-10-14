import { LatestReleaseCard, ReleaseTimeline } from "@/components/releases/release-notes";
import { latestRelease, releases } from "@/content/releases";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Rss, ShieldCheck, TriangleAlert, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export const metadata: Metadata = createMetadata({
    title: "Releases & downloads",
    description: "Download Orbit for Linux — portable AppImage, Debian/Ubuntu .deb, and Arch pacman packages — and read the full changelog. Every release is published here and mirrored to GitHub Releases.",
    path: "/releases",
    keywords: ["Orbit download", "Orbit release notes", "Orbit changelog", "Orbit for Linux", "Orbit AppImage", "Orbit deb", "Orbit pacman"],
});

const FACTS = [
    { icon: Zap, label: "Fast", value: "Native desktop app, instant local scans" },
    { icon: ShieldCheck, label: "Private", value: "Offline, no accounts, no telemetry" },
    { icon: FaGithub, label: "Open source", value: "MIT licensed on GitHub" },
];

export default function ReleasesPage() {
    const jsonLd = breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Releases", path: "/releases" },
    ]);

    return (
        <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <header className="anim-reveal max-w-3xl">
                <p className="text-primary text-xs font-medium tracking-wider uppercase">Releases</p>
                <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Download Orbit</h1>
                <p className="text-muted-foreground mt-4 text-lg leading-8">
                    Every Orbit release is published here with full notes, and mirrored to{" "}
                    <a
                        href={siteConfig.repo.releasesUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground decoration-primary/50 hover:decoration-primary font-medium underline underline-offset-4"
                    >
                        GitHub Releases
                    </a>
                    . Pick your package, or{" "}
                    <Link href="/docs/installation" className="text-foreground decoration-primary/50 hover:decoration-primary font-medium underline underline-offset-4">
                        build from source
                    </Link>
                    .
                </p>
            </header>

            <div className="anim-reveal mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-400" />
                <p className="text-muted-foreground text-sm">
                    <span className="text-foreground font-medium">Before you download:</span> Orbit detects JavaScript and TypeScript projects by their{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">package.json</code> only. See{" "}
                    <Link href="/docs/supported-projects" className="text-foreground decoration-primary/50 hover:decoration-primary font-medium underline underline-offset-4">
                        supported projects &amp; limitations
                    </Link>{" "}
                    for the full list of what it can and cannot see.
                </p>
            </div>

            <ul className="anim-reveal mt-8 grid gap-3 sm:grid-cols-3">
                {FACTS.map((fact) => (
                    <li key={fact.label} className="border-border/70 bg-card/30 flex items-start gap-3 rounded-xl border px-4 py-3">
                        <fact.icon className="text-primary mt-0.5 size-4 shrink-0" />
                        <span>
                            <span className="text-foreground block text-sm font-semibold">{fact.label}</span>
                            <span className="text-muted-foreground mt-0.5 block text-sm">{fact.value}</span>
                        </span>
                    </li>
                ))}
            </ul>

            <div className="anim-scale-in mt-10 space-y-10">
                <LatestReleaseCard release={latestRelease} />
                <ReleaseTimeline releases={releases} />
            </div>

            <div className="anim-reveal border-border/70 bg-card/30 mt-10 flex flex-col items-start gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <Rss className="text-primary mt-0.5 size-4 shrink-0" />
                    <p className="text-muted-foreground text-sm">
                        <span className="text-foreground font-medium">Never miss a release.</span> Watch or star the repository to get notified when a new version ships.
                    </p>
                </div>
                <a
                    href={siteConfig.repo.releasesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3.5 text-sm font-medium transition-colors"
                >
                    <FaGithub className="size-4" />
                    Watch releases
                </a>
            </div>
        </div>
    );
}
