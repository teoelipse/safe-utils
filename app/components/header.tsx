import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between p-5">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">Safe Hash Preview</span>
        </Link>

        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/how-it-works">How It Works</Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/josepchetrit12/safe-tx-hashes-util"
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
    </header>
  );
}
