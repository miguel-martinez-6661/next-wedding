"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Clipboard, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const CopyToClipboard = ({
  title,
  text,
  redirect,
  className,
}: {
  title: string;
  text: string;
  redirect?: string;
  className?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Copiado al portapapeles");
    if (redirect) {
      router.push(redirect);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn(
        "w-full font-cormorant bg-black text-white mt-auto",
        className
      )}
      onClick={handleCopy}
    >
      {isCopied ? "Copiado" : title}
      {!redirect ? (
        <Clipboard className="w-4 h-4 ml-2" />
      ) : (
        <ExternalLink className="w-4 h-4 ml-2" />
      )}
    </Button>
  );
};
