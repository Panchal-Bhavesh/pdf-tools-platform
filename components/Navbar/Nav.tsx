"use client";
import { navLinks } from "@/constant/constant";
import Link from "next/link";
import Logo from "./Logo";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import ToolsDropdown from "../ToolsDropDown";

type props = {
  openNav: () => void;
};

const Nav = ({ openNav }: props) => {
  const [navbg, setNavbg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 10) setNavbg(true);
      else setNavbg(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white ${
        navbg ? "shadow-md" : ""
      }`}
    >
      <div className="container h-24 mx-auto flex items-center px-0">
        <Link href="/">
          <Logo />
        </Link>
        <div className="ml-auto flex items-center">
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              return (
                <Link
                  href={link.url}
                  key={link.id}
                  className="text-black text-xl hover:text-blue-800 font-semibold transition-all duration-200"
                >
                  <p> {link.lable}</p>
                </Link>
              );
            })}
            <ToolsDropdown />
          </nav>
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-black lg:hidden"
          />
        </div>
      </div>
    </header>
  );
};

export default Nav;
