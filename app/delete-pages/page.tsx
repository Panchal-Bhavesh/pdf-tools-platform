import ToolLayout from "@/components/DeletePDF/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete PDF Pages Online",
  description: "Select pages you want to remove from your PDF.",
  openGraph: {
    title: "Delete PDF Pages Online",
    description: "Select pages you want to remove from your PDF.",
    url: "/delete-pages",
  },
  twitter: {
    title: "Delete PDF Pages Online",
    description: "Select pages you want to remove from your PDF.",
  },
};

export default function ReorderPDFPage() {
  return (
    <ToolLayout
      title="Delete PDF Pages"
      description="Select pages you want to remove from your PDF."
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
