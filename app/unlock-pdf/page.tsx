import ToolLayout from "@/components/UnlockPdf/ToolLayout";
import { FaUpload } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unlock PDF — Remove Password Online",
  description: "Remove the password from your PDF and get an unlocked file.",
  openGraph: {
    title: "Unlock PDF — Remove Password Online",
    description: "Remove the password from your PDF and get an unlocked file.",
    url: "/unlock-pdf",
  },
  twitter: {
    title: "Unlock PDF — Remove Password Online",
    description: "Remove the password from your PDF and get an unlocked file.",
  },
};

export default function UnlockPDFPage() {
  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove the password from your PDF and get an unlocked file."
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
