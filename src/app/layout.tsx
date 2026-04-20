import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snippet Master | Store Your Code",
  description: "A premium way to store and manage your code snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        <Background />
        <main className="container mx-auto p-4 md:p-12 relative z-10 animate-slide-up">
           {children}
        </main>
        </body>
    </html>
  );
}
