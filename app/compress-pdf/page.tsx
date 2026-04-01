import ToolLayout from "../../components/compressPDF/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF Online Free",
  description:
    "Compress PDF files to reduce their size. Fast and secure with PagelyPDF.",
  openGraph: {
    title: "Compress PDF Online Free",
    description:
      "Compress PDF files to reduce their size. Fast and secure with PagelyPDF.",
    url: "/compress-pdf",
  },
  twitter: {
    title: "Compress PDF Online Free",
    description:
      "Compress PDF files to reduce their size. Fast and secure with PagelyPDF.",
  },
};

export default function CompressPDFPage() {
  return (
    <ToolLayout
      title="Compress PDF"
      description="Compress your PDF to reduce its size."
    >
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
