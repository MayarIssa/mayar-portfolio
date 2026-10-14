import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/content";

const title = `${profile.fullName} — ${profile.role}`;

export const metadata: Metadata = {
  title,
  description: profile.intro,
  openGraph: { title, description: profile.intro, type: "website", url: "https://mayar-issa.vercel.app" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
