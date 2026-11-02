import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ProgressProvider } from "../components/ProgressProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { accountsConfigured } from "../lib/account-config";

export const metadata: Metadata = {
  title: "Voice of Jesus Ministry",
  description:
    "Join Voice of Jesus Ministry for weekly Bible studies, biblical teaching, prayer, discipleship, and Christian resources.",
  keywords: [
    "Voice of Jesus Ministry",
    "Bible Study",
    "Christian Ministry",
    "Prayer",
    "Discipleship",
  ],
  icons: { icon: "/ministry-emblem.png", apple: "/ministry-emblem.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ProgressProvider>
          <header className="site-header">
            <div className="header-inner">
              <Link className="brand" href="/">
                <img src="/ministry-logo.png" width="72" height="72" alt="" />
                <span>
                  Voice of Jesus Ministry
                  <small>Hear His voice. Follow His Word.</small>
                </span>
              </Link>
              <nav aria-label="Main navigation">
                <Link href="/bible-study">Bible Study</Link>
                <Link href="/arcade">Play & learn</Link>
                <Link href="/tools">Workspace</Link>
                <Link href="/blog">Blog</Link>
              </nav>
              <Link href="/account" className="guest-badge">
                Account
              </Link>
            </div>
          </header>
          <main id="main">{children}</main>
          <footer className="site-footer">
            <span>Voice of Jesus Ministry</span>
            <div>
              <Link href="/privacy">Privacy</Link>
              <a href="https://github.com/Voice-of-Jesus-Ministry/website">
                Source & credits
              </a>
              <a href="https://youtube.com/@voiceofjesusnetwork">YouTube ↗</a>
            </div>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
  return accountsConfigured() ? <ClerkProvider>{content}</ClerkProvider> : content;
}
