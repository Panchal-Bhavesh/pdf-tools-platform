"use client";
import React, { useRef, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type SplitMode = "single" | "fixed" | "custom";

interface ModeDropdownProps {
  value: SplitMode;
  onChange: (mode: SplitMode) => void;
}

export default function ModeDropdown({ value, onChange }: ModeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const modes: { value: SplitMode; label: string }[] = [
    { value: "single", label: "Split into single pages" },
    { value: "fixed", label: "Split into fixed ranges" },
    { value: "custom", label: "Split into custom ranges" },
  ];

  const selectedLabel =
    modes.find((m) => m.value === value)?.label || "Select mode";

  const handleSelect = (mode: SplitMode) => {
    onChange(mode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border rounded-lg p-3 border-blue-800 bg-white text-blue-800 hover:text-blue-900 hover:border-blue-950 cursor-pointer font-semibold focus:outline-none flex justify-between items-center"
      >
        <span>{selectedLabel}</span>
        <FaChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-800 rounded-lg shadow-lg z-50">
          {modes.map((mode, index) => (
            <button
              key={mode.value}
              onClick={() => handleSelect(mode.value)}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 cursor-pointer font-semibold text-blue-800 transition ${
                value === mode.value ? "bg-blue-100" : ""
              } ${
                index !== modes.length - 1 ? "border-b border-blue-200" : ""
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
