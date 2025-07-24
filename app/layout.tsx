import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ImageProvider } from "./Provider";
import QueryProvider from "./QueryProvider"; // <== import ở đây

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leaf Scan AI",
  description: "Upload your leaf to detect diseases using AI models.",
  icons: {
    icon: "/tend.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ImageProvider>{children}</ImageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
