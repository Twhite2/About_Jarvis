import type { Metadata } from "next";
import { Orbitron, Rubik_Glitch, Geist_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik-glitch",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frank-Opigo (Jarvis) | Software Developer",
  description: "Portfolio website of Frank-Opigo A. Emmanuel (Jarvis) — a software developer with expertise in frontend, desktop, and smart contract development.",
  keywords: ["software developer", "frontend developer", "desktop developer", "smart contract developer", "Python", "React", "Next.js", "portfolio", "Frank Opigo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rubikGlitch.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
