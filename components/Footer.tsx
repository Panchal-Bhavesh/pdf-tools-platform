"use client";
import { FaHeart, FaFilePdf } from "react-icons/fa";
import ContactModal from "./ContactModal";
import TermsModal from "./TermsModal";
import { useFeedback } from "./FeedbackProvider";
import { useState } from "react";

export default function Footer() {
  const [openContact, setOpenContact] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const { openFeedback } = useFeedback();

  return (
    <>
      <footer className="w-full bg-[#0B0F1A] mt-14">
        <div className="h-0.75 w-full bg-linear-to-r from-[#0c3e78] via-[#6366f1] to-[#dc2626]" />

        <div className="container py-8 sm:py-10 flex flex-col lg:flex-row gap-5 lg:gap-4 justify-between items-center mx-auto">
          <div className="flex flex-col items-center lg:items-start gap-1.5 shrink-0">
            <p className="text-xs text-gray-500 text-center lg:text-left">
              © {new Date().getFullYear()} PagelyPDF. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center text-sm text-gray-400 text-center">
            <div className="flex flex-row items-center gap-1.5">
              <span>Made with</span>
              <FaHeart className="text-pink-500 animate-pulse" />
              <span>by PagelyPDF</span>
            </div>
            <span className="text-gray-500 text-xs mt-0.5">
              simplifying your PDF workflow.
            </span>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-4 gap-y-2 shrink-0">
            <button
              onClick={() => setOpenTerms(true)}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={() => openFeedback()}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Feedback
            </button>
            <button
              onClick={() => setOpenContact(true)}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "PagelyPDF – Free PDF Tools",
                    text: "Check out PagelyPDF! Free online tools to merge, split, convert and protect PDF files.",
                    url: "https://pagelypdf.vercel.app",
                  });
                } else {
                  navigator.clipboard.writeText("https://pagelypdf.vercel.app");
                  alert("Link copied to clipboard!");
                }
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Share App
            </button>
          </div>
        </div>
      </footer>
      <ContactModal open={openContact} onClose={() => setOpenContact(false)} />
      <TermsModal open={openTerms} onClose={() => setOpenTerms(false)} />
    </>
  );
}
