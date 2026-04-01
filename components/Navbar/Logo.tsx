import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center leading-none gap-1">
      {/* Icon */}
      <svg
        width="52"
        height="44"
        viewBox="0 0 52 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer glow ring */}
        <ellipse
          cx="26"
          cy="22"
          rx="24"
          ry="20"
          fill="url(#ringGrad)"
          opacity="0.15"
        />

        {/* Left page — dark blue */}
        <rect x="6" y="8" width="20" height="26" rx="3" fill="#1e3a8a" />
        <rect
          x="9"
          y="13"
          width="11"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="9"
          y="17"
          width="8"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="9"
          y="21"
          width="11"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.5"
        />

        {/* Right page — blue */}
        <rect x="14" y="5" width="20" height="26" rx="3" fill="#2563eb" />
        <rect
          x="17"
          y="10"
          width="11"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="17"
          y="14"
          width="8"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="17"
          y="18"
          width="11"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.5"
        />

        {/* Front red document */}
        <rect x="22" y="2" width="22" height="28" rx="3" fill="#dc2626" />
        {/* Folded corner */}
        <path d="M38 2 L44 8 H38 Z" fill="#b91c1c" />

        {/* PDF text */}
        <text
          x="33"
          y="17"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          letterSpacing="0.8"
        >
          PDF
        </text>
        <rect
          x="26"
          y="20"
          width="14"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect
          x="26"
          y="23"
          width="10"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect
          x="26"
          y="26"
          width="14"
          height="1.5"
          rx="1"
          fill="white"
          opacity="0.8"
        />

        {/* Bottom swoosh */}
        <path
          d="M8 38 Q26 46 44 38"
          stroke="url(#swooshGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        <defs>
          <linearGradient
            id="swooshGrad"
            x1="8"
            y1="38"
            x2="44"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient
            id="ringGrad"
            x1="0"
            y1="0"
            x2="52"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand name centered below icon */}
      <span className="text-[1.4rem] font-black tracking-wide leading-none">
        <span className="text-[#1e3a8a]">pagely</span>
        <span className="text-[#dc2626]">PDF</span>
      </span>
    </div>
  );
};

export default Logo;
