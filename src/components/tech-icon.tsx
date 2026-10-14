import { getTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { CSSProperties } from "react";

export function TechIcon({ name, className }: { name: string; className?: string }) {
    const icon = getTechIcon(name);

    if (!icon) {
        return (
            <span
                aria-hidden
                className={cn("bg-muted/60 text-muted-foreground inline-flex size-4 shrink-0 items-center justify-center rounded-md text-[9px] leading-none font-semibold", className)}
            >
                {name.charAt(0).toUpperCase()}
            </span>
        );
    }

    if (icon.kind === "mask") {
        const maskStyle: CSSProperties = {
            backgroundColor: icon.color,
            maskImage: `url("${icon.src}")`,
            WebkitMaskImage: `url("${icon.src}")`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
        };
        return <span aria-hidden className={cn("inline-block size-4 shrink-0", className)} style={maskStyle} />;
    }

    return <Image src={icon.src} alt="" aria-hidden width={16} height={16} unoptimized className={cn("size-4 shrink-0 object-contain", icon.adjust, className)} />;
}
