import ToolLayout from "@/components/PdfToExcel/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Excel Converter Online",
  description: "Convert your PDF file into an editable Excel spreadsheet.",
  openGraph: {
    title: "PDF to Excel Converter Online",
    description: "Convert your PDF file into an editable Excel spreadsheet.",
    url: "/pdf-to-excel",
  },
  twitter: {
    title: "PDF to Excel Converter Online",
    description: "Convert your PDF file into an editable Excel spreadsheet.",
  },
};

export default function PDFToExcelPage() {
  return (
    <ToolLayout
      title="PDF to Excel Converter"
      description="Convert your PDF file into an editable Excel spreadsheet."
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
