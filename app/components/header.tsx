import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/josepchetrit/safe-hash-calculator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}