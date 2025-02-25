"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { BookOpen, Github } from "lucide-react";
import dynamic from 'next/dynamic';

// Import the logo with no SSR
const OZLogo = dynamic(() => import('@/components/ui/oz-logo').then(mod => mod.OZLogo), {
  ssr: false
});

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-5">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <OZLogo />
          </Link>
        </div>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/how-it-works" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">How it works</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a
              href="https://github.com/openzeppelin/safe-utils"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
