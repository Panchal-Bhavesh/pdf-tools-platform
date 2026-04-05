import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "PagelyPDF – Free PDF Tools Online",
  description:
    "Use PagelyPDF free online tools to merge PDF, split PDF, convert PDF to JPG, compress and protect PDF files easily.",
  openGraph: {
    title: "PagelyPDF – Free PDF Tools Online",
    description:
      "Use PagelyPDF free online tools to merge PDF, split PDF, convert PDF to JPG, compress and protect PDF files easily.",
    url: "/",
  },
  twitter: {
    title: "PagelyPDF – Free PDF Tools Online",
    description:
      "Use PagelyPDF free online tools to merge PDF, split PDF, convert PDF to JPG, compress and protect PDF files easily.",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PagelyPDF",
    "alternateName": ["pagelyPDF", "pagely pdf", "pagelypdf", "Pagely PDF"],
    "url": "https://pagelypdf.vercel.app",
    "description": "Free online PDF tools to merge, split, convert and protect PDF files.",
    "publisher": {
      "@type": "Organization",
      "name": "PagelyPDF",
      "alternateName": ["pagelyPDF", "pagely pdf", "pagelypdf"],
      "logo": {
        "@type": "ImageObject",
        "url": "https://pagelypdf.vercel.app/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
