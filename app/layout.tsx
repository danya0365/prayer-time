import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-sans",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prayer Times Dashboard - แอปแสดงเวลาละหมาด",
    template: "%s | Prayer Times Dashboard",
  },
  description:
    "แอปพลิเคชันแสดงเวลาละหมาดที่สวยงาม รองรับหลายธีมและหลายภาษา (ไทย, อังกฤษ, อาหรับ) - A beautiful prayer times dashboard with multiple themes and multi-language support",
  keywords: [
    "prayer times",
    "islamic",
    "salah",
    "muslim",
    "ละหมาด",
    "เวลาละหมาด",
    "อิสลาม",
    "มุสลิม",
    "สลาต",
    "islamic calendar",
    "qibla direction",
  ],
  authors: [{ name: "Marosdee Uma" }],
  creator: "Marosdee Uma",
  publisher: "Marosdee Uma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "th-TH": "/",
      "en-US": "/",
      "ar-SA": "/",
    },
  },
  openGraph: {
    title: "Prayer Times Dashboard - แอปแสดงเวลาละหมาด",
    description:
      "แอปพลิเคชันแสดงเวลาละหมาดที่สวยงาม รองรับหลายธีมและหลายภาษา - A beautiful prayer times dashboard with multiple themes and multi-language support",
    url: "/",
    siteName: "Prayer Times Dashboard",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Prayer Times Dashboard Logo",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayer Times Dashboard - แอปแสดงเวลาละหมาด",
    description:
      "แอปพลิเคชันแสดงเวลาละหมาดที่สวยงาม รองรับหลายธีมและหลายภาษา",
    images: ["/android-chrome-512x512.png"],
    creator: "@marosdeeuma",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prayer Times",
    startupImage: [
      {
        url: "/apple-touch-icon.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  verification: {
    // Add your verification codes here if needed
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: "lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${kanit.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
