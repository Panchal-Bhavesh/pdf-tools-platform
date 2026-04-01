"use client";
import { FaHeart } from "react-icons/fa";
import ContactModal from "./ContactModal";
import TermsModal from "./TermsModal";
import { useState } from "react";

export default function Footer() {
  const [openContact, setOpenContact] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#0B0F1A] border-t border-white/10 mt-24">
        <div className="container py-10 flex flex-col md:flex-row gap-4 justify-between items-center mx-auto">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PagelyPDF. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <FaHeart className="text-pink-500 animate-pulse" />
            <span>by PagelyPDF — simplifying your PDF workflow.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenTerms(true)}
              className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => setOpenContact(true)}
              className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </footer>
      <ContactModal open={openContact} onClose={() => setOpenContact(false)} />
      <TermsModal open={openTerms} onClose={() => setOpenTerms(false)} />
    </>
  );
}
