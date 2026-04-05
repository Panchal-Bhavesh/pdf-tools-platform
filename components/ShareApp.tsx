"use client";
import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";

export default function ShareApp() {
  const [canShare] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768 && !!navigator.share;
  });

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "PagelyPDF – Free PDF Tools",
        text: "Check out PagelyPDF! Free online tools to merge, split, convert and protect PDF files.",
        url: "https://pagelypdf.vercel.app",
      });
    } catch {
      // User cancelled or share failed
    }
  };

  if (!canShare) return null;

  return (
    <button
      onClick={handleShare}
      style={{ position: "fixed", left: 16, bottom: 24, zIndex: 9999 }}
      className="flex items-center gap-2 bg-blue-800 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-900 transition cursor-pointer"
    >
      <FaShareAlt />
      Share App
    </button>
  );
}
