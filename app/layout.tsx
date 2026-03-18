import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "DataPlaybook Magazine",
    template: "%s | DataPlaybook"
  },
  description: "Magazine-style sports analytics blog with rich stats tables.",
  openGraph: {
    title: "DataPlaybook Magazine",
    description: "Sports, analytics, and betting insights with interactive data tables.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="container-shell flex h-16 items-center justify-between">
            <a href="/" className="text-lg font-black tracking-tight text-brand-600">
              DataPlaybook
            </a>
            <nav className="flex items-center gap-5 text-sm font-medium">
              <a href="/archive" className="hover:text-brand-600">Archive</a>
              <a href="/category/analytics" className="hover:text-brand-600">Analytics</a>
              <a href="/category/betting" className="hover:text-brand-600">Betting</a>
              <a href="/admin/editor" className="hover:text-brand-600">Editor</a>
            </nav>
          </div>
        </header>
        <main className="container-shell py-8">{children}</main>
      </body>
    </html>
  );
}
