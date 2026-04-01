"use client";
import React, { useRef, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import ModeDropdown from "./ModeDropdown";

type SplitMode = "single" | "fixed" | "custom";

type Range = {
  id: string;
  from: number;
  to: number;
};

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
  const [mode, setMode] = useState<SplitMode>("single");
  const [dragActive, setDragActive] = useState(false);
  const [fixedRange, setFixedRange] = useState<number>(2);
  const [customRanges, setCustomRanges] = useState<Range[]>([
    { id: "1", from: 1, to: 3 },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    e.target.value = "";
  };

  const handleSplit = async () => {
    if (!file) return;

    if (mode === "fixed" && fixedRange < 1) {
      setError("Pages per split must be at least 1");
      return;
    }
    if (mode === "custom") {
      for (const range of customRanges) {
        if (range.from > range.to) {
          setError(`Invalid range: "From" (${range.from}) must be ≤ "To" (${range.to})`);
          return;
        }
      }
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    if (mode === "fixed") {
      formData.append("ranges", JSON.stringify({ fixed: fixedRange }));
    }
    if (mode === "custom") {
      const ranges = customRanges.map((r) => ({
        start: r.from,
        end: r.to,
      }));
      formData.append("ranges", JSON.stringify(ranges));
    }
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/split`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Split failed");
      const blob = await res.blob();
      setZipBlob(blob);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!zipBlob) return;
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "split-pdf.zip";
    a.click();
    URL.revokeObjectURL(url);
    setZipBlob(null);
    setFile(null);
    setCustomRanges([{ id: "1", from: 1, to: 3 }]);
    setFixedRange(2);
    setMode("single");
  };

  const openFilePicker = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const addRange = () => {
    const newId = Date.now().toString();
    setCustomRanges([...customRanges, { id: newId, from: 1, to: 1 }]);
  };

  const updateRange = (id: string, field: "from" | "to", value: number) => {
    setCustomRanges(
      customRanges.map((range) =>
        range.id === id ? { ...range, [field]: value } : range
      )
    );
  };

  const removeRange = (id: string) => {
    if (customRanges.length > 1) {
      setCustomRanges(customRanges.filter((range) => range.id !== id));
    }
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    if (droppedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setFile(droppedFile);
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
          multiple
          accept=".pdf"
          className="hidden"
          onChange={handleUpload}
        />
        {!file ? (
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
          <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl border p-6 text-left">
            <div className="flex flex-wrap justify-between items-center border p-3 rounded-lg">
              <div>
                <p className="text-gray-700 font-medium text-sm sm:text-lg">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-600 hover:bg-red-100 p-2 rounded-lg transition cursor-pointer mt-2 sm:mt-0"
                aria-label="Remove file"
              >
                <FaTrash />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <ModeDropdown value={mode} onChange={setMode} />
              {mode === "fixed" && (
                <input
                  type="number"
                  min={1}
                  value={fixedRange}
                  onChange={(e) => setFixedRange(+e.target.value)}
                  className="w-full border rounded-lg p-3 border-blue-800 bg-white hover:bg-blue-100 text-blue-800 hover:text-blue-900 hover:border-blue-950 cursor-pointer font-semibold"
                  placeholder="Pages per split (e.g. 2)"
                />
              )}
              {mode === "custom" && (
                <div className="space-y-3">
                  {customRanges.map((range) => (
                    <div
                      key={range.id}
                      className="flex gap-3 items-end border rounded-lg p-3 border-blue-800 bg-blue-50"
                    >
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-blue-800 mb-1">
                          From
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={range.from}
                          onChange={(e) =>
                            updateRange(
                              range.id,
                              "from",
                              Math.max(1, +e.target.value)
                            )
                          }
                          className="w-full border rounded-lg p-2 border-blue-800 bg-white text-blue-800 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-800"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-blue-800 mb-1">
                          To
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={range.to}
                          onChange={(e) =>
                            updateRange(
                              range.id,
                              "to",
                              Math.max(1, +e.target.value)
                            )
                          }
                          className="w-full border rounded-lg p-2 border-blue-800 bg-white text-blue-800 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-800"
                        />
                      </div>
                      <button
                        onClick={() => removeRange(range.id)}
                        disabled={customRanges.length === 1}
                        className={`p-2 rounded-lg transition ${
                          customRanges.length === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-red-500 hover:bg-red-100 cursor-pointer"
                        }`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addRange}
                    className="w-full flex items-center justify-center gap-2 mt-3 px-4 py-2 rounded-lg border border-dashed border-blue-800 text-blue-800 font-semibold hover:bg-blue-50 transition cursor-pointer"
                  >
                    <FaPlus /> Add Range
                  </button>
                </div>
              )}
            </div>
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-4 mt-6 justify-center">
              {!zipBlob ? (
                <button
                  onClick={handleSplit}
                  disabled={loading}
                  className={`px-6 py-3 rounded-xl font-semibold text-white
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-800 hover:bg-blue-900 cursor-pointer"
                  }
                `}
                >
                  {loading ? "Splitting..." : "Split PDF"}
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-800 hover:bg-blue-900 cursor-pointer"
                >
                  Download Zip
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
