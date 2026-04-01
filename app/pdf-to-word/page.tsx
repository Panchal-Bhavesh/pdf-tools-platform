import ToolLayout from "@/components/PdfToWord/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Word Converter Online",
  description: "Convert your PDF file into an editable Word document.",
  openGraph: {
    title: "PDF to Word Converter Online",
    description: "Convert your PDF file into an editable Word document.",
    url: "/pdf-to-word",
  },
  twitter: {
    title: "PDF to Word Converter Online",
    description: "Convert your PDF file into an editable Word document.",
  },
};

export default function PDFToWordPage() {
  return (
    <ToolLayout
      title="PDF to Word Converter"
      description="Convert your PDF file into an editable Word document. "
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
