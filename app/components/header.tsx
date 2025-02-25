"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { BookOpen, Github } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-5">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg hidden sm:inline">Safe Hash Preview</span>
            <span className="font-bold text-lg sm:hidden">SHP</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                Tools
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuItem className={pathname === "/" ? "bg-secondary" : ""}>
                <Link href="/" className="flex w-full">
                  Safe Preview Hash
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className={pathname === "/sign-message" ? "bg-secondary" : ""}>
                <Link href="/sign-message" className="flex w-full">
                  Sign Message
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="flex items-center space-x-2">
          <Button variant="ghost"  asChild>
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
