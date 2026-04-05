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
  return (
    <>
      <HomeClient />
    </>
  );
}
