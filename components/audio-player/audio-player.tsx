"use client";

import { useEffect, useRef } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // If already played, don't set up listeners
    if (hasPlayedRef.current) return;

    // Listen for various user interactions
    const interactionEvents = ["click", "touchstart", "keydown", "scroll"];

    // Function to attempt playing audio
    const playAudio = async () => {
      if (audioRef.current && !hasPlayedRef.current) {
        hasPlayedRef.current = true;
        try {
          await audioRef.current.play();
        } catch (error) {
          // Ignore autoplay errors - user can still play manually
          console.error("Error playing audio:", error);
          hasPlayedRef.current = false; // Reset so we can try again
        }
      }
    };

    const handleInteraction = () => {
      playAudio();
    };

    // Add event listeners (once: true means they auto-remove after firing)
    interactionEvents.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    // Cleanup
    return () => {
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white/70 rounded-full shadow-lg p-2 flex items-center justify-center border border-gray-200">
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        controls
        playsInline
        className="w-40"
        style={{ minWidth: 140, background: "transparent" }}
      />
    </div>
  );
}
