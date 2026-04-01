"use client";
import Link from "next/link";
import { pdfToolSections } from "@/constant/constant";
import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const ToolsDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-black text-xl font-semibold hover:text-blue-800 cursor-pointer transition"
      >
        <span className="flex items-center justify-center">
          Tools {open ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </span>
      </button>
      {open && (
        <div
          className="absolute top-full right-0 mt-4 w-130 max-w-[95vw]
          bg-white shadow-xl rounded-xl p-6 grid grid-cols-3 gap-6"
        >
          {pdfToolSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-md font-bold text-gray-500 mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      key={item.id}
                      onClick={() => setOpen(false)}
                      className="text-sm text-black hover:text-blue-800 transition font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsDropdown;
