export type ReleasePlatform = "linux" | "macos" | "windows";

export type ReleaseAsset = {
    platform: ReleasePlatform;
    label: string;
    format: string;
    /** Expected artifact filename as produced by electron-builder. */
    filename: string;
    /** Marks the download Orbit recommends to most users. */
    recommended?: boolean;
};

export type ReleaseChange = {
    type: "added" | "changed" | "fixed" | "security";
    text: string;
};

export type Release = {
    version: string;
    tag: string;
    name: string;
    date: string;
    summary: string;
    latest?: boolean;
    prerelease?: boolean;
    highlights: string[];
    changes: ReleaseChange[];
    assets: ReleaseAsset[];
};

const GITHUB_RELEASE = "https://github.com/dagisolo10/Orbit/releases";

export function releasePageUrl(tag: string): string {
    return `${GITHUB_RELEASE}/tag/${tag}`;
}

export function releaseAssetUrl(tag: string, filename: string): string {
    return `${GITHUB_RELEASE}/download/${tag}/${filename}`;
}

export const releases: Release[] = [
    {
        version: "1.0.0",
        tag: "v1.0.0",
        name: "Orbit 1.0 — local project workspace",
        date: "2026-10-13",
        latest: true,
        summary:
            "The first stable release of Orbit. Scan a projects directory, detect the technologies in every project, group workspaces, and open anything in your editor, terminal, or file manager — all offline.",
        highlights: [
            "Automatic project discovery across your projects directory",
            "Data-driven technology detection with real brand logos",
            "Monorepo and multi-package workspace awareness",
            "Overview, Projects, Workspaces, Technologies, Favorites, and Settings views",
            "Quick actions to open projects in editors, terminals, and file managers",
            "Configurable projects directory and editor/terminal preferences",
            "A secure Electron architecture with a narrow preload bridge",
        ],
        changes: [
            { type: "added", text: "Recursive scanning for `package.json` files with safe handling of unreadable folders and malformed manifests." },
            { type: "added", text: "Technology detection from `dependencies` and `devDependencies`, grouped into Languages, Frontend, Backend, Styling, Database / ORM, and Tools." },
            { type: "added", text: "Workspace detection from the `workspaces` field, grouping member packages under their closest workspace root." },
            { type: "added", text: "Bundled Devicon and Simple Icons logos so every technology renders fully offline." },
            { type: "added", text: "Overview dashboard with project, workspace, and technology counts plus featured projects and top technologies." },
            { type: "added", text: "Project explorer with grid and list views, instant search, sorting, filters, and pagination." },
            { type: "added", text: "Workspaces view with expand/collapse-all, sorting, and the same filters and layouts." },
            { type: "added", text: "Technologies explorer that jumps from any technology or category to the projects that use it." },
            { type: "added", text: "Favorites, including projects that live inside a workspace." },
            {
                type: "added",
                text: "Quick actions to open a project — or a whole workspace root — in an external editor, open a terminal at its path, reveal it in the file manager, or copy its path.",
            },
            { type: "added", text: "Configurable projects directory — choose the folder Orbit scans from Settings, persisted across restarts with Default, Custom, and Unavailable states." },
            { type: "added", text: "A Settings page with General (projects directory, re-scan, dark-only theme), Applications (editor and terminal), and About sections." },
            {
                type: "added",
                text: "Editor and terminal preferences — auto-detect, pin a known preset, or enter a custom command, with Flatpak and Snap wrapper detection and no shell execution.",
            },
            { type: "added", text: "A polished, responsive dark interface with skeletons, empty states, and error banners." },
        ],
        assets: [
            { platform: "linux", label: "AppImage", format: "Portable · no install needed", filename: "Orbit-1.0.0.AppImage", recommended: true },
            { platform: "linux", label: "Debian / Ubuntu", format: "deb", filename: "Orbit-1.0.0.deb" },
            { platform: "linux", label: "Arch Linux", format: "pacman", filename: "Orbit-1.0.0.pacman" },
        ],
    },
];

export const latestRelease: Release = releases[0];
