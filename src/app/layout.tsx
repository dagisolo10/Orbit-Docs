import "@/app/globals.css";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { createMetadata, softwareApplicationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    ...createMetadata({
        title: undefined,
        path: "/",
    }),
    title: {
        default: siteConfig.title,
        template: `%s — ${siteConfig.name}`,
    },
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    category: "technology",
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
        icon: [{ url: "/orbit-logo.png", type: "image/png" }],
        apple: [{ url: "/orbit-logo.png", type: "image/png" }],
        shortcut: ["/favicon.ico"],
    },
};

export const viewport: Viewport = {
    themeColor: "#0a0a0a",
    colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn("dark h-full scroll-pt-24", "antialiased", inter.variable, geistMono.variable)}>
            <body className="bg-background text-foreground flex min-h-full flex-col">
                <a
                    href="#main"
                    className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:px-3 focus:py-2 focus:text-sm focus:font-medium"
                >
                    Skip to content
                </a>
                <SiteHeader />
                <div id="main" className="flex flex-1 flex-col">
                    {children}
                </div>
                <SiteFooter />
                <Script
                    id="orbit-structured-data"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd(), softwareApplicationJsonLd()]) }}
                />
            </body>
        </html>
    );
}
