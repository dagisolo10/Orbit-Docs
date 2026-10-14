import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 py-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 lg:py-12">
                <aside className="lg:pr-2">
                    <DocsSidebar />
                </aside>
                <div className="min-w-0">{children}</div>
            </div>
        </div>
    );
}
