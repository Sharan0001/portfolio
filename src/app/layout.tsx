import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sharan — AI Systems Engineer",
  description:
    "AI Systems Engineer focused on Decision Intelligence, Computer Vision, and Explainable AI. Building systems that explain their reasoning, not just their predictions.",
  keywords: [
    "AI Systems Engineer",
    "Decision Intelligence",
    "Computer Vision",
    "Explainable AI",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Sharan" }],
  openGraph: {
    title: "Sharan — AI Systems Engineer",
    description:
      "Designing Intelligent Systems, Not Just Models.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
