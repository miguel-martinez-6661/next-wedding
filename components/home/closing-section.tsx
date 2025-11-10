import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section/animated-section";
import { AudioPlayer } from "@/components/audio-player/audio-player";
import { SectionContainer } from "@/components/section-container/section-container";

export function ClosingSection() {
  return (
    <SectionContainer>
      <Image
        className="absolute -bottom-50 -right-40 opacity-80"
        src="/flower-2.png"
        alt="flower-1"
        width={500}
        height={500}
      />
      <div className="flex flex-col items-center z-10 md:scale-150">
        <AnimatedSection delay={0.2} direction="right">
          <p className="font-cormorant text-xl mb-4 text-center">
            ¡Estamos deseando verte en nuestra boda!
          </p>
        </AnimatedSection>
        <div className="flex flex-row -ml-2 items-center">
          <AnimatedSection delay={0.5} direction="right">
            <Image
              src="/logo-mr.png"
              alt="logo-mr"
              width={240}
              height={240}
              className="object-contain scale-150 animate-pulse"
            />
          </AnimatedSection>
        </div>
      </div>

      <AudioPlayer />
    </SectionContainer>
  );
}

