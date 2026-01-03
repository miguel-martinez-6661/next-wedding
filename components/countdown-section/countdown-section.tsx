"use client";

import { useEffect, useState } from "react";

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

  // const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="relative w-full">
      <div className="relative text-center">
        <div className="my-6">
          {/* <h1 className="text-sm font-cormorant my-2 font-bold">¡PREPARATE!</h1> */}
          <h1 className="text-4xl font-ephesis my-2">Nos vemos dentro de</h1>
        </div>

        {/* Countdown */}
        <div className="flex justify-center items-center gap-1 md:gap-2 mb-8">
          <TimeUnit value={timeLeft.days} label="DIAS" />
          <Separator />
          <TimeUnit value={timeLeft.hours} label="HORAS" />
          <Separator />
          <TimeUnit value={timeLeft.minutes} label="MINUTOS" />
          <Separator />
          <TimeUnit value={timeLeft.seconds} label="SEGUNDOS" />
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-serif tabular-nums leading-none mb-4">
        {formatNumber(value)}
      </div>
      <div className="text-xs font-serif">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-3xl md:text-4xl font-serif leading-none mb-8">:</div>
  );
}
