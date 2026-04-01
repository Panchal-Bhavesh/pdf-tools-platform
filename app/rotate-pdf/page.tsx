import ToolLayout from "@/components/RotatePDF/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online",
  description: "Rotate all pages of your PDF by 90°, 180°, or 270°.",
  openGraph: {
    title: "Rotate PDF Pages Online",
    description: "Rotate all pages of your PDF by 90°, 180°, or 270°.",
    url: "/rotate-pdf",
  },
  twitter: {
    title: "Rotate PDF Pages Online",
    description: "Rotate all pages of your PDF by 90°, 180°, or 270°.",
  },
};

export default function RotatePDFPage() {
  return (
    <ToolLayout
      title="Rotate PDF"
      description="Rotate all pages of your PDF by 90°, 180°, or 270°."
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
