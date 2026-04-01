"use client";
import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { PDFDocument } from "pdf-lib";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortablePage from "./PageItem";

type ToolLayoutProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Enable both pointer (desktop) and touch (mobile) sensors
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 150, tolerance: 5 },
  });
  const sensors = useSensors(pointerSensor, touchSensor);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const buffer = await f.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);
    setFile(f);
    setPages(Array.from({ length: pdf.getPageCount() }, (_, i) => i + 1));
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
    try {
      const buffer = await droppedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setFile(droppedFile);
      setPages(Array.from({ length: pdf.getPageCount() }, (_, i) => i + 1));
    } catch {
      setError("Failed to load PDF file");
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setPages((items) => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleReorder = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("order", JSON.stringify(pages));

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdf/reorder`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!res.ok) throw new Error("Reorder failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reordered.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
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
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 font-medium">
                💡 <span className="font-semibold">Tip:</span> Drag and drop the
                pages below to reorder them as you like. Simply click and hold
                on a page, then drag it to your desired position.
              </p>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={pages}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-6">
                  {pages.map((p) => (
                    <SortablePage key={p} id={p} file={file} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-300 p-4 rounded-lg text-red-700">
                {error}
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleReorder}
                disabled={loading || pages.length === 0}
                className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Reordering..." : "Download Reordered PDF"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ToolLayout;
