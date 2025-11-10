import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Allura,
  Cormorant_Garamond,
  Ephesis,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-allura",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});

const ephesis = Ephesis({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ephesis",
});

export const metadata: Metadata = {
  title: "Boda de Miguel y Romina",
  description: "Boda de Miguel y Romina",
  icons: {
    icon: "/wedding.ico",
  },
  openGraph: {
    title: "Boda de Miguel y Romina",
    description: "Boda de Miguel y Romina",
    images: "/wedding.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allura.variable} ${cormorantGaramond.variable} ${ephesis.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
