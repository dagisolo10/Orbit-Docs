import { DocBlocks } from "@/components/docs/doc-blocks";
import { DocsPager } from "@/components/docs/docs-pager";
import { docHref } from "@/content/docs/nav";
import { docsBySlug, docsPages } from "@/content/docs/pages";
import { breadcrumbJsonLd, createMetadata, techArticleJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Clock, FileText } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Params = { slug?: string[] };

const INDEX_SLUG = "introduction";

function resolveSlug(slug?: string[]): string {
    if (!slug || slug.length === 0) return INDEX_SLUG;
    return slug[0];
}

export function generateStaticParams(): Params[] {
    return docsPages.map((page) => ({ slug: page.slug === INDEX_SLUG ? [] : [page.slug] }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const page = docsBySlug.get(resolveSlug(slug));
    if (!page) return createMetadata({ path: "/docs", noIndex: true });

    return createMetadata({
        title: page.title,
        description: page.description,
        path: docHref(page.slug),
        keywords: [page.title, ...siteConfig.keywords.slice(0, 4)],
        type: "article",
    });
}

export default function DocsPage({ params }: { params: Promise<Params> }) {
    return (
        <Suspense fallback={<DocsArticleSkeleton />}>
            <DocsArticle params={params} />
        </Suspense>
    );
}

async function DocsArticle({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const page = docsBySlug.get(resolveSlug(slug));
    if (!page) notFound();

    const path = docHref(page.slug);
    const jsonLd = [
        techArticleJsonLd({ title: page.title, description: page.description, path }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: page.title, path },
        ]),
    ];

    return (
        <article className="min-w-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <header className="border-border/70 border-b pb-6">
                <p className="text-primary flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase">
                    <FileText className="size-3.5" />
                    {page.eyebrow ?? "Docs"} · {page.group}
                </p>
                <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
                <p className="text-muted-foreground mt-3 max-w-2xl text-[15px] leading-7">{page.description}</p>
            </header>

            <div className="mt-8">
                <DocBlocks blocks={page.blocks} />
            </div>

            <p className="text-muted-foreground/70 mt-8 flex items-center gap-1.5 text-xs">
                <Clock className="size-3.5" />
                Part of the {siteConfig.name} documentation · v{siteConfig.version}
            </p>

            <DocsPager slug={page.slug} />
        </article>
    );
}

function DocsArticleSkeleton() {
    return (
        <article className="min-w-0" aria-hidden>
            <header className="border-border/70 border-b pb-6">
                <div className="bg-muted/50 h-3.5 w-40 rounded" />
                <div className="bg-muted/60 mt-3 h-9 w-2/3 rounded" />
                <div className="bg-muted/40 mt-3 h-4 w-full max-w-2xl rounded" />
            </header>
            <div className="mt-8 space-y-3">
                {[92, 84, 96, 70, 88, 60].map((width, index) => (
                    <div key={index} className="bg-muted/30 h-4 rounded" style={{ width: `${width}%` }} />
                ))}
            </div>
        </article>
    );
}
