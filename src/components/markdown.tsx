import { TechIcon } from "@/components/tech-icon";
import Link from "next/link";
import type { ReactNode } from "react";

const TOKEN = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))|(\{icon:[a-z0-9.-]+\})/g;

function renderLink(token: string, key: number): ReactNode {
    const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
    if (!match) return token;
    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);

    if (isExternal) {
        return (
            <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-foreground decoration-primary/50 hover:decoration-primary font-medium underline underline-offset-4 transition-colors"
            >
                {label}
            </a>
        );
    }

    return (
        <Link key={key} href={href} className="text-foreground decoration-primary/50 hover:decoration-primary font-medium underline underline-offset-4 transition-colors">
            {label}
        </Link>
    );
}

export function InlineMarkdown({ text, className }: { text: string; className?: string }) {
    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let key = 0;

    for (const match of text.matchAll(TOKEN)) {
        const index = match.index ?? 0;
        if (index > lastIndex) nodes.push(text.slice(lastIndex, index));

        const token = match[0];
        if (token.startsWith("{icon:")) {
            nodes.push(<TechIcon key={key++} name={token.slice(6, -1)} className="mr-1.5 inline-block align-[-0.125em]" />);
        } else if (token.startsWith("`")) {
            nodes.push(
                <code key={key++} className="border-border/70 bg-muted/60 text-foreground rounded border px-1.5 py-0.5 font-mono text-[0.85em]">
                    {token.slice(1, -1)}
                </code>,
            );
        } else if (token.startsWith("**")) {
            nodes.push(
                <strong key={key++} className="text-foreground font-semibold">
                    {token.slice(2, -2)}
                </strong>,
            );
        } else {
            nodes.push(renderLink(token, key++));
        }

        lastIndex = index + token.length;
    }

    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

    return <span className={className}>{nodes}</span>;
}
