"use client";

import { docHref, docsNav } from "@/content/docs/nav";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function DocsSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (slug: string) => {
        const href = docHref(slug);
        if (href === "/docs") return pathname === "/docs";
        return pathname === href;
    };

    const current = docsNav.flatMap((group) => group.items).find((item) => isActive(item.slug));

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className="border-border/70 bg-card/40 text-foreground flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium lg:hidden"
            >
                <span>{current ? current.title : "Documentation"}</span>
                <ChevronDown className={cn("text-muted-foreground size-4 transition-transform", open && "rotate-180")} />
            </button>

            <nav aria-label="Documentation" className={cn("lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pb-8", open ? "block" : "hidden")}>
                <div className="mt-2 scrollbar-thin space-y-7 lg:mt-0">
                    {docsNav.map((group) => (
                        <div key={group.title}>
                            <p className="text-foreground px-3 text-xs font-semibold tracking-wider uppercase">{group.title}</p>
                            <ul className="mt-3 space-y-0.5">
                                {group.items.map((item) => (
                                    <li key={item.slug}>
                                        <Link
                                            href={docHref(item.slug)}
                                            aria-current={isActive(item.slug) ? "page" : undefined}
                                            className={cn(
                                                "block rounded-md px-3 py-1.5 text-sm transition-colors",
                                                isActive(item.slug) ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </nav>
        </>
    );
}
