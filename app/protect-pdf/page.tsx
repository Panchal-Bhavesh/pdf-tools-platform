import ToolLayout from "@/components/ProtectPdf/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protect PDF with Password Online",
  description: "Add a password to your PDF to prevent unauthorized access.",
  openGraph: {
    title: "Protect PDF with Password Online",
    description: "Add a password to your PDF to prevent unauthorized access.",
    url: "/protect-pdf",
  },
  twitter: {
    title: "Protect PDF with Password Online",
    description: "Add a password to your PDF to prevent unauthorized access.",
  },
};

export default function ProtectPDFPage() {
  return (
    <ToolLayout
      title="Protect PDF"
      description="Add a password to your PDF to prevent unauthorized access."
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
