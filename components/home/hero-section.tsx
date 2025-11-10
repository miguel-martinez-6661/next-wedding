import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section/animated-section";
import { SectionContainer } from "@/components/section-container/section-container";

export function HeroSection() {
  return (
    <SectionContainer className="z-0 overflow-hidden">
      <Image
        className="absolute -bottom-10 -left-40 opacity-40 w-[320px] h-[480px] md:w-[600px] md:h-[800px] object-contain"
        src="/flower-2.png"
        alt="flower-1"
        width={600}
        height={800}
      />
      <Image
        className="absolute -top-30 -right-40 opacity-90 rotate-180 w-[320px] h-[480px] md:w-[600px] md:h-[800px]"
        src="/flower-1.png"
        alt="flower-1"
        width={600}
        height={800}
        objectFit="contain"
      />
      <div className="flex flex-col items-center z-10 md:scale-200">
        <AnimatedSection delay={0.2} direction="down" className="mb-8">
          <span className="font-ephesis text-4xl">Nuestra Boda</span>
        </AnimatedSection>
        <div className="flex flex-col items-center gap-4">
          <AnimatedSection delay={0.45} direction="left">
            <span className="font-cormorant font-thin text-gray-900 no-underline text-6xl tracking-tighter">
              Miguel
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.55} scale={true}>
            <span className="font-ephesis text-gray-900 no-underline text-6xl">
              &
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.65} direction="right">
            <span className="font-cormorant font-thin text-gray-900 no-underline text-6xl tracking-tighter">
              Romina
            </span>
          </AnimatedSection>
        </div>
      </div>
    </SectionContainer>
  );
}

