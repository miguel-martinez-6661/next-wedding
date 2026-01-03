"use client";

import { Guest } from "@/types";
import { useRef, useEffect } from "react";
import { AnimatedSection } from "../animated-section/animated-section";

interface EnvelopeModalProps {
  onOpen: () => void;
  guest: Guest;
}

export function EnvelopeModal({ onOpen, guest }: EnvelopeModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }

    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, []);

  const handleClick = async () => {
    // If video is playing, skip to end and trigger content reveal
    if (videoRef.current && !videoRef.current.ended) {
      videoRef.current.currentTime = videoRef.current.duration;
    } else {
      // If video hasn't started or already ended, start music and show content
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
      onOpen();
    }
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video error:", e);
    // If video fails to load, just show content
    handleClick();
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
        <video
          ref={videoRef}
          src="/intro-mobile.mp4"
          className="w-full h-full object-cover bg-white block md:hidden"
          autoPlay
          muted
          playsInline
          onError={handleVideoError}
          onClick={handleClick}
        />
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="w-full h-full object-cover bg-white md:block hidden"
          autoPlay
          muted
          playsInline
          onError={handleVideoError}
          onClick={handleClick}
        />

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
