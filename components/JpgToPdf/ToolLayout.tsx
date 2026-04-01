"use client";
import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";

type ToolLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter((f) =>
      ACCEPTED_TYPES.includes(f.type)
    );
    if (valid.length < incoming.length) {
      alert("Only JPG, PNG, and WebP images are allowed");
    }
    setFiles((prev) => [...prev, ...valid]);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
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
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const handleJpgToPDF = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/jpg-to-pdf`, {
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
      const baseName =
        files.length === 1
          ? files[0].name.replace(/\.(jpg|jpeg|png|webp)$/i, "")
          : "images";
      a.download = `${baseName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setFiles([]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Conversion error:", err);
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
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          hidden
          onChange={handleUpload}
        />
        {files.length === 0 ? (
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
              {children ?? (
                <p className="text-gray-500">Upload your JPG images</p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl border p-6 text-left">
            <div className="space-y-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex flex-wrap justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="text-gray-700 font-medium text-sm sm:text-lg">
                      {f.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(f.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={openFilePicker}
              className="mt-4 text-blue-700 hover:underline text-sm cursor-pointer"
            >
              + Add more images
            </button>
            {error && (
              <div className="mt-6 bg-red-50 border border-red-300 p-4 rounded-lg text-red-700">
                {error}
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleJpgToPDF}
                disabled={loading}
                className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Converting..."
                  : `Convert ${files.length} ${files.length === 1 ? "Image" : "Images"} to PDF`}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ToolLayout;
