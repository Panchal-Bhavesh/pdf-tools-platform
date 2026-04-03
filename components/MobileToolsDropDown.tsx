"use client";
import { pdfToolSections } from "@/constant/constant";
import Link from "next/link";
import { useState } from "react";

type Props = {
  closeNav: () => void;
};

const MobileToolsDropdown = ({ closeNav }: Props) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {pdfToolSections.map((section, index) => (
        <div key={section.title}>
          <button
            onClick={() => setOpenSection(openSection === index ? null : index)}
            className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]"
          >
            {section.title}
          </button>

          {openSection === index && (
            <div className="ml-16 mt-4 space-y-3">
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={closeNav}
                  className="block text-[18px] text-white opacity-90"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileToolsDropdown;
