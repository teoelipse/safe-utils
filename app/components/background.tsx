"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const Background = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Only run on client side
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Default to light mode before client-side rendering
  const isDark = mounted ? resolvedTheme === "dark" : false

  return (
    <div className={`fixed inset-0 -z-10 ${isDark ? 'bg-[#101015]' : 'bg-white'} overflow-hidden`}>
      <svg
        className="absolute bottom-0 left-0 w-full h-1/2"
        viewBox="0 0 1710 782"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_5_1437)">
          <path
            d="M-340.621 704.919C-646.587 616.289 -683.998 847.065 -582.906 1023.25C-481.815 1199.44 167.843 1653.85 600.39 1977.84C1141.07 2382.82 1835.7 2167.67 2398.46 1785.81C2961.22 1403.96 2259.89 617.969 2161.74 549.349C2071.49 486.251 1801.83 632.313 1501.76 801.277C964.078 1104.03 41.8352 815.706 -340.621 704.919Z"
            fill="#7F8DFF"
            className={isDark ? 'opacity-100' : 'opacity-[0.15]'}
          />
        </g>
        <defs>
          <filter
            id="filter0_f_5_1437"
            x="-1167.3"
            y="0.207336"
            width="4316.31"
            height="2729.7"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="267.076" result="effect1_foregroundBlur_5_1437" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export default Background

