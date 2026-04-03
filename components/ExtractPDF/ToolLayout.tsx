"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useFeedback } from "@/components/FeedbackProvider";
import { PDFDocument } from "pdf-lib";
import PdfPreview from "../common/PdfPreview";

type ToolLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};
const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [extractedBlob, setExtractedBlob] = useState<Blob | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openFeedback } = useFeedback();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPages([]);
    setError(null);

    const buffer = await f.arrayBuffer();
    e.target.value = "";
    const pdf = await PDFDocument.load(buffer);
    // Recreate File from the already-read buffer so clearing the input
    // does not invalidate the reference used by PdfPreview.
    setFile(new File([buffer], f.name, { type: f.type }));
    setPageCount(pdf.getPageCount());
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

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile || droppedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    setPages([]);
    setError(null);
    try {
      const buffer = await droppedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setFile(new File([buffer], droppedFile.name, { type: droppedFile.type }));
      setPageCount(pdf.getPageCount());
    } catch {
      setError("Failed to load PDF file");
    }
  };

  const togglePage = (p: number) => {
    setPages((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!loading) return;
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p));
    }, 300);
    return () => clearInterval(timer);
  }, [loading]);

  const handleExtract = async () => {
    if (!file || pages.length === 0) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pages", JSON.stringify(pages.sort((a, b) => a - b)));

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/extract`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Extract failed");

      const blob = await res.blob();
      setExtractedBlob(blob);
      setProgress(100);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!extractedBlob || !file) return;
    const url = URL.createObjectURL(extractedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-pages.pdf";
    a.click();
    URL.revokeObjectURL(url);

    setFile(null);
    setExtractedBlob(null);
    setPages([]);
    setProgress(0);
    setError(null);
    openFeedback("Extract PDF");
  };

  return (
    <main className="container min-h-screen bg-gray-100 mx-auto py-28">
      <section className="mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-gray-700 text-2xl mx-auto">{description}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleUpload}
        />
        {!file ? (
          <div className="relative max-w-5xl rounded-2xl p-32 mx-auto bg-white mt-10 border shadow-sm">
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
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <div key={p} onClick={() => togglePage(p)}>
                  <PdfPreview
                    file={file}
                    pageNumber={p}
                    selected={pages.includes(p)}
                  />
                </div>
              ))}
            </div>
            {loading && (
              <div className="mt-6">
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-blue-800 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm">Extracting ... {progress}%</p>
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-lg text-red-700">
                {error}
              </div>
            )}
            <div className="flex justify-center mt-6">
              {!extractedBlob ? (
                <button
                  onClick={handleExtract}
                  disabled={loading || pages.length === 0}
                  className="px-6 py-3 bg-blue-800 text-white rounded-xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Extract Pages
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-blue-800 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Download Extracted PDF
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
