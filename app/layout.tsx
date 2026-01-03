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
  title: "M&R",
  description: "Boda de Miguel y Romina",
  icons: [
    {
      rel: "icon",
      url: "/wedding.ico",
      type: "image/x-icon",
    },
    {
      rel: "shortcut icon",
      url: "/wedding.ico",
      type: "image/x-icon",
    },
    {
      rel: "apple-touch-icon",
      url: "/wedding.ico",
    },
  ],
  openGraph: {
    title: "M&R",
    description: "Boda de Miguel y Romina",
    type: "website",
    siteName: "M&R Boda",
    images: [
      {
        url: "https://img.smartslides.com/gal/aws/4k/2x/199826/2908c5a22e47bdad21f60aaab1c26b/6f29f436ec6398b6e189.jpg",
        width: 1200,
        height: 630,
        alt: "Invitación a la boda de Miguel y Romina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M&R",
    description: "Boda de Miguel y Romina",
    images: [
      {
        url: "https://img.smartslides.com/gal/aws/4k/2x/199826/2908c5a22e47bdad21f60aaab1c26b/6f29f436ec6398b6e189.jpg",
        width: 1200,
        height: 630,
        alt: "Invitación a la boda de Miguel y Romina",
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} ${allura.variable} ${cormorantGaramond.variable} ${ephesis.variable} antialiased bg-accent/60`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
