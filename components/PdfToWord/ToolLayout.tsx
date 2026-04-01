"use client";
import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { PDFDocument } from "pdf-lib";

type ToolLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const buffer = await f.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);
    setPageCount(pdf.getPageCount());
    // Recreate the File from the already-read buffer before clearing the input.
    // Clearing e.target.value can silently invalidate the original File object
    // in some browsers, causing the upload to send an empty body.
    setFile(new File([buffer], f.name, { type: f.type }));
    e.target.value = "";
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
    setFile(droppedFile);
    // Load PDF to get page count
    try {
      const buffer = await droppedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setPageCount(pdf.getPageCount());
    } catch (err) {
      console.error("Error loading PDF:", err);
      setError("Failed to load PDF file");
      setPageCount(0);
    }
  };

  const handlePDFToWord = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/pdf-to-word`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = `Server error: ${res.status} ${res.statusText}`;
        try {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            const text = await res.text();
            errorMessage = text || errorMessage;
          }
        } catch (parseErr) {
          // If parsing fails, use default error message
        }
        throw new Error(errorMessage);
      }

      const blob = await res.blob();
      if (blob.size === 0) {
        throw new Error("Received empty file from server");
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.docx";
      a.click();
      URL.revokeObjectURL(url);
      setFile(null);
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Conversion failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-lg text-red-700">
                {error}
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={handlePDFToWord}
                disabled={loading || pageCount === 0}
                className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Converting" : "Download Converted Word Document"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ToolLayout;
