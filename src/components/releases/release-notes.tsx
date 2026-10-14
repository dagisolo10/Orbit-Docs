import { releaseAssetUrl, releaseDetailPath, releasePageUrl, type Release, type ReleaseChange, type ReleasePlatform } from "@/content/releases";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa6";

const PLATFORM_META: Record<ReleasePlatform, { label: string; icon: ComponentType<{ className?: string }> }> = {
    linux: { label: "Linux", icon: FaLinux },
    macos: { label: "macOS", icon: FaApple },
    windows: { label: "Windows", icon: FaWindows },
};

const CHANGE_META: Record<ReleaseChange["type"], string> = {
    added: "text-emerald-300 bg-emerald-400/10 ring-emerald-300/20",
    changed: "text-sky-300 bg-sky-400/10 ring-sky-300/20",
    fixed: "text-amber-300 bg-amber-400/10 ring-amber-300/20",
    security: "text-red-300 bg-red-400/10 ring-red-300/20",
};

export function ReleaseDownloads({ release }: { release: Release }) {
    return (
        <>
            <h3 className="text-foreground text-xs font-semibold tracking-wider uppercase">Downloads</h3>
            <ul className="mt-3 space-y-2">
                {release.assets.map((asset) => {
                    const meta = PLATFORM_META[asset.platform];
                    const Icon = meta.icon;
                    return (
                        <li key={asset.filename}>
                            <a
                                href={releaseAssetUrl(release.tag, asset.filename)}
                                className={cn(
                                    "bg-background/40 hover:bg-muted/40 flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors",
                                    asset.recommended ? "border-primary/40 hover:border-primary/60" : "border-border/70 hover:border-primary/40",
                                )}
                            >
                                <Icon className="text-muted-foreground size-4 shrink-0" />
                                <span className="min-w-0 flex-1">
                                    <span className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                                        {meta.label} · {asset.label}
                                        {asset.recommended ? (
                                            <span className="bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase">Recommended</span>
                                        ) : null}
                                    </span>
                                    <span className="text-muted-foreground block truncate font-mono text-[11px]">{asset.filename}</span>
                                </span>
                                <Download className="text-muted-foreground size-4 shrink-0" />
                            </a>
                        </li>
                    );
                })}
            </ul>
            <p className="text-muted-foreground mt-3 text-xs leading-5">macOS and Windows packages are coming soon. In the meantime, you can build from source.</p>
            <a
                href={releasePageUrl(release.tag)}
                target="_blank"
                rel="noreferrer"
                className="text-foreground hover:text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
                <FaGithub className="size-4" />
                View on GitHub
                <ArrowUpRight className="size-3.5" />
            </a>
        </>
    );
}

export function LatestReleaseCard({ release }: { release: Release }) {
    return (
        <section className="border-border/70 bg-card/40 overflow-hidden rounded-2xl border">
            <div className="border-border/60 bg-primary/6 flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <span className="bg-primary/15 text-primary ring-primary/25 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1">Latest release</span>
                    <span className="text-foreground font-mono text-sm font-semibold">v{release.version}</span>
                </div>
                <time dateTime={release.date} className="text-muted-foreground text-xs">
                    {formatDate(release.date)}
                </time>
            </div>

            <div className="grid gap-8 px-5 py-6 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
                <div>
                    <h2 className="text-foreground text-xl font-semibold tracking-tight">{release.name}</h2>
                    <p className="text-muted-foreground mt-2 text-[15px] leading-7">{release.summary}</p>

                    <h3 className="text-foreground mt-6 text-xs font-semibold tracking-wider uppercase">Highlights</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {release.highlights.map((item) => (
                            <li key={item} className="text-muted-foreground flex gap-2 text-sm leading-6">
                                <span className="bg-primary/70 mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <Link href={releaseDetailPath(release.tag)} className="text-foreground hover:text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                        Read the full release notes
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div>
                    <ReleaseDownloads release={release} />
                </div>
            </div>
        </section>
    );
}

export function ReleaseList({ releases }: { releases: Release[] }) {
    return (
        <section aria-labelledby="all-releases" className="space-y-4">
            <h2 id="all-releases" className="text-foreground text-lg font-semibold tracking-tight">
                All releases
            </h2>
            <ol className="space-y-3">
                {releases.map((release) => (
                    <li key={release.tag}>
                        <Link
                            href={releaseDetailPath(release.tag)}
                            className="border-border/70 bg-card/30 hover:border-primary/30 hover:bg-card/60 group flex flex-col gap-2 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                        >
                            <span className="min-w-0">
                                <span className="flex flex-wrap items-center gap-3">
                                    <span className="text-foreground font-mono text-base font-semibold">{release.tag}</span>
                                    {release.latest ? <span className="bg-primary/10 text-primary ring-primary/20 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1">latest</span> : null}
                                    <span className="text-muted-foreground text-sm">{release.name}</span>
                                </span>
                                <span className="text-muted-foreground mt-1.5 block text-sm leading-6">{release.summary}</span>
                            </span>
                            <span className="text-muted-foreground flex shrink-0 items-center gap-3 text-xs sm:flex-col sm:items-end sm:gap-1">
                                <time dateTime={release.date}>{formatDate(release.date)}</time>
                                <span className="text-foreground group-hover:text-primary inline-flex items-center gap-1 font-medium transition-colors">
                                    Release notes
                                    <ArrowRight className="size-3.5" />
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export function ReleaseDetail({ release }: { release: Release }) {
    return (
        <article className="min-w-0">
            <Link href="/releases" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                <ArrowLeft className="size-4" />
                All releases
            </Link>

            <header className="border-border/70 mt-6 flex flex-wrap items-center justify-between gap-3 border-b pb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-primary/15 text-primary ring-primary/25 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1">
                        {release.latest ? "Latest release" : "Release"}
                    </span>
                    <h1 className="text-foreground font-mono text-3xl font-semibold tracking-tight sm:text-4xl">{release.tag}</h1>
                </div>
                <time dateTime={release.date} className="text-muted-foreground text-sm">
                    {formatDate(release.date)}
                </time>
            </header>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                <div className="min-w-0">
                    <h2 className="text-foreground text-xl font-semibold tracking-tight">{release.name}</h2>
                    <p className="text-muted-foreground mt-2 text-[15px] leading-7">{release.summary}</p>

                    <h3 className="text-foreground mt-8 text-xs font-semibold tracking-wider uppercase">Highlights</h3>
                    <ul className="mt-3 grid gap-2">
                        {release.highlights.map((item) => (
                            <li key={item} className="text-muted-foreground flex gap-2 text-sm leading-6">
                                <span className="bg-primary/70 mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-foreground mt-8 text-xs font-semibold tracking-wider uppercase">Changelog</h3>
                    <ul className="mt-3 space-y-2">
                        {release.changes.map((change, index) => (
                            <li key={index} className="text-muted-foreground flex gap-2.5 text-sm leading-6">
                                <span className={cn("mt-0.5 inline-flex h-5 shrink-0 items-center rounded-md px-1.5 text-[11px] font-medium ring-1", CHANGE_META[change.type])}>{change.type}</span>
                                <span>{change.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <aside className="min-w-0">
                    <ReleaseDownloads release={release} />
                </aside>
            </div>
        </article>
    );
}

function formatDate(value: string): string {
    const date = new Date(`${value}T00:00:00Z`);
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
}
