import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CYBER-RESOLUTION // Deep Browser & Screen Telemetry Extractor",
  description:
    "Cyberpunk hacker terminal for real-time screen resolution detection, hardware interrogation, WebGL GPU forensics, display refresh rate benchmarking, and interactive mobile/desktop resolution comparator.",
  keywords: [
    "screen resolution",
    "what is my screen resolution",
    "display ppi calculator",
    "browser telemetry",
    "device pixel ratio",
    "hacker terminal",
    "gpu benchmark",
    "dead pixel test",
    "viewport inspector",
  ],
  authors: [{ name: "CyberTech Matrix Labs" }],
  openGraph: {
    title: "CYBER-RESOLUTION // Deep Browser & Screen Telemetry Extractor",
    description:
      "Instant real-time screen resolution, GPU specs, DPR, refresh rate, and deep hardware telemetry extraction with a cyberpunk hacker interface.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
