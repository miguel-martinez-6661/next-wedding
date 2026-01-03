import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section/animated-section";
import { LocationsSection } from "../home/locations-section";

export const DetailsSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center relative -mt-32 pt-32">
      <AnimatedSection delay={0.2}>
        <LocationsSection />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <h3 className="font-ephesis text-6xl mt-8 text-center">Itinerario</h3>
      </AnimatedSection>
      <img
        src="https://img.smartslides.com/gal/aws/4k/2x/199826/38e87abb5cba20b77edf2a8d0f8b98/e799b77405d0979f26c2.jpg?width=1680&height=1050&sharp_amount=65&sharp_radius=1"
        alt="locations-section-background"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
      />
      <div className="w-full relative z-20 space-y-16 my-8 py-8">
        {/* Row 1 */}
        <AnimatedSection delay={0.3} direction="right">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex flex-col items-end">
              <span className="font-serif text-xl">18:00hs</span>
              <h4 className="font-cormorant text-right">Ceremonia Religiosa</h4>
            </div>
            <div className="mx-8 w-2 h-2 bg-black rounded-full z-10" />
            <div className="flex-1">
              <Image
                src="/church-icon.png"
                alt="icon-3"
                width={100}
                height={100}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Row 2 */}
        <AnimatedSection delay={0.4} direction="left">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex justify-end">
              <Image
                src="/arch-icon.png"
                alt="icon-3"
                width={100}
                height={100}
              />
            </div>
            <div className="mx-8 w-2 h-2 bg-black rounded-full z-10" />
            <div className="flex-1 flex flex-col items-start">
              <span className="font-serif text-xl">19:00hs</span>
              <h4 className="font-cormorant text-sm md:text-base">Recepción</h4>
            </div>
          </div>
        </AnimatedSection>

        {/* Row 3 */}
        <AnimatedSection delay={0.5} direction="right">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex flex-col items-end">
              <span className="font-serif text-xl">19:30hs</span>
              <h4 className="font-cormorant text-sm md:text-lg">Boda Civil</h4>
            </div>
            <div className="mx-8 w-2 h-2 bg-black rounded-full z-10" />
            <div className="flex-1">
              <Image
                src="/ring-icon.png"
                alt="icon-3"
                width={100}
                height={100}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Row 4 */}
        <AnimatedSection delay={0.6} direction="left">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex justify-end">
              <Image
                src="/wine-icon.png"
                alt="icon-3"
                width={100}
                height={100}
              />
            </div>
            <div className="mx-8 w-2 h-2 bg-black rounded-full z-10" />
            <div className="flex-1 flex flex-col items-start">
              <span className="font-serif text-xl">20:00hs</span>
              <h4 className="font-cormorant text-sm md:text-base">
                Celebración
              </h4>
            </div>
          </div>
        </AnimatedSection>

        {/* Divider vertical */}
        <div className="absolute w-[0.5px] bg-black/50 top-4 bottom-4 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};
