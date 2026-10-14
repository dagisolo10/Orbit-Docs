import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Logo({ className, withWordMark = true }: { className?: string; withWordMark?: boolean }) {
    return (
        <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label={`${siteConfig.name} home`}>
            <span className="relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-[0_10px_24px_-10px_rgba(124,92,240,0.95)] ring-1 ring-white/10">
                <Image src="/orbit-logo.png" alt="" width={32} height={32} className="size-full object-cover" priority />
            </span>
            {withWordMark ? (
                <span className="flex flex-col leading-none">
                    <span className="text-foreground text-sm font-semibold tracking-tight">{siteConfig.name}</span>
                    <span className="text-muted-foreground text-[10px] font-medium tracking-wide">Project workspace</span>
                </span>
            ) : null}
        </Link>
    );
}
