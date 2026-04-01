import ToolLayout from "@/components/JpgToPdf/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PDF Converter Online",
  description:
    "Convert your JPG, PNG, or WebP images into a single PDF document.",
  openGraph: {
    title: "JPG to PDF Converter Online",
    description: "Convert your JPG, PNG, or WebP images into a single PDF document.",
    url: "/jpg-to-pdf",
  },
  twitter: {
    title: "JPG to PDF Converter Online",
    description: "Convert your JPG, PNG, or WebP images into a single PDF document.",
  },
};

export default function JpgToPDFPage() {
  return (
    <ToolLayout
      title="JPG to PDF Converter"
      description="Convert your JPG, PNG, or WebP images into a single PDF document."
    >
      <div className="flex flex-col items-center gap-4">
        <FaUpload className="w-8 h-8 text-black" />
        <span className="px-6 py-4 bg-blue-600 text-white rounded-xl text-xl font-bold">
          Upload Images
        </span>
        <p className="text-black text-sm">or drop files here</p>
      </div>
    </ToolLayout>
  );
}
