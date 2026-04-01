import ToolLayout from "@/components/SplitPDF/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF Online Free",
  description:
    "Split PDF files into multiple documents by pages or custom ranges. Fast and secure with PagelyPDF.",
  openGraph: {
    title: "Split PDF Online Free",
    description:
      "Split PDF files into multiple documents by pages or custom ranges. Fast and secure with PagelyPDF.",
    url: "/pdf-split",
  },
  twitter: {
    title: "Split PDF Online Free",
    description:
      "Split PDF files into multiple documents by pages or custom ranges. Fast and secure with PagelyPDF.",
  },
};

export default function SplitPDFPage() {
  return (
    <ToolLayout
      title="Split PDF"
      description="Split your PDF into multiple files by pages or custom ranges."
    >
      <div className="flex flex-col items-center gap-4">
        <FaUpload className="w-8 h-8 text-black" />
        <span className="px-6 py-4 sm:px-12 sm:py-6 bg-blue-600 text-white rounded-xl text-lg sm:text-2xl font-bold hover:bg-blue-800 cursor-pointer">
          Upload PDF File
        </span>
        <p className="text-black text-sm">or drop files here</p>
      </div>
    </ToolLayout>
  );
}
