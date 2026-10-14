import { siteConfig } from "@/lib/site";
import { ImageResponse } from "next/og";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "linear-gradient(135deg, #0a0a0a 0%, #131022 55%, #1b1333 100%)",
                padding: "72px",
                fontFamily: "sans-serif",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: "linear-gradient(135deg, #7c5cf0, #a78bfa)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 34,
                        color: "#0a0a0a",
                        fontWeight: 700,
                    }}
                >
                    O
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#f5f5f5", fontSize: 26, fontWeight: 700 }}>{siteConfig.name}</span>
                    <span style={{ color: "#a1a1aa", fontSize: 16 }}>Project workspace</span>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <span style={{ color: "#a78bfa", fontSize: 24, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Local · Offline · Open source</span>
                <span style={{ color: "#f5f5f5", fontSize: 62, fontWeight: 700, lineHeight: 1.1, maxWidth: 940 }}>{siteConfig.tagline}</span>
                <span style={{ color: "#a1a1aa", fontSize: 26, maxWidth: 900 }}>Scan a folder, detect every project&apos;s stack, and search it all from one fast dashboard.</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#71717a", fontSize: 20 }}>
                <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
                <span>·</span>
                <span>v{siteConfig.version}</span>
                <span>·</span>
                <span>MIT licensed</span>
            </div>
        </div>,
        size,
    );
}
