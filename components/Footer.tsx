"use client";
import { FaHeart } from "react-icons/fa";
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
      <footer className="w-full bg-[#0B0F1A] border-t border-white/10 mt-24">
        <div className="container py-8 sm:py-10 flex flex-col lg:flex-row gap-5 lg:gap-4 justify-between items-center mx-auto">
          <p className="text-sm text-gray-400 text-center lg:text-left shrink-0">
            © {new Date().getFullYear()} PagelyPDF. All rights reserved.
          </p>

          <div className="flex flex-col items-center text-sm text-gray-400 text-center">
            <div className="flex flex-row items-center gap-1">
              <span>Made with</span>
              <FaHeart className="text-pink-500 animate-pulse" />
              <span>by PagelyPDF</span>
            </div>
            <span>simplifying your PDF workflow.</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 shrink-0 lg:justify-end">
            <button
              onClick={() => setOpenTerms(true)}
              className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={() => openFeedback()}
              className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
            >
              Feedback
            </button>
            <button
              onClick={() => setOpenContact(true)}
              className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
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
              className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
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
