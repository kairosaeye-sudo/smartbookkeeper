import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartBookkeeper — AI-Powered Bookkeeping for Small Businesses",
  description: "Automate your bookkeeping with AI. Receipt scanning, expense categorization, and financial reporting for small businesses.",
  keywords: ["bookkeeping", "AI", "small business", "accounting", "expense tracking", "receipt scanning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
