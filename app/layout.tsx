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
  title: "Prayer Times Dashboard - แอปแสดงเวลาละหมาด",
  description:
    "A beautiful prayer times dashboard with multiple themes and multi-language support (Thai, English, Arabic)",
  keywords: [
    "prayer times",
    "islamic",
    "salah",
    "ละหมาด",
    "เวลาละหมาด",
    "อิสลาม",
  ],
  authors: [{ name: "Marosdee Uma" }],
  creator: "Marosdee Uma",
  publisher: "Marosdee Uma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prayer Times Dashboard - แอปแสดงเวลาละหมาด",
    description:
      "A beautiful prayer times dashboard with multiple themes and multi-language support",
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
      "A beautiful prayer times dashboard with multiple themes and multi-language support",
    images: ["/android-chrome-512x512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prayer Times",
  },
  verification: {
    // Add your verification codes here if needed
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kanit.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
