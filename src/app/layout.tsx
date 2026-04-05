import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Black Label Solutions | Your AI Chief of Staff",
  description:
    "A permanent AI executive that runs your operations, manages your teams, and scales your business. Custom-built for yours. Excellence in Execution.",
  keywords: [
    "AI Chief of Staff",
    "Business Automation",
    "AI Executive",
    "Black Label Solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jetbrains.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-surface text-txt-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
