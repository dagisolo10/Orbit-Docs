import { CodeBlock } from "@/components/code-block";
import { TechIcon } from "@/components/tech-icon";
import { siteConfig } from "@/lib/site";
import {
    ArrowRight,
    Boxes,
    Code,
    Cpu,
    Download,
    FolderSearch,
    Layers,
    Lock,
    Moon,
    RefreshCw,
    Search,
    Server,
    ShieldCheck,
    Sparkles,
    Star,
    Terminal,
    TriangleAlert,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
    {
        icon: FolderSearch,
        title: "Automatic project discovery",
        description: "Recursively scan your projects directory for package.json files, with safe handling for unreadable folders and malformed manifests.",
    },
    { icon: Layers, title: "Technology detection", description: "Read dependencies and devDependencies to detect the real stack each project uses, grouped into clear categories." },
    { icon: Boxes, title: "Workspace awareness", description: "Monorepos and multi-package workspaces are detected and grouped, while standalone projects stay separate." },
    { icon: Sparkles, title: "Brand logos", description: "Every technology is shown with its real logo via Devicon and Simple Icons, bundled locally for full offline support." },
    { icon: Search, title: "Instant search & filters", description: "Grid or list views with instant search, sorting, technology and category filters, and pagination." },
    { icon: Star, title: "Favorites", description: "Star the projects you use most for quick access, including projects that live inside a workspace." },
    { icon: Terminal, title: "Quick actions", description: "Open any project or workspace root in your editor or terminal, reveal it in the file manager, or copy its path." },
    {
        icon: Server,
        title: "Development server manager",
        description: "Register your dev commands and start, stop, or restart them from Orbit, with live terminal output and detected localhost URLs.",
    },
    {
        icon: Code,
        title: "Your tools, your choice",
        description: "Pick your editor and terminal from presets or a custom command, with Flatpak and Snap detection. Orbit can also auto-detect them for you.",
    },
    { icon: RefreshCw, title: "Rescan on demand", description: "Refresh your workspace whenever you add or change projects. Failures never wipe out your last good results." },
    { icon: Moon, title: "Polished dark UI", description: "A responsive React and Tailwind interface with skeletons, empty states, and clear error banners." },
];

const TECH_GROUPS: { category: string; items: { id: string; label: string }[] }[] = [
    { category: "Languages", items: [{ id: "typescript", label: "TypeScript" }] },
    {
        category: "Frontend",
        items: [
            { id: "react", label: "React" },
            { id: "next", label: "Next.js" },
            { id: "react-native", label: "React Native" },
            { id: "expo", label: "Expo" },
        ],
    },
    {
        category: "Backend",
        items: [
            { id: "node", label: "Node.js" },
            { id: "express", label: "Express" },
            { id: "nestjs", label: "NestJS" },
        ],
    },
    { category: "Styling", items: [{ id: "tailwindcss", label: "Tailwind CSS" }] },
    {
        category: "Database / ORM",
        items: [
            { id: "prisma", label: "Prisma" },
            { id: "mongoose", label: "Mongoose" },
            { id: "drizzle", label: "Drizzle" },
        ],
    },
    {
        category: "Tools",
        items: [
            { id: "vite", label: "Vite" },
            { id: "tanstack-query", label: "TanStack Query" },
            { id: "tanstack-router", label: "TanStack Router" },
            { id: "socketio", label: "Socket.IO" },
            { id: "electron", label: "Electron" },
            { id: "electron-vite", label: "electron-vite" },
            { id: "turborepo", label: "Turborepo" },
            { id: "bun", label: "Bun" },
            { id: "jest", label: "Jest" },
            { id: "vitest", label: "Vitest" },
            { id: "webpack", label: "Webpack" },
            { id: "esbuild", label: "esbuild" },
        ],
    },
];

export default function HomePage() {
    return (
        <div className="flex-1">
            <section className="aurora relative overflow-hidden">
                <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
                <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="border-border/70 bg-card/50 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                            <span className="size-1.5 rounded-full bg-emerald-400" />v{siteConfig.version} is out now
                        </span>
                        <h1 className="text-foreground mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Every project on your disk, finally in one place</h1>
                        <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-8 text-pretty">
                            Orbit scans a folder on your machine, detects the technologies in every project, and turns them into a fast, searchable, offline dashboard. No accounts. No cloud. No
                            telemetry.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/releases"
                                className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors sm:w-auto"
                            >
                                <Download className="size-4" />
                                Download Orbit
                            </Link>
                            <Link
                                href="/docs"
                                className="border-border bg-card/40 text-foreground hover:bg-muted/60 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-5 text-sm font-medium transition-colors sm:w-auto"
                            >
                                Read the docs
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                        <p className="text-muted-foreground mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
                            <span className="inline-flex items-center gap-1.5">
                                <ShieldCheck className="size-3.5 text-emerald-400" /> Private &amp; offline
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Lock className="size-3.5 text-emerald-400" /> Your code never leaves your machine
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <FaGithub className="size-3.5" /> Open source · MIT
                            </span>
                        </p>
                    </div>

                    <div className="border-border/70 bg-card/40 mt-14 overflow-hidden rounded-2xl border p-2 shadow-2xl shadow-black/40">
                        <div className="flex items-center gap-2 px-3 py-2">
                            <span className="size-2.5 rounded-full bg-red-400/70" />
                            <span className="size-2.5 rounded-full bg-amber-400/70" />
                            <span className="size-2.5 rounded-full bg-emerald-400/70" />
                            <span className="text-muted-foreground ml-2 text-xs">Orbit — Overview</span>
                        </div>
                        <div className="bg-background/60 grid gap-3 rounded-xl p-4 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { value: "128", label: "Projects" },
                                { value: "14", label: "Workspaces" },
                                { value: "36", label: "Technologies" },
                                { value: "2m ago", label: "Last scan" },
                            ].map((stat) => (
                                <div key={stat.label} className="border-border/60 bg-card/50 rounded-lg border px-4 py-3">
                                    <p className="text-foreground text-2xl font-semibold tracking-tight">{stat.value}</p>
                                    <p className="text-muted-foreground mt-1 text-xs">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-primary text-xs font-medium tracking-wider uppercase">Features</p>
                    <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A clear view of your whole workspace</h2>
                    <p className="text-muted-foreground mt-4 text-lg leading-8">Orbit answers the questions you actually have: what do I have, where is it, and what is it built with?</p>
                </div>

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((feature) => (
                        <li key={feature.title} className="group border-border/70 bg-card/30 hover:border-primary/30 hover:bg-card/60 rounded-2xl border p-5 transition-colors">
                            <span className="border-border/70 bg-background/50 text-primary inline-flex size-10 items-center justify-center rounded-lg border">
                                <feature.icon className="size-5" strokeWidth={1.8} />
                            </span>
                            <h3 className="text-foreground mt-4 text-base font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground mt-2 text-sm leading-6">{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="border-border/60 bg-card/20 border-y">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                    <div>
                        <p className="text-primary text-xs font-medium tracking-wider uppercase">How it works</p>
                        <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Filesystem in the main process. A narrow bridge everywhere else.</h2>
                        <p className="text-muted-foreground mt-4 text-[15px] leading-7">
                            Orbit keeps a strict separation between the filesystem and the UI. Scanning happens in the Electron main process, and the React renderer talks to it through a single,
                            narrow preload API with context isolation enabled.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {[
                                { title: "Scan", description: "The main process walks your directory, parses manifests, detects technologies, and finds workspace roots." },
                                { title: "Bridge", description: "A minimal window.api.invoke(channel, ...args) is exposed through contextBridge. No nodeIntegration in the renderer." },
                                { title: "Render", description: "OrbitProvider turns one scan into every view: Overview, Projects, Workspaces, Technologies, Servers, Favorites, and Settings." },
                            ].map((step, index) => (
                                <li key={step.title} className="flex gap-4">
                                    <span className="border-primary/40 bg-background text-primary inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                                        {index + 1}
                                    </span>
                                    <span>
                                        <span className="text-foreground block text-sm font-semibold">{step.title}</span>
                                        <span className="text-muted-foreground mt-0.5 block text-sm leading-6">{step.description}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/docs/architecture" className="text-foreground hover:text-primary mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                            Read the architecture
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <CodeBlock
                        title="Secure by design"
                        lang="text"
                        code={[
                            "main process (Node)               preload                renderer (React)",
                            "────────────────────              ───────                ────────────────",
                            "scanner + servers ──► ipcMain.handle ──► contextBridge ──► window.api.invoke(...)",
                            "                     (projects:scan,      (window.api)          │",
                            "                      servers:*)                                ▼",
                            "                                                        OrbitProvider ──► views",
                            "",
                            "Filesystem access and processes never leave the main process.",
                        ].join("\n")}
                    />
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-primary text-xs font-medium tracking-wider uppercase">Technology detection</p>
                    <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">See the real stack behind every project</h2>
                    <p className="text-muted-foreground mt-4 text-lg leading-8">
                        Detection is driven entirely by dependencies in package.json, so Orbit only reports technologies it can actually find. It recognizes JavaScript and TypeScript projects only —
                        other ecosystems are not detected yet.
                    </p>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {TECH_GROUPS.map((group) => (
                        <div key={group.category} className="border-border/70 bg-card/30 rounded-2xl border p-5">
                            <h3 className="text-foreground text-sm font-semibold">{group.category}</h3>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {group.items.map((item) => (
                                    <span key={item.id} className="border-border/70 bg-background/40 text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs">
                                        <TechIcon name={item.id} className="size-3.5" />
                                        {item.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/docs/technology-detection" className="text-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                            See the full registry
                            <ArrowRight className="size-4" />
                        </Link>
                        <Link href="/docs/supported-projects" className="text-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                            What Orbit can&apos;t do yet
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <TriangleAlert className="size-3.5 text-amber-400" />
                        Node.js / JavaScript / TypeScript projects only
                    </p>
                </div>
            </section>

            <section className="border-border/60 border-t">
                <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
                    <span className="border-border/70 bg-card/40 text-primary inline-flex size-11 items-center justify-center rounded-xl border">
                        <Cpu className="size-5" />
                    </span>
                    <h2 className="text-foreground mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Your machine. Your projects. Nothing else.</h2>
                    <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-8">
                        Orbit runs entirely locally and needs no network access at runtime. It parses manifests and hands folders to the tools you already use — it never uploads, tracks, or edits your
                        projects.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/releases"
                            className="bg-primary text-primary-foreground hover:bg-primary/85 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors sm:w-auto"
                        >
                            <Download className="size-4" />
                            Download for free
                        </Link>
                        <Link
                            href="/docs/getting-started"
                            className="border-border bg-card/40 text-foreground hover:bg-muted/60 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-5 text-sm font-medium transition-colors sm:w-auto"
                        >
                            Quick start guide
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
