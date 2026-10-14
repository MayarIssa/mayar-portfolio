import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./globals.css";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: `${profile.fullName}, ${profile.role}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.fullName}, ${profile.role}`,
    description: profile.intro,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
