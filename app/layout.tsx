import "./globals.css";
import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollToTop from "@/components/Helper/ScrollToTop";
import PWARegister from "@/components/PWARegister";
import InstallPrompt from "@/components/InstallPrompt";
import { FeedbackProvider } from "@/components/FeedbackProvider";

const font = Rethink_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PagelyPDF – Free Online PDF Tools",
    template: "%s | PagelyPDF",
  },
  description:
    "PagelyPDF is a modern free PDF tools platform to merge PDF, split PDF, convert PDF to JPG, compress and protect PDF files online.",
  keywords: [
    "pdf tools",
    "merge pdf online",
    "split pdf",
    "pdf to jpg",
    "compress pdf",
    "protect pdf",
    "unlock pdf",
    "pdf converter",
    "free pdf tools",
    "online pdf editor",
    "word to pdf",
    "jpg to pdf",
    "pdf to word",
    "pdf to excel",
  ],
  metadataBase: new URL("https://pagelypdf.vercel.app"),
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PagelyPDF",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#1e3a8a",
  openGraph: {
    title: "PagelyPDF – Free PDF Tools",
    description:
      "All-in-one free online PDF tools to merge, convert and secure your PDF files.",
    type: "website",
    url: "/",
    siteName: "PagelyPDF",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "PagelyPDF – Free Online PDF Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PagelyPDF – Free Online PDF Tools",
    description:
      "All-in-one free online PDF tools to merge, convert and secure your PDF files.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: "#f3f4f6" }}>
      <body
        className={`bg-gray-100 text-gray-200 antialiased min-h-screen ${font.className} `}
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <SmoothScrollProvider>
          <FeedbackProvider>
            <ResponsiveNav />
            <PWARegister />
            <InstallPrompt />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </FeedbackProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
