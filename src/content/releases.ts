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

/** The in-site release-notes route for a given release tag (e.g. `v1.1.0`). */
export function releaseDetailPath(tag: string): string {
    return `/releases/${tag}`;
}

/** Looks up a single release by its tag. */
export function getRelease(tag: string): Release | undefined {
    return releases.find((release) => release.tag === tag);
}

export const releases: Release[] = [
    {
        version: "1.1.0",
        tag: "v1.1.0",
        name: "Orbit 1.1 — development server manager",
        date: "2026-10-14",
        latest: true,
        summary:
            "Orbit now runs your development servers, too. Register the long-running commands you use every day and start, stop, and restart them from a new Servers view, with live output streamed into a built-in terminal and localhost URLs detected automatically.",
        highlights: [
            "A built-in development server manager with Start, Stop, and Restart",
            "Live stdout, stderr, and system output streamed into a built-in terminal",
            "Automatic localhost URL detection, openable in your browser",
            "Whole process-tree cleanup on stop",
            "Server configurations persisted and restored across restarts",
            "A searchable project picker when adding or editing a server",
            "A collapsible sidebar whose state is remembered",
        ],
        changes: [
            { type: "added", text: "A `servers` module in the Electron main process that persists development-server configurations and owns their lifecycle." },
            { type: "added", text: "A new **Servers** view for registering development commands and controlling them from Orbit." },
            { type: "added", text: "**Start**, **Stop**, and **Restart** with live status (`starting`, `running`, `stopping`, `stopped`, `failed`), process id, and exit code or signal." },
            { type: "added", text: "A built-in **terminal** that streams each server's `stdout`, `stderr`, and system messages, with a **Clear** action and a bounded per-server buffer." },
            { type: "added", text: "Automatic detection of **localhost URLs** in server output, which can be opened in the browser directly from the server card." },
            { type: "added", text: "**Process-tree cleanup** on stop so a dev server's child processes are cleaned up too, and commands are spawned with `shell: false`." },
            { type: "added", text: "Configurations persisted in `servers.json` under the app's user-data directory and restored on launch; servers stay stopped until you start them." },
            { type: "added", text: "A searchable **project picker** in the add/edit form, with a manual folder-browse fallback and an auto-filled display name." },
            { type: "added", text: "Per-server actions to **open in editor**, **copy path**, **edit**, and **remove**." },
            { type: "added", text: "A **collapsible sidebar** that remembers its state across launches." },
            { type: "fixed", text: "Tooltips now render in a portal and position themselves relative to the viewport, so they are no longer clipped by scrollable containers." },
        ],
        assets: [
            { platform: "linux", label: "AppImage", format: "Portable · no install needed", filename: "Orbit-1.1.0.AppImage", recommended: true },
            { platform: "linux", label: "Debian / Ubuntu", format: "deb", filename: "Orbit-1.1.0.deb" },
            { platform: "linux", label: "Arch Linux", format: "pacman", filename: "Orbit-1.1.0.pacman" },
        ],
    },
    {
        version: "1.0.0",
        tag: "v1.0.0",
        name: "Orbit 1.0 — local project workspace",
        date: "2026-10-13",
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

export const latestRelease: Release = releases.find((release) => release.latest) ?? releases[0];
