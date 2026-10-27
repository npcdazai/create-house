import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CREATE HOUSE — Interior & Architectural Designs | Akash Mane",
  description:
    "Create House by Founder & Principal Architect Akash Mane. Contemplative residences defined by untamed light, monolithic stone, and enduring spatial calm.",
  icons: {
    icon: [
      { url: "/images/create-house-favicon.png?v=3", type: "image/png", sizes: "256x256" },
    ],
    shortcut: ["/images/create-house-favicon.png?v=3"],
    apple: [{ url: "/images/create-house-favicon.png?v=3", sizes: "256x256", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-alabaster text-carbon font-sans antialiased selection:bg-carbon selection:text-alabaster overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

