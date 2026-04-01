import ToolLayout from "@/components/ExcelToPdf/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel to PDF Converter Online",
  description: "Convert your Excel spreadsheet into a PDF document.",
  openGraph: {
    title: "Excel to PDF Converter Online",
    description: "Convert your Excel spreadsheet into a PDF document.",
    url: "/excel-to-pdf",
  },
  twitter: {
    title: "Excel to PDF Converter Online",
    description: "Convert your Excel spreadsheet into a PDF document.",
  },
};

export default function ExcelToPDFPage() {
  return (
    <ToolLayout
      title="Excel to PDF Converter"
      description="Convert your Excel spreadsheet into a PDF document."
    >
      <div className="flex flex-col items-center gap-4">
        <FaUpload className="w-8 h-8 text-black" />
        <span className="px-6 py-4 bg-blue-600 text-white rounded-xl text-xl font-bold">
          Upload Excel File
        </span>
        <p className="text-black text-sm">or drop files here</p>
      </div>
    </ToolLayout>
  );
}
