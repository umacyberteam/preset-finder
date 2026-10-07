import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Preset Finder",
  description: "Find Alight Motion preset links from TikTok.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}