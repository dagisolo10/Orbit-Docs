import { docHref, getAdjacentDocs } from "@/content/docs/nav";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export function DocsPager({ slug }: { slug: string }) {
    const { prev, next } = getAdjacentDocs(slug);

    if (!prev && !next) return null;

    return (
        <nav aria-label="Pagination" className="border-border/70 mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2">
            {prev ? (
                <Link href={docHref(prev.slug)} className="group border-border/70 bg-card/40 hover:border-primary/40 hover:bg-card/70 flex flex-col rounded-xl border p-4 transition-colors">
                    <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium">
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Previous
                    </span>
                    <span className="text-foreground mt-1 text-sm font-semibold">{prev.title}</span>
                </Link>
            ) : (
                <span />
            )}
            {next ? (
                <Link
                    href={docHref(next.slug)}
                    className="group border-border/70 bg-card/40 hover:border-primary/40 hover:bg-card/70 flex flex-col items-end rounded-xl border p-4 text-right transition-colors"
                >
                    <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium">
                        Next
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-foreground mt-1 text-sm font-semibold">{next.title}</span>
                </Link>
            ) : null}
        </nav>
    );
}
