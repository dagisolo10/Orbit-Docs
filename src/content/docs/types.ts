export type CalloutVariant = "note" | "tip" | "warning";

export type DocBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string; id?: string }
    | { type: "list"; items: string[]; ordered?: boolean; title?: string }
    | { type: "code"; code: string; lang?: string; title?: string }
    | { type: "callout"; variant?: CalloutVariant; title?: string; text: string }
    | { type: "table"; head: string[]; rows: string[][]; caption?: string }
    | { type: "cards"; items: { title: string; description: string; href: string }[] }
    | { type: "steps"; items: { title: string; description: string }[] }
    | { type: "divider" };

export type DocPage = {
    slug: string;
    title: string;
    description: string;
    group: string;
    /** Overrides the auto-derived <h1> and SEO title. */
    eyebrow?: string;
    blocks: DocBlock[];
};

export type DocNavItem = {
    slug: string;
    title: string;
};

export type DocNavGroup = {
    title: string;
    items: DocNavItem[];
};
