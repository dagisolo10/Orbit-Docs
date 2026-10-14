# Orbit Docs

The official documentation and release site for [Orbit](https://github.com/dagisolo10/Orbit) — the local, offline project workspace for developers.

Built with **Next.js 16** (App Router, Cache Components, React Compiler), **React 19**, **Tailwind CSS v4**, and **react-icons**.

## What's here

- **Landing page** (`/`) — product overview, features, architecture, and technology detection.
- **Documentation** (`/docs`) — getting started, installation, feature guides, and reference material.
- **Releases** (`/releases`) — the changelog and platform downloads for every Orbit release.

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | What it does |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Create an optimized production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |

## Configuration

The canonical site URL is used for canonical tags, sitemaps, Open Graph, and JSON-LD. It defaults to `https://orbit.dagidev.com` and can be overridden:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Authoring content

Content is data-driven — no MDX or CMS required.

| File | Purpose |
| --- | --- |
| `src/content/docs/pages.ts` | Every documentation page and its content blocks |
| `src/content/docs/nav.ts` | Documentation sidebar groups and ordering |
| `src/content/docs/types.ts` | The block schema (`paragraph`, `heading`, `list`, `code`, `callout`, `table`, `cards`, `steps`) |
| `src/content/releases.ts` | Release notes and download artifacts |
| `src/lib/site.ts` | Site name, description, links, version, and author |

Adding a docs page means adding one entry to `pages.ts` and a matching entry in `nav.ts`. Routes, metadata, sitemap entries, sidebar links, and previous/next navigation are derived automatically.

Inline text supports a small subset of Markdown: `` `code` ``, `**bold**`, and `[links](https://example.com)`.

### Publishing a release

1. Add a new entry to the top of `releases` in `src/content/releases.ts` and mark it `latest: true`.
2. Update `version` in `src/lib/site.ts`.
3. List the electron-builder artifacts in `assets` (AppImage, deb, snap, pacman, DMG, and the Windows installer).

Download links point at GitHub Releases using each artifact's filename. Releases are published on this site and mirrored to GitHub.

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
