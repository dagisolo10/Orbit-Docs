import { Logo } from "@/components/site/logo";
import { docsNav } from "@/content/docs/nav";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export function SiteFooter() {
    const year = siteConfig.copyrightYear;
    const popularDocs = docsNav
        .flatMap((group) => group.items)
        .filter((item) => ["introduction", "getting-started", "installation", "features", "architecture", "roadmap"].includes(item.slug))
        .slice(0, 6);

    return (
        <footer className="border-border/60 bg-card/30 mt-auto border-t">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                <div className="max-w-xs">
                    <Logo />
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{siteConfig.tagline}</p>
                    <p className="text-muted-foreground/70 mt-4 text-xs">Local-first · Offline by default · v{siteConfig.version}</p>
                </div>

                <nav aria-label="Documentation">
                    <h2 className="text-foreground text-xs font-semibold tracking-wider uppercase">Documentation</h2>
                    <ul className="mt-4 space-y-2.5">
                        {popularDocs.map((item) => (
                            <li key={item.slug}>
                                <Link href={item.slug === "introduction" ? "/docs" : `/docs/${item.slug}`} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav aria-label="Project">
                    <h2 className="text-foreground text-xs font-semibold tracking-wider uppercase">Project</h2>
                    <ul className="mt-4 space-y-2.5">
                        <li>
                            <Link href="/releases" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                Releases &amp; downloads
                            </Link>
                        </li>
                        <li>
                            <a href={siteConfig.repo.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                Source code
                            </a>
                        </li>
                        <li>
                            <a href={siteConfig.repo.releasesUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                GitHub Releases
                            </a>
                        </li>
                        <li>
                            <a href={siteConfig.repo.issuesUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                                Report an issue
                            </a>
                        </li>
                    </ul>
                </nav>

                <div>
                    <h2 className="text-foreground text-xs font-semibold tracking-wider uppercase">Built by</h2>
                    <p className="text-muted-foreground mt-4 text-sm">
                        {siteConfig.author.name}
                        <br />
                        <a href={siteConfig.author.url} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary mt-1 inline-flex items-center gap-1.5 transition-colors">
                            <FaGithub className="size-3.5" />
                            dagidev.com
                        </a>
                    </p>
                </div>
            </div>

            <div className="border-border/60 border-t">
                <div className="text-muted-foreground mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6 lg:px-8">
                    <p>
                        © {year} {siteConfig.author.name}. Released under the MIT license.
                    </p>
                    <p>Orbit never sends your code anywhere.</p>
                </div>
            </div>
        </footer>
    );
}
