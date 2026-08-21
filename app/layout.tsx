import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whatismyscreenresolution.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "What Is My Screen Resolution? | Cyber-Resolution",
    template: "%s | Cyber-Resolution",
  },
  description:
    "Cyberpunk hacker terminal for real-time screen resolution detection, hardware interrogation, WebGL GPU forensics, display refresh rate benchmarking, and interactive mobile/desktop resolution comparator.",
  keywords: [
    "screen resolution",
    "what is my screen resolution",
    "check screen resolution",
    "screen size checker",
    "display resolution checker",
    "viewport size",
    "monitor resolution",
    "display ppi calculator",
    "device pixel ratio",
    "dead pixel test",
  ],
  authors: [{ name: "CyberTech Matrix Labs" }],
  creator: "CyberTech Matrix Labs",
  alternates: { canonical: "/" },
  robots: {
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
  openGraph: {
    title: "What Is My Screen Resolution?",
    description:
      "Instantly check your screen resolution, viewport size, DPR, refresh rate, GPU, and display capabilities.",
    type: "website",
    url: "/",
    siteName: "Cyber-Resolution",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "What Is My Screen Resolution?",
    description:
      "Instantly check your screen resolution, viewport size, DPR, refresh rate, GPU, and display capabilities.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030712",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full bg-[#030712] text-slate-100 antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-[#e2e8f0] selection:bg-[#00f0ff] selection:text-[#030712]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Cyber-Resolution",
                  alternateName: "What Is My Screen Resolution?",
                  description: "Browser-based screen resolution and display capability checker.",
                },
                {
                  "@type": "WebApplication",
                  "@id": `${siteUrl}/#application`,
                  url: siteUrl,
                  name: "What Is My Screen Resolution?",
                  applicationCategory: "UtilitiesApplication",
                  operatingSystem: "Any",
                  browserRequirements: "Requires a modern web browser with JavaScript enabled.",
                  isAccessibleForFree: true,
                  description: "Check screen resolution, viewport dimensions, DPR, refresh rate, GPU, and display telemetry in your browser.",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
