"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlock({ code, lang, title, className }: { code: string; lang?: string; title?: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    };

    return (
        <figure className={cn("group border-border/70 relative overflow-hidden rounded-xl border bg-[oklch(0.13_0_0)]", className)}>
            <div className="border-border/60 flex items-center justify-between gap-3 border-b px-3.5 py-2">
                <span className="text-muted-foreground font-mono text-[11px] tracking-wide">{title ?? lang ?? "code"}</span>
                <button
                    type="button"
                    onClick={copy}
                    aria-label={copied ? "Copied" : "Copy code"}
                    className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-6 items-center justify-center rounded-md transition-colors"
                >
                    {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
            </div>
            <pre className="overflow-x-auto px-3.5 py-3 text-[13px] leading-relaxed">
                <code className="text-foreground/90 font-mono">{code}</code>
            </pre>
        </figure>
    );
}
