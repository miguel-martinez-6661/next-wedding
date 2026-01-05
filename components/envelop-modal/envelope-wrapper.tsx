"use client";

import { useState } from "react";
import { EnvelopeModal } from "./envelop-modal";
import { Guest } from "@/types";

interface EnvelopeWrapperProps {
  children: React.ReactNode;
  guest: Guest & { isConfirmed: boolean };
  skipIntro?: boolean;
}

export function EnvelopeWrapper({
  children,
  guest,
  skipIntro = false,
}: EnvelopeWrapperProps) {
  const [isOpen, setIsOpen] = useState(skipIntro);

  return (
    <>
      {!isOpen ? (
        <EnvelopeModal onOpen={() => setIsOpen(true)} guest={guest} />
      ) : (
        <>{children}</>
      )}
    </>
  );
}
