"use client";
import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";

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
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_FILES = 20;
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    const newFiles = Array.from(selectedFiles).filter((f) => {
      if (f.type !== "application/pdf") {
        setError(`"${f.name}" is not a PDF file`);
        return false;
      }
      if (f.size > MAX_FILE_SIZE) {
        setError(`"${f.name}" exceeds the 50MB file size limit`);
        return false;
      }
      return true;
    });
    if (files.length + newFiles.length > MAX_FILES) {
      setError(`You can upload a maximum of ${MAX_FILES} files`);
      e.target.value = "";
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    try {
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/merge`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Something went wrong");
      const blob = await res.blob();
      setMergedBlob(blob);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    const url = window.URL.createObjectURL(mergedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
    setMergedBlob(null);
    setFiles([]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrag = function (
    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (
    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter((f) => {
        if (f.type !== "application/pdf") {
          setError(`"${f.name}" is not a PDF file`);
          return false;
        }
        if (f.size > MAX_FILE_SIZE) {
          setError(`"${f.name}" exceeds the 50MB file size limit`);
          return false;
        }
        return true;
      });
      if (files.length + newFiles.length > MAX_FILES) {
        setError(`You can upload a maximum of ${MAX_FILES} files`);
        return;
      }
      setError(null);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const openFilePicker = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  return (
    <main className="container min-h-screen bg-gray-100 text-gray-200 mx-auto py-28">
      <section className="mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-gray-700 text-2xl mx-auto">{description}</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          className="hidden"
          onChange={handleUpload}
        />
        {files.length === 0 ? (
          <div className="relative max-w-5xl rounded-2xl p-32 mx-auto text-center bg-white mt-10 border border-gray-200 shadow-sm">
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
                <p className="text-gray-500">Upload your file to get started</p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl border p-6">
            <ul className="space-y-3">
              {files.map((file, i) => (
                <li
                  key={`${file.name}-${i}`}
                  className="flex flex-wrap justify-between items-center p-3 border rounded-lg"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-gray-700 font-medium text-sm sm:text-lg">
                      {file.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(i)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100 p-2 rounded-lg transition cursor-pointer mt-2 sm:mt-0"
                    aria-label="Remove file"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-6">
              {files.length <= 1 && (
                <span className="text-red-500 font-semibold text-md">
                  Note: Please upload at least 2 files
                </span>
              )}
              {error && (
                <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={openFilePicker}
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-blue-800 bg-white border border-blue-800 hover:text-blue-900 hover:border-blue-950 hover:bg-gray-100 text-sm sm:text-lg font-medium sm:font-semibold cursor-pointer"
              >
                Add More Files +
              </button>
              {!mergedBlob ? (
                <button
                  onClick={handleMerge}
                  disabled={files.length < 2 || loading}
                  className={`px-6 py-3 rounded-xl font-semibold text-white
                  ${
                    loading || files.length < 2
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-800 hover:bg-blue-900 cursor-pointer"
                  }
                `}
                >
                  {loading ? "Merging..." : "Merge PDF"}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-800 hover:bg-blue-900 cursor-pointer"
                >
                  Download Merged PDF
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
