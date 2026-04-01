import ToolLayout from "@/components/PptToPdf/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PowerPoint to PDF Converter Online",
  description: "Convert your PowerPoint presentation into a PDF file.",
  openGraph: {
    title: "PowerPoint to PDF Converter Online",
    description: "Convert your PowerPoint presentation into a PDF file.",
    url: "/ppt-to-pdf",
  },
  twitter: {
    title: "PowerPoint to PDF Converter Online",
    description: "Convert your PowerPoint presentation into a PDF file.",
  },
};

export default function PptToPDFPage() {
  return (
    <ToolLayout
      title="PowerPoint to PDF Converter"
      description="Convert your PowerPoint presentation into a PDF file."
    >
      <div className="flex flex-col items-center gap-4">
        <FaUpload className="w-8 h-8 text-black" />
        <span className="px-6 py-4 bg-blue-600 text-white rounded-xl text-xl font-bold">
          Upload PowerPoint File
        </span>
        <p className="text-black text-sm">or drop files here</p>
      </div>
    </ToolLayout>
  );
}
