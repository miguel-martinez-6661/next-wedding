"use client";

import { useState } from "react";
import { EnvelopeModal } from "./envelop-modal";
import { Guest } from "@/types";

interface EnvelopeWrapperProps {
  children: React.ReactNode;
  guest: Guest & { isConfirmed: boolean };
}

export function EnvelopeWrapper({ children, guest }: EnvelopeWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

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
