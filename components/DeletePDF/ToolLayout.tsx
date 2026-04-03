"use client";
import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { PDFDocument } from "pdf-lib";
import { useFeedback } from "@/components/FeedbackProvider";
import PdfPreview from "../common/PdfPreview";

type ToolLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pagesToDelete, setPagesToDelete] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const { openFeedback } = useFeedback();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPagesToDelete([]);
    const buffer = await f.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);
    setPageCount(pdf.getPageCount());
    e.target.value = "";
  };

  const togglePage = (p: number) => {
    setPagesToDelete((prev) =>
      prev.includes(p) ? prev.filter((page) => page !== p) : [...prev, p],
    );
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile || droppedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    setFile(droppedFile);
  };

  const handleDelete = async () => {
    if (!file || pagesToDelete.length === 0) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "pages",
      JSON.stringify(pagesToDelete.sort((a, b) => a - b)),
    );
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/delete`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to delete pages");
      const blob = await res.blob();
      const updatedFile = new File([blob], file.name, {
        type: "application/pdf",
      });

      const buffer = await updatedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);

      setFile(updatedFile);
      setPageCount(pdf.getPageCount());
      setPagesToDelete([]);
      setResultBlob(blob);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "deleted-pages.pdf";
    a.click();
    URL.revokeObjectURL(url);
    setFile(null);
    setResultBlob(null);
    setPagesToDelete([]);
    setError(null);
    openFeedback("Delete PDF Pages");
  };

  const openFilePicker = () => {
    fileRef.current?.click();
  };

  return (
    <main className="container min-h-screen bg-gray-100 mx-auto py-28">
      <section className="mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-gray-700 text-2xl mx-auto">{description}</p>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={handleUpload}
        />
        {!file ? (
          <div className="relative max-w-5xl p-32 mx-auto bg-white mt-10 border rounded-2xl shadow-sm">
            <div
              onClick={openFilePicker}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`absolute inset-2 flex items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition
                ${
                  dragActive
                    ? "border-blue-900 bg-blue-50"
                    : "border-blue-800 bg-white"
                }`}
            >
              {children ?? <p className="text-gray-500">Upload your PDF</p>}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl border p-6 text-left">
            <div className="flex flex-wrap justify-between items-center border p-3 rounded-lg">
              <div>
                <p className="text-gray-700 font-medium text-sm sm:text-lg">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-6">
              {Array.from({ length: pageCount }, (_, i) => i + 1)
                .filter((p) => !pagesToDelete.includes(p))
                .map((p) => (
                  <div key={p}>
                    <PdfPreview
                      file={file}
                      pageNumber={p}
                      selected={pagesToDelete.includes(p)}
                      onDelete={() => togglePage(p)}
                    />
                  </div>
                ))}
            </div>
            {error && (
              <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-lg text-red-700">
                {error}
              </div>
            )}
            <div className="flex justify-center mt-6">
              {!resultBlob ? (
                <button
                  onClick={handleDelete}
                  disabled={loading || pagesToDelete.length === 0}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Deleting" : "Delete Pages"}
                </button>
              ) : (
                <button
                  onClick={download}
                  className="px-6 py-3 bg-blue-800 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Download PDF
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
export default ToolLayout;
