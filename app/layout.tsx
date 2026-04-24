import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import TopNav from "../components/TopNav";
import MobileNav from "../components/MobileNav";
import FloatingChatButton from "../components/FloatingChatButton";
import { AuthProvider } from "../context/AuthContext";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"]
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Vayka — AI-Powered Travel Discovery",
    template: "%s | Vayka",
  },
  description:
    "Vayka bridges your wanderlust and the world's best-kept secrets using AI-curated recommendations, itinerary planning, and destination comparison.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vayka.vercel.app"
  ),
  openGraph: {
    title: "Vayka — AI-Powered Travel Discovery",
    description:
      "Let AI curate your perfect journey based on mood, budget, and timing.",
    siteName: "Vayka",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vayka — AI-Powered Travel Discovery",
    description:
      "Let AI curate your perfect journey based on mood, budget, and timing.",
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
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
      className={`${notoSerif.variable} ${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-fixed">
        <AuthProvider>
          <TopNav />
          {children}
          <FloatingChatButton />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}
