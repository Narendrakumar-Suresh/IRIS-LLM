import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "IRIS-LLM",
  description: "A open-source research agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script
        src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"
        strategy="lazyOnload"
      />
    </html>
  );
}
