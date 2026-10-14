"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AppAnimations({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.documentElement.classList.remove("js-anim");
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const reveals = gsap.utils.toArray<HTMLElement>(".anim-reveal", root);
            reveals.forEach((el, index) => {
                gsap.from(el, {
                    y: 18,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    delay: (index % 3) * 0.04,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        once: true,
                    },
                });
            });

            const scalers = gsap.utils.toArray<HTMLElement>(".anim-scale-in", root);
            scalers.forEach((el) => {
                gsap.from(el, {
                    scale: 0.98,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        once: true,
                    },
                });
            });
        }, root);

        document.documentElement.dataset.anim = "ready";
        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
        };
    }, [pathname]);

    return (
        <div ref={containerRef} className="flex min-h-full flex-1 flex-col">
            {children}
        </div>
    );
}
