import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section/animated-section";
import { AudioPlayer } from "@/components/audio-player/audio-player";
import { SectionContainer } from "@/components/section-container/section-container";

export function ClosingSection() {
  return (
    <SectionContainer>
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
        src="https://img.smartslides.com/gal/aws/4k/2x/199826/507fc92c0abb96ba2b633280a3da40/ed21968118d22f32b069.jpg?width=1680&height=1050&sharp_amount=65&sharp_radius=1"
        alt="flower-1"
        width={1000}
        height={1000}
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
              className="object-contain scale-150"
            />
          </AnimatedSection>
        </div>
      </div>

      <AudioPlayer />
    </SectionContainer>
  );
}
