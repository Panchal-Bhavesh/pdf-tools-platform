import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center leading-none gap-2">
      {/* Logo Image */}
      <Image
        src="/logo.png"
        alt="PagelyPDF"
        width={80}
        height={80}
        priority
        className="h-14 w-14 object-contain"
      />
      {/* Brand name */}
      <span className="text-[1.4rem] font-black tracking-wide leading-none">
        <span className="text-[#0c3e78]">Pagely</span>
        <span className="text-[#dc2626]">PDF</span>
      </span>
    </div>
  );
};

export default Logo;
