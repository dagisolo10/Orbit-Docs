import { ReleaseDetail } from "@/components/releases/release-notes";
import { getRelease, releases } from "@/content/releases";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { version: string };

/** Release pages resolve their version from `params`, so let them block rather than stream. */
export const instant = false;

export function generateStaticParams(): Params[] {
    return releases.map((release) => ({ version: release.tag }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { version } = await params;
    const release = getRelease(version);
    if (!release) return createMetadata({ title: "Release notes", path: `/releases/${version}`, noIndex: true });

    return createMetadata({
        title: `Orbit ${release.version}`,
        description: release.summary,
        path: `/releases/${release.tag}`,
        keywords: [`Orbit ${release.version}`, `Orbit ${release.tag}`, "Orbit release notes", "Orbit changelog", ...siteConfig.keywords.slice(0, 3)],
        type: "article",
    });
}

export default async function ReleasePage({ params }: { params: Promise<Params> }) {
    const { version } = await params;
    const release = getRelease(version);
    if (!release) notFound();

    const path = `/releases/${release.tag}`;
    const jsonLd = breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Releases", path: "/releases" },
        { name: release.name, path },
    ]);

    return (
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ReleaseDetail release={release} />
        </div>
    );
}
