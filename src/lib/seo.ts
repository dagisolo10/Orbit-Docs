import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

type PageMetadataInput = {
    title?: string;
    description?: string;
    path?: string;
    keywords?: string[];
    type?: "website" | "article";
    noIndex?: boolean;
};

export function createMetadata({ title, description = siteConfig.description, path = "/", keywords = [], type = "website", noIndex = false }: PageMetadataInput = {}): Metadata {
    const url = absoluteUrl(path);
    const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;

    return {
        title,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type,
            url,
            title: fullTitle,
            description,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            creator: "@dagisolo10",
        },
        robots: noIndex
            ? { index: false, follow: false }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      "max-image-preview": "large",
                      "max-snippet": -1,
                      "max-video-preview": -1,
                  },
              },
    };
}

export function softwareApplicationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux",
        description: siteConfig.description,
        url: siteConfig.url,
        softwareVersion: siteConfig.version,
        license: "https://opensource.org/licenses/MIT",
        downloadUrl: absoluteUrl("/releases"),
        author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.author.url,
        },
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${siteConfig.name} Docs`,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en",
    };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function techArticleJsonLd({ title, description, path }: { title: string; description: string; path: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: title,
        description,
        url: absoluteUrl(path),
        inLanguage: "en",
        author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.author.url,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };
}
