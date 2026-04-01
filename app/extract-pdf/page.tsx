import ToolLayout from "../../components/ExtractPDF/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract PDF Online Free",
  description: "Extract pages from PDF files. Fast and secure with PagelyPDF.",
  openGraph: {
    title: "Extract PDF Online Free",
    description: "Extract pages from PDF files. Fast and secure with PagelyPDF.",
    url: "/extract-pdf",
  },
  twitter: {
    title: "Extract PDF Online Free",
    description: "Extract pages from PDF files. Fast and secure with PagelyPDF.",
  },
};

export default function ExtractPDFPage() {
  return (
    <ToolLayout title="Extract PDF" description="Extract pages from PDF files.">
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
