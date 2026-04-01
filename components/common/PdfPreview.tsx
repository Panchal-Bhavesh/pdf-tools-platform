"use client";

import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";

type Props = {
  file: File;
  pageNumber: number;
  selected?: boolean;
  onDelete?: () => void;
};

export default function PdfPreview({
  file,
  pageNumber,
  selected = false,
  onDelete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderError, setRenderError] = useState(false);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setRenderError(false);
    setRendering(true);

    const render = async () => {
      if (!canvasRef.current) return;
      try {
        const pdfjsLib = await import("pdfjs-dist");

        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const buffer = await file.arrayBuffer();
        if (buffer.byteLength === 0) throw new Error("Empty file buffer");

        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        const page = await pdf.getPage(pageNumber);

        if (cancelled) return;

        const viewport = page.getViewport({ scale: 0.35 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Failed to get canvas context");

        await page.render({ canvasContext: ctx, viewport }).promise;
      } catch {
        if (!cancelled) setRenderError(true);
      } finally {
        if (!cancelled) setRendering(false);
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [file, pageNumber]);

  return (
    <div
      className={`relative border rounded-lg p-2 cursor-pointer transition group
        ${
          selected ? "ring-4 ring-blue-600" : "hover:ring-2 hover:ring-blue-500"
        }
      `}
    >
      {onDelete && (
        <button
          title="Mark page for deletion"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className={`absolute top-2 right-2 p-1 rounded-full z-10 cursor-pointer transition
    ${selected ? "bg-red-600" : "bg-gray-400 group-hover:bg-red-500"}
    text-white`}
        >
          <FaTrash size={12} />
        </button>
      )}
      <div className="w-full aspect-3/4 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center relative">
        {rendering && !renderError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {renderError ? (
          <span className="text-xs text-gray-400 text-center px-2">
            Preview unavailable
          </span>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-contain"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <p className="text-xs mt-2 font-semibold text-center text-black">
        Page {pageNumber}
      </p>
    </div>
  );
}
