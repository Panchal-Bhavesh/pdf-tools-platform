"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useFeedback } from "@/components/FeedbackProvider";

type CompressionMode = "extreme" | "recommended" | "less";

type ToolLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<CompressionMode>("recommended");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openFeedback } = useFeedback();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
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

  const handleCompress = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/compress`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Compression failed");

      const blob = await res.blob();
      setCompressedBlob(blob);
      setCompressedSize(blob.size);
      setProgress(100);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !file) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${file.name}`;
    a.click();
    URL.revokeObjectURL(url);

    setFile(null);
    setCompressedBlob(null);
    setCompressedSize(null);
    setProgress(0);
    setMode("recommended");
    setError(null);
    openFeedback("Compress PDF");
  };

  const reduction =
    file && compressedSize
      ? Math.round(((file.size - compressedSize) / file.size) * 100)
      : 0;

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

            <div className="mt-6 space-y-3">
              {["extreme", "recommended", "less"].map((m) => (
                <label
                  key={m}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer font-semibold
                    ${
                      mode === m
                        ? "border-blue-800 bg-blue-50 text-blue-800"
                        : "border-gray-400 text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  <input
                    type="radio"
                    name="compression"
                    value={m}
                    checked={mode === m}
                    onChange={() => setMode(m as CompressionMode)}
                  />
                  {m === "extreme" && "Extreme Compression"}
                  {m === "recommended" && "Recommended Compression"}
                  {m === "less" && "Less Compression"}
                </label>
              ))}
            </div>

            {loading && (
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-800 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Compressing... {progress}%
                </p>
              </div>
            )}

            {compressedBlob && (
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-green-700">
                  Your PDF is now {reduction}% smaller!
                </p>
                <p className="text-gray-600">
                  {(file.size / 1024).toFixed(2)} KB →{" "}
                  {(compressedSize! / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-300">
                <p className="text-red-700 font-semibold">Error</p>
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <div className="flex justify-center mt-6">
              {!compressedBlob ? (
                <button
                  onClick={handleCompress}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-blue-800 text-white font-semibold hover:bg-blue-900 disabled:bg-gray-400 cursor-pointer"
                >
                  {loading ? "Compressing..." : "Compress PDF"}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-xl bg-blue-800 text-white font-semibold hover:bg-blue-900 cursor-pointer"
                >
                  Download Compressed PDF
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
