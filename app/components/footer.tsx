import React from "react";
import { Separator } from "@/components/ui/separator";
import { Code2, Building2, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-0 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left p-5 flex items-center gap-2 flex-wrap justify-center md:justify-start">
          Developed with <Heart className="h-4 w-4 fill-current text-red-500" /> by{" "}
          <a
            href="https://www.openzeppelin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 inline-flex items-center gap-1"
          >
            OpenZeppelin
            <ExternalLink className="h-3 w-3" />
          </a>
          . Subject to our{" "}
          <a
            href="https://www.openzeppelin.com/tos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 inline-flex items-center gap-1"
          >
          Terms of Service
          </a>
          
          . <Code2 className="h-4 w-4" /> Script by{" "}
          <a
            href="https://x.com/pcaversaccio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 inline-flex items-center gap-1"
          >
            pcaversaccio
            <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>
      </div>
      <Separator className="mt-6" />
    </footer>
  );
}
