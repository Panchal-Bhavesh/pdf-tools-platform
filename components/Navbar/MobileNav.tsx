import { navLinks } from "@/constant/constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";
import MobileToolsDropdown from "../MobileToolsDropDown";

type props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: props) => {
  const navopen = showNav ? "translate-x-0" : "translate-x-full";
  return (
    <header>
      <div
        className={`${navopen} fixed inset-0 transform transition-all duration-300 z-1002 bg-black opacity-70 w-full h-screen `}
      ></div>
      <nav
        className={`${navopen} text-white top-0 right-0 fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[80%] md:w-[60%] bg-blue-900 space-y-6 z-1050`}
      >
        {navLinks.map((link) => {
          return (
            <Link href={link.url} key={link.id} onClick={closeNav}>
              <p className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
                {link.lable}
              </p>
            </Link>
          );
        })}
        <MobileToolsDropdown closeNav={closeNav} />
        <CgClose
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"
        />
      </nav>
    </header>
  );
};

export default MobileNav;
