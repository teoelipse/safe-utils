import { ShareIcon } from "lucide-react";
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast";
import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ShareButtonProps extends ButtonProps {
  url: string;
}

export function ShareButton({ className, url,  ...props }: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share Link',
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share it with others!",
        duration: 2000,
      });
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleShare}
          className={cn(
            "h-8 w-8 rounded-md",
            className
          )}
          aria-label="Share"
          {...props}
        >
          <ShareIcon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Share this link
      </TooltipContent>
    </Tooltip>
  );
}
