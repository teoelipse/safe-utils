"use client"

import type React from "react"
import { useTheme } from "next-themes"

const Background: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={`fixed inset-0 w-full h-full ${
      isDark ? 'bg-gradient-main-dark' : 'bg-gradient-main'
    }`} />
  )
}

export default Background

