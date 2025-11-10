import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section/animated-section";
import { CountdownSection } from "@/components/countdown-section/countdown-section";
import { SectionContainer } from "@/components/section-container/section-container";

type DateSectionProps = {
  targetDate: Date;
};

export function DateSection({ targetDate }: DateSectionProps) {
  return (
    <SectionContainer className="h-full py-24 md:py-[580px]">
      <Image
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[420px] md:w-[800px] md:h-[1000px] object-contain z-10 opacity-50"
        src="/flower-2.png"
        alt="flower-2"
        width={800}
        height={1000}
      />
      <div className="flex flex-col items-center z-10 w-full md:scale-250">
        <div className="flex items-center justify-center gap-6 w-full">
          <AnimatedSection delay={0.2} direction="right">
            <span className="text-xl border-y-2 border-black p-1 px-6">
              SABADO
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.35} scale={true}>
            <span className="text-8xl">7</span>
          </AnimatedSection>
          <AnimatedSection delay={0.5} direction="left">
            <span className="text-xl border-y-2 border-black p-1 px-6">
              FEBRERO
            </span>
          </AnimatedSection>
        </div>
        <AnimatedSection
          delay={0.3}
          className="flex flex-col align-center justify-center w-full px-8"
        >
          <CountdownSection targetDate={targetDate} />
        </AnimatedSection>
      </div>
    </SectionContainer>
  );
}

