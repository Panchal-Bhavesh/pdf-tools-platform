import ToolLayout from "@/components/PdfToPPT/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to PowerPoint Converter Online",
  description: "Convert your PDF file into an editable PowerPoint presentation.",
  openGraph: {
    title: "PDF to PowerPoint Converter Online",
    description: "Convert your PDF file into an editable PowerPoint presentation.",
    url: "/pdf-to-ppt",
  },
  twitter: {
    title: "PDF to PowerPoint Converter Online",
    description: "Convert your PDF file into an editable PowerPoint presentation.",
  },
};

export default function PDFToPPTPage() {
  return (
    <ToolLayout
      title="PDF to PowerPoint Converter"
      description="Convert your PDF file into an editable PowerPoint presentation."
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
