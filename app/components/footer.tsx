import React from 'react';
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <a href="https://x.com/josepchetrit12" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">josepchetrit</a> using scripts from <a href="https://x.com/pcaversaccio" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">pcaversaccio</a>.
        </p>
      </div>
      <Separator className="mt-6" />
    </footer>
  );
}