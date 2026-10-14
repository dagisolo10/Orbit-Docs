# Orbit Docs

The official documentation and release site for [Orbit](https://github.com/dagisolo10/Orbit) — the local, offline project workspace for developers.

Live site: [orbit.dagidev.com](https://orbit.dagidev.com)

Built with **Next.js 16** (App Router, Cache Components, React Compiler), **React 19**, **Tailwind CSS v4**, and **react-icons**. Technology logos come from **Devicon** and **Simple Icons**, bundled locally.

## What's here

- **Landing page** (`/`) — product overview, features, architecture, and technology detection.
- **Documentation** (`/docs`) — getting started, installation, feature guides, supported projects and limitations, and reference material.
- **Releases** (`/releases`) — a concise index of every Orbit release. Each release also has its own page at `/releases/<tag>` (for example `/releases/v1.1.0`) with the full notes and downloads.

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script           | What it does                         |
| ---------------- | ------------------------------------ |
| `bun run dev`    | Start the dev server                 |
| `bun run build`  | Create an optimized production build |
| `bun run start`  | Serve the production build           |
| `bun run lint`   | Run ESLint                           |
| `bun run format` | Format with Prettier                 |

## Configuration

The canonical site URL is used for canonical tags, sitemaps, Open Graph, and JSON-LD. It defaults to `https://orbit.dagidev.com` and can be overridden:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Authoring content

Content is data-driven — no MDX or CMS required.

| File                           | Purpose                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `src/content/docs/pages.ts`    | Every documentation page and its content blocks                                                     |
| `src/content/docs/nav.ts`      | Documentation sidebar groups and ordering                                                           |
| `src/content/docs/types.ts`    | The block schema (`paragraph`, `heading`, `list`, `code`, `callout`, `table`, `cards`, `steps`)     |
| `src/content/releases.ts`      | The single, typed source of truth for releases — release notes, tags, dates, and download artifacts |
| `src/lib/tech-icons.ts`        | Technology icon mapping (Devicon marks + Simple Icons masks)                                        |
| `src/components/tech-icon.tsx` | Renders a technology logo by key                                                                    |
| `src/lib/site.ts`              | Site name, description, links, version, and author                                                  |

Adding a docs page means adding one entry to `pages.ts` and a matching entry in `nav.ts`. Routes, metadata, sitemap entries, sidebar links, and previous/next navigation are derived automatically.

Releases follow the same pattern. `src/content/releases.ts` holds the release data, and the `/releases` index and the `/releases/<tag>` pages are generated from it — no per-release page components are needed.

Inline text supports a small subset of Markdown — `` `code` ``, `**bold**`, and `[links](https://example.com)` — plus a `{icon:<key>}` token for inline technology logos.

### Publishing a release

1. Add a new entry to the **top** of the `releases` array in `src/content/releases.ts` with its `version`, `tag` (for example `v1.1.0`), `name`, `date`, `summary`, `highlights`, `changes`, and `assets`, and mark it `latest: true` (remove `latest` from the previous entry).
2. Update `version` and `releaseDate` in `src/lib/site.ts`.

That is all that is needed. The `/releases` index lists the release automatically, a dedicated page is generated at `/releases/<tag>`, and the sitemap, internal links, and "latest" badge all update from the same data. Download links point at GitHub Releases using each artifact's filename.

## SEO

- Per-page metadata with canonical URLs and Open Graph / Twitter cards
- `sitemap.xml`, `robots.txt`, and a web app manifest
- Dynamic Open Graph image (`/opengraph-image`)
- JSON-LD structured data: `WebSite`, `SoftwareApplication`, `TechArticle`, and `BreadcrumbList`
- Semantic headings and skip-to-content link for accessibility

## Deployment

The site is fully static-friendly. Deploy the `bun run build` output to any Node host, or set `NEXT_PUBLIC_SITE_URL` for your domain before building.

---

Orbit is created by [Dagmawi Solomon](https://dagidev.com) and released under the MIT license.
