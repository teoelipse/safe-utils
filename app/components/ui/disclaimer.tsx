"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Disclaimer({ 
  className, 
  children 
}: { 
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className={className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            Disclaimer
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-foreground">
          This is a fork of{" "}
          <a
            href="https://github.com/pcaversaccio/safe-tx-hashes-util"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @pcaversaccio
          </a>{" "}
          script that introduces an UI on top. This tool is intended to be used as playground and proof of concept and by
          any means it is ready for production use since it has not undergone any security assessment.
          <br /><br />
          While we tried to keep dependencies as minimal as possible, it is advised to always do your own research and{" "}
          <a 
            href="https://github.com/josepchetrit12/safe-tx-hashes-util"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            run the tool locally
          </a>{" "}
          whenever possible.
          <br /><br />
          OpenZeppelin doesn&apos;t take responsibility for any incident resulting from the use of this tool.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}