"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownSectionProps {
  targetDate: Date;
}

export function CountdownSection({ targetDate }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="mx-auto py-12 md:py-24">
      <div className="relative text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl md:text-3xl tracking-[0.3em] font-cormorant mb-2">
            NOS VEMOS EN
          </h1>
        </div>

        {/* Countdown */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
          <div className="flex space-x-4">
            <TimeUnit value={timeLeft.days} label="DIAS" />
            <Separator className="hidden md:block" />
            <TimeUnit value={timeLeft.hours} label="HORAS" />
          </div>
          <Separator className="hidden md:block" />
          <div className="flex">
            <TimeUnit value={timeLeft.minutes} label="MINUTOS" />
            <Separator />
            <TimeUnit value={timeLeft.seconds} label="SEGUNDOS" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl md:text-8xl font-serif text-[#3d2f2a] tabular-nums leading-none mb-4">
        {formatNumber(value)}
      </div>
      <div className="text-sm md:text-base tracking-[0.2em] font-serif text-[#3d2f2a]">
        {label}
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-6xl md:text-8xl font-serif text-[#3d2f2a] leading-none mb-8",
        className
      )}
    >
      :
    </div>
  );
}
