"use client";

import { Guest } from "@/types";
import { useRef, useEffect } from "react";
import { AnimatedSection } from "../animated-section/animated-section";

interface EnvelopeModalProps {
  onOpen: () => void;
  guest: Guest;
}

export function EnvelopeModal({ onOpen, guest }: EnvelopeModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  const handleClick = () => {
    // If video is playing, skip to end and trigger content reveal
    if (videoRef.current && !videoRef.current.ended) {
      videoRef.current.currentTime = videoRef.current.duration;
    } else {
      onOpen();
    }
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video error:", e);
    // If video fails to load, just show content
    onOpen();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-ephesis flex flex-col items-center justify-center gap-6">
          <AnimatedSection delay={0.2}>
            <p className="text-2xl md:text-3xl text-center text-gray-500">
              Con mucha alegría invitamos a:
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="text-3xl md:text-5xl text-center max-w-[250px]">
              {guest.name}
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-[25%] md:bottom-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-ephesis flex flex-col items-center justify-center gap-6">
          <p className="text-xl md:text-3xl text-center">
            Válido para:{" "}
            <span>
              {guest.maxNumberOfGuests}{" "}
              {guest.maxNumberOfGuests === 1 ? "persona" : "personas"}
            </span>
          </p>
        </div>
        <video
          ref={videoRef}
          className="w-full h-full object-cover bg-white"
          autoPlay
          muted
          playsInline
          preload="auto"
          onError={handleVideoError}
          onClick={handleClick}
        >
          <source src="/intro-mobile.mp4" media="(max-width: 767px)" />
          <source src="/intro.mp4" media="(min-width: 768px)" />
        </video>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center cursor-pointer z-10"
          onClick={handleClick}
        >
          <p className="font-ephesis text-2xl md:text-3xl text-white/90 animate-pulse">
            Haz clic para continuar
          </p>
        </div>
      </div>
    </div>
  );
}
