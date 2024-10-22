import React from "react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="py-0 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left p-5">
          Built by{" "}
          <a
            href="https://x.com/josepchetrit12"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            jchetrit.eth
          </a>{" "}
          and{" "}
          <a
            href="https://x.com/xaler2"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            xaler.eth
          </a>{" "}
          from{" "}
          <a
            href="https://www.openzeppelin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            OpenZeppelin
          </a>
          . Script by{" "}
          <a
            href="https://x.com/pcaversaccio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            pcaversaccio
          </a>
          .
        </p>
      </div>
      <Separator className="mt-6" />
    </footer>
  );
}
