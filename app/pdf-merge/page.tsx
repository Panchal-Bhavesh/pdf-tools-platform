import ToolLayout from "@/components/MergePDF/ToolLayout";
import type { Metadata } from "next";
import { FaUpload } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Merge PDF Online Free",
  description:
    "Merge multiple PDF files into one document online for free. Fast, secure, and easy with PagelyPDF.",
  openGraph: {
    title: "Merge PDF Online Free",
    description:
      "Merge multiple PDF files into one document online for free. Fast, secure, and easy with PagelyPDF.",
    url: "/pdf-merge",
  },
  twitter: {
    title: "Merge PDF Online Free",
    description:
      "Merge multiple PDF files into one document online for free. Fast, secure, and easy with PagelyPDF.",
  },
};

export default function MergePDFPage() {
  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF files into a single document quickly and securely."
    >
      <div className="flex flex-col items-center gap-4">
        <FaUpload className="w-8 h-8 text-black" />
        <span className="px-6 py-4 sm:px-12 sm:py-6 bg-blue-600 text-white rounded-xl text-lg sm:text-2xl font-bold hover:bg-blue-800 cursor-pointer">
          Upload PDF Files
        </span>
        <p className="text-black text-sm">or drop files here</p>
      </div>
    </ToolLayout>
  );
}
