import ToolLayout from "@/components/ReorderPDF/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reorder PDF Pages Online",
  description: "Drag and reorder PDF pages easily.",
  openGraph: {
    title: "Reorder PDF Pages Online",
    description: "Drag and reorder PDF pages easily.",
    url: "/reorder-pages",
  },
  twitter: {
    title: "Reorder PDF Pages Online",
    description: "Drag and reorder PDF pages easily.",
  },
};

export default function ReorderPDFPage() {
  return (
    <ToolLayout
      title="Reorder PDF"
      description="Drag & drop pages to reorder your PDF."
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
