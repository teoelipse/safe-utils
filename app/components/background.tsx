"use client"

import { useTheme } from "next-themes"

export default function Background() {
  const { theme } = useTheme()

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${theme === "dark" ? "bg-[#101015]" : "bg-white"}`}>
      <svg
        className="absolute bottom-0 left-0 w-full h-1/2"
        viewBox="0 0 1710 782"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_5_1061)">
          <path
            d="M-340.621 705.215C-646.587 616.495 -683.998 847.505 -582.906 1023.87C-481.815 1200.24 167.843 1655.11 600.391 1979.43C1141.07 2384.82 1835.7 2169.45 2398.46 1787.21C2961.22 1404.96 2259.89 618.177 2161.74 549.487C2071.49 486.325 1801.83 632.535 1501.76 801.671C964.078 1104.73 41.8353 816.115 -340.621 705.215Z"
            fill="#7F8DFF"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_5_1061"
            x="-1167.3"
            y="0.330078"
            width="4316.31"
            height="2731.39"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="267.076" result="effect1_foregroundBlur_5_1061" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

