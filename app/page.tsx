import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Free PDF Tools Online – Merge, Convert, Protect PDFs",
  description:
    "Use PagelyPDF free online tools to merge PDF, split PDF, convert PDF to JPG, compress and protect PDF files easily.",
  openGraph: {
    title: "Free PDF Tools Online – Merge, Convert, Protect PDFs",
    description:
      "Use PagelyPDF free online tools to merge PDF, split PDF, convert PDF to JPG, compress and protect PDF files easily.",
    url: "/",
  },
  twitter: {
    title: "Free PDF Tools Online – Merge, Convert, Protect PDFs",
    description:
      "Use PagelyPDF free online tools to merge PDF, split PDF, convert PDF to JPG, compress and protect PDF files easily.",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
    </>
  );
}
