"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CopyButton({
  value,
  className,
  ...props
}: {
  value: string
} & ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn(
            "h-8 w-8 rounded-md",
            className
          )}
          onClick={() => {
            navigator.clipboard.writeText(value)
            setHasCopied(true)
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <CheckIcon className="h-4 w-4" /> : <ClipboardIcon className="h-4 w-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied!" : "Copy"}
      </TooltipContent>
    </Tooltip>
  )
}