import type { DocNavGroup } from "@/content/docs/types";

export const docsNav: DocNavGroup[] = [
    {
        title: "Getting started",
        items: [
            { slug: "introduction", title: "Introduction" },
            { slug: "installation", title: "Installation" },
            { slug: "getting-started", title: "Quick start" },
            { slug: "supported-projects", title: "Supported projects" },
        ],
    },
    {
        title: "Using Orbit",
        items: [
            { slug: "features", title: "Feature overview" },
            { slug: "workspaces", title: "Workspaces" },
            { slug: "technology-detection", title: "Technology detection" },
            { slug: "opening-projects", title: "Opening projects" },
            { slug: "keyboard-shortcuts", title: "Keyboard shortcuts" },
        ],
    },
    {
        title: "Reference",
        items: [
            { slug: "architecture", title: "Architecture" },
            { slug: "development", title: "Development" },
            { slug: "roadmap", title: "Roadmap" },
            { slug: "faq", title: "FAQ" },
            { slug: "troubleshooting", title: "Troubleshooting" },
        ],
    },
];

export const docsFlat = docsNav.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title })));

export function docHref(slug: string): string {
    return slug === "introduction" ? "/docs" : `/docs/${slug}`;
}

export function getAdjacentDocs(slug: string): { prev?: (typeof docsFlat)[number]; next?: (typeof docsFlat)[number] } {
    const index = docsFlat.findIndex((item) => item.slug === slug);
    if (index === -1) return {};
    return {
        prev: index > 0 ? docsFlat[index - 1] : undefined,
        next: index < docsFlat.length - 1 ? docsFlat[index + 1] : undefined,
    };
}
