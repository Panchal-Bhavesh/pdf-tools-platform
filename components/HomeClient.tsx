"use client";
import Link from "next/link";
import type { Category } from "@/constant/constant";
import { tools, tabs } from "@/constant/constant";
import { useState } from "react";

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filteredTools =
    activeTab === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeTab);

  return (
    <main className="container bg-gray-100 text-gray-200 min-h-screen mx-auto pt-32">
      <section className="text-center mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Smart PDF Tools Designed for Speed & Simplicity{" "}
        </h1>
        <p className="text-gray-700 mb-10 text-lg md:text-2xl max-w-5xl text-center mx-auto">
          Handle all your PDF tasks in one place. Merge, convert, compress, and
          secure documents online with fast, reliable, and easy-to-use tools.
        </p>
      </section>
      <section className="flex flex-wrap justify-center gap-3 mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as Category)}
            className={`px-5 py-2 rounded-full text-base font-medium transition cursor-pointer
        ${
          activeTab === tab.value
            ? "bg-blue-800 text-white"
            : "bg-white text-gray-700 border border-gray-400 hover:border-gray-800"
        }
      `}
          >
            {tab.label}
          </button>
        ))}
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              href={tool.path}
              className="p-6 rounded-2xl border border-gray-400 hover:shadow-xl hover:scale-[1.02] transition-transform bg-white "
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600/15">
                  <Icon className={`${tool.color} text-xl`} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-gray-500">{tool.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
      <section className="mx-auto mt-24 text-sm leading-relaxed">
        <h2 className="text-xl text-gray-900 font-semibold mb-3">
          All-in-one PDF tools platform
        </h2>
        <p className="mt-3 font-medium text-base sm:text-lg text-justify text-gray-700">
          PagelyPDF provides a complete collection of free online PDF tools to
          help you work with documents easily. Whether you want to merge PDF
          files, extract pages, convert PDF to images or protect documents with
          a password, our tools work directly in your browser with no
          installation required.
        </p>
      </section>
    </main>
  );
}
