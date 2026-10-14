import { CodeBlock } from "@/components/code-block";
import { InlineMarkdown } from "@/components/markdown";
import type { CalloutVariant, DocBlock } from "@/content/docs/types";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { ArrowRight, Info, Lightbulb, TriangleAlert } from "lucide-react";
import Link from "next/link";

const CALLOUT_STYLES: Record<CalloutVariant, { icon: typeof Info; className: string; iconClassName: string; defaultTitle: string }> = {
    note: { icon: Info, className: "border-sky-400/20 bg-sky-400/[0.06]", iconClassName: "text-sky-300", defaultTitle: "Note" },
    tip: { icon: Lightbulb, className: "border-emerald-400/20 bg-emerald-400/[0.06]", iconClassName: "text-emerald-300", defaultTitle: "Tip" },
    warning: { icon: TriangleAlert, className: "border-amber-400/25 bg-amber-400/[0.06]", iconClassName: "text-amber-300", defaultTitle: "Warning" },
};

export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
    return (
        <div className="space-y-5">
            {blocks.map((block, index) => (
                <Block key={index} block={block} />
            ))}
        </div>
    );
}

function Block({ block }: { block: DocBlock }) {
    switch (block.type) {
        case "heading": {
            const id = block.id ?? slugify(block.text);
            return (
                <h2 id={id} className="text-foreground scroll-mt-24 pt-3 text-xl font-semibold tracking-tight">
                    {block.text}
                </h2>
            );
        }
        case "paragraph":
            return (
                <p className="text-muted-foreground text-[15px] leading-7">
                    <InlineMarkdown text={block.text} />
                </p>
            );
        case "list":
            return (
                <div className="space-y-2">
                    {block.title ? <p className="text-foreground text-sm font-medium">{block.title}</p> : null}
                    {block.ordered ? (
                        <ol className="space-y-2">
                            {block.items.map((item, index) => (
                                <li key={index} className="text-muted-foreground flex gap-3 text-[15px] leading-7">
                                    <span className="border-border bg-muted/60 text-foreground mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium">
                                        {index + 1}
                                    </span>
                                    <InlineMarkdown text={item} />
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <ul className="space-y-2">
                            {block.items.map((item, index) => (
                                <li key={index} className="text-muted-foreground flex gap-3 text-[15px] leading-7">
                                    <span className="bg-primary/70 mt-3 size-1.5 shrink-0 rounded-full" aria-hidden />
                                    <InlineMarkdown text={item} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        case "code":
            return <CodeBlock code={block.code} lang={block.lang} title={block.title} />;
        case "callout": {
            const variant = block.variant ?? "note";
            const style = CALLOUT_STYLES[variant];
            const Icon = style.icon;
            return (
                <aside className={cn("flex gap-3 rounded-xl border p-4", style.className)}>
                    <Icon className={cn("mt-0.5 size-4.5 shrink-0", style.iconClassName)} strokeWidth={1.9} />
                    <div className="space-y-1">
                        <p className="text-foreground text-sm font-semibold">{block.title ?? style.defaultTitle}</p>
                        <p className="text-muted-foreground text-sm leading-6">
                            <InlineMarkdown text={block.text} />
                        </p>
                    </div>
                </aside>
            );
        }
        case "table":
            return (
                <figure className="space-y-2">
                    <div className="border-border/70 overflow-x-auto rounded-xl border">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-border/70 bg-muted/40 border-b">
                                    {block.head.map((cell, index) => (
                                        <th key={index} scope="col" className="text-foreground px-4 py-2.5 text-xs font-semibold tracking-wide uppercase">
                                            {cell}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {block.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-border/40 border-b last:border-0">
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className={cn("text-muted-foreground px-4 py-2.5 align-top leading-6", cellIndex === 0 && "text-foreground font-medium")}>
                                                <InlineMarkdown text={cell} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {block.caption ? <figcaption className="text-muted-foreground/80 text-xs">{block.caption}</figcaption> : null}
                </figure>
            );
        case "cards":
            return (
                <div className="grid gap-3 sm:grid-cols-2">
                    {block.items.map((item) => (
                        <Link
                            key={item.href + item.title}
                            href={item.href}
                            className="group border-border/70 bg-card/40 hover:border-primary/40 hover:bg-card/70 flex flex-col rounded-xl border p-4 transition-colors"
                        >
                            <span className="text-foreground flex items-center justify-between gap-2 text-sm font-semibold">
                                {item.title}
                                <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                            <span className="text-muted-foreground mt-1 text-sm leading-6">{item.description}</span>
                        </Link>
                    ))}
                </div>
            );
        case "steps":
            return (
                <ol className="border-border/70 relative space-y-5 border-l pl-6">
                    {block.items.map((item, index) => (
                        <li key={index} className="relative">
                            <span className="border-primary/40 bg-background text-primary absolute top-0 -left-7.75 inline-flex size-6 items-center justify-center rounded-full border text-[11px] font-semibold">
                                {index + 1}
                            </span>
                            <p className="text-foreground text-sm font-semibold">{item.title}</p>
                            <p className="text-muted-foreground mt-1 text-[15px] leading-7">
                                <InlineMarkdown text={item.description} />
                            </p>
                        </li>
                    ))}
                </ol>
            );
        case "divider":
            return <hr className="border-border/70" />;
        default:
            return null;
    }
}
