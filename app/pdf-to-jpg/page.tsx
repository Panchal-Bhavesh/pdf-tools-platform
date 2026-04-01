import ToolLayout from "@/components/PdfToJpg/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to JPG Converter Online",
  description:
    "Convert every page of your PDF into high-quality JPG images.",
  openGraph: {
    title: "PDF to JPG Converter Online",
    description: "Convert every page of your PDF into high-quality JPG images.",
    url: "/pdf-to-jpg",
  },
  twitter: {
    title: "PDF to JPG Converter Online",
    description: "Convert every page of your PDF into high-quality JPG images.",
  },
};

export default function PDFToJpgPage() {
  return (
    <ToolLayout
      title="PDF to JPG Converter"
      description="Convert every page of your PDF into high-quality JPG images."
    >
      <div className="flex flex-col items-center gap-4">
        <FaUpload className="w-8 h-8 text-black" />
        <span className="px-6 py-4 bg-blue-600 text-white rounded-xl text-xl font-bold">
          Upload PDF File
        </span>
        <p className="text-black text-sm">or drop files here</p>
      </div>
    </ToolLayout>
  );
}
