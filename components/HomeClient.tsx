"use client";
import Link from "next/link";
import type { Category } from "@/constant/constant";
import { tools, tabs } from "@/constant/constant";
import { useState } from "react";

const iconBgMap: Record<string, string> = {
  "text-orange-500": "bg-orange-500/10",
  "text-orange-600": "bg-orange-500/10",
  "text-green-500": "bg-green-500/10",
  "text-green-600": "bg-green-500/10",
  "text-green-800": "bg-green-600/10",
  "text-blue-800": "bg-blue-700/10",
  "text-red-500": "bg-red-500/10",
  "text-yellow-500": "bg-yellow-400/10",
  "text-sky-500": "bg-sky-500/10",
};

const stats = [
  { value: "10+", label: "PDF Tools" },
  { value: "100%", label: "Free Forever" },
  { value: "0", label: "Sign-up Needed" },
  { value: "PWA", label: "Works Offline" },
];

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filteredTools =
    activeTab === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeTab);

  return (
    <main className="min-h-screen mx-auto pt-28 sm:pt-32">
      <section className="container text-center mx-auto max-w-5xl">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
          Free · No Sign-up · Works Directly in Browser
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight tracking-tight">
          Smart PDF Tools Designed for{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0c3e78] to-[#dc2626]">
            Speed &amp; Simplicity
          </span>
        </h1>

        <p className="text-gray-600 mb-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Handle all your PDF tasks in one place. Merge, convert, compress, and
          secure documents online — fast, reliable, and easy-to-use.
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0c3e78]">
                {s.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as Category)}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer
              ${
                activeTab === tab.value
                  ? "bg-[#0c3e78] text-white shadow-md shadow-blue-900/25 scale-[1.03]"
                  : "bg-white text-gray-600 border border-gray-300 hover:border-[#0c3e78] hover:text-[#0c3e78] hover:shadow-sm"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </section>

      <section className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8!">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          const iconBg = iconBgMap[tool.color] ?? "bg-blue-600/10";
          return (
            <Link
              key={tool.name}
              href={tool.path}
              className="group p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#0c3e78]/30 hover:shadow-xl hover:shadow-blue-900/8 active:scale-[0.99] transition-all duration-200"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl ${iconBg} shrink-0 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`${tool.color} text-base sm:text-xl`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug group-hover:text-[#0c3e78] transition-colors duration-150">
                    {tool.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug">
                    {tool.desc}
                  </p>
                </div>
                <svg
                  className="text-gray-300 group-hover:text-[#0c3e78] group-hover:translate-x-0.5 transition-all duration-200 shrink-0 hidden sm:block"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="container mx-auto mt-16! pb-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-6 rounded-full bg-linear-to-b from-[#0c3e78] to-[#dc2626]" />
            <h2 className="text-lg sm:text-xl text-gray-900 font-semibold">
              All-in-one PDF tools platform
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            PagelyPDF provides a complete collection of free online PDF tools to
            help you work with documents easily. Whether you want to merge PDF
            files, extract pages, convert PDF to images or protect documents
            with a password, our tools work directly in your browser with no
            installation required.
          </p>
        </div>
      </section>
    </main>
  );
}
