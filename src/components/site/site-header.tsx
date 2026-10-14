"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

import { Logo } from "@/components/site/logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
    { href: "/docs", label: "Docs" },
    { href: "/releases", label: "Releases" },
    { href: siteConfig.repo.url, label: "GitHub", external: true },
];

export function SiteHeader() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
    const close = () => setOpen(false);

    return (
        <header className="border-border/60 glass sticky top-0 z-50 w-full border-b">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <Logo />

                <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
                    {NAV.map((item) =>
                        item.external ? (
                            <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive(item.href) ? "page" : undefined}
                                className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                    <a
                        href={siteConfig.repo.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Orbit on GitHub"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
                    >
                        <FaGithub className="size-4" />
                    </a>
                    <Link href="/releases" className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors">
                        Download
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-md transition-colors md:hidden"
                >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            {open ? (
                <nav className="border-border/60 border-t px-4 py-3 md:hidden" aria-label="Mobile">
                    <ul className="flex flex-col gap-1">
                        {NAV.map((item) => (
                            <li key={item.href}>
                                {item.external ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={close}
                                        className="text-muted-foreground hover:bg-muted hover:text-foreground block rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={close}
                                        className={cn(
                                            "block rounded-md px-3 py-2 text-sm font-medium",
                                            isActive(item.href) ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li className="pt-1">
                            <Link href="/releases" onClick={close} className="bg-primary text-primary-foreground block rounded-md px-3 py-2 text-center text-sm font-medium">
                                Download
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : null}
        </header>
    );
}
