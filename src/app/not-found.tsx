import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
            <span className="border-border/70 bg-card/40 text-primary inline-flex size-12 items-center justify-center rounded-xl border">
                <Compass className="size-6" />
            </span>
            <p className="text-muted-foreground mt-5 font-mono text-sm">404</p>
            <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">This page is outside Orbit</h1>
            <p className="text-muted-foreground mt-3 max-w-md text-[15px] leading-7">The page you were looking for does not exist or has moved.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/"
                    className="border-border bg-card/40 text-foreground hover:bg-muted/60 inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back home
                </Link>
                <Link
                    href="/docs"
                    className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors"
                >
                    Browse the docs
                </Link>
            </div>
        </div>
    );
}
