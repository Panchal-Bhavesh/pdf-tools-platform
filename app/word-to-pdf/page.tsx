import ToolLayout from "@/components/WordToPdf/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word to PDF Converter Online",
  description: "Convert your Word document into a PDF file.",
  openGraph: {
    title: "Word to PDF Converter Online",
    description: "Convert your Word document into a PDF file.",
    url: "/word-to-pdf",
  },
  twitter: {
    title: "Word to PDF Converter Online",
    description: "Convert your Word document into a PDF file.",
  },
};

export default function WordToPDFPage() {
  return (
    <ToolLayout
      title="Word to PDF Converter"
      description="Convert your Word document into a PDF file."
    >
      <div className="flex flex-col items-center gap-4">
        <FaUpload className="w-8 h-8 text-black" />
        <span className="px-6 py-4 bg-blue-600 text-white rounded-xl text-xl font-bold">
          Upload Word File
        </span>
        <p className="text-black text-sm">or drop files here</p>
      </div>
    </ToolLayout>
  );
}
