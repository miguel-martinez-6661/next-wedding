import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section/animated-section";

export const DetailsSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-10 relative">
      <AnimatedSection delay={0.3}>
        <h3 className="font-ephesis text-6xl mt-8 text-center">Itinerario</h3>
      </AnimatedSection>
      <Image
        src="/texture-1.jpg"
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
              <span className="font-serif text-xl">20:00hs</span>
              <h4 className="font-cormorant font-bold text-right">Ceremonia</h4>
              {/* <p className="text-xs md:text-sm">Parroquia San Cristobal</p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://maps.app.goo.gl/bkiWZh3Ykf9Pcbum7"
                target="_blank"
              >
                <span className="text-xs md:text-sm">Ubicación</span>
                <MapPinIcon className="w-4 h-4 text-gray-400" />
              </Link> */}
            </div>
            <div className="mx-8 w-2 h-2 bg-green-900 rounded-full z-10" />
            <div className="flex-1">
              <Image
                src="/church-icon.png"
                alt="icon-3"
                width={100}
                height={100}
                className="motion-safe:animate-bounce"
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
                className="animate-bounce"
              />
            </div>
            <div className="mx-8 w-2 h-2 bg-green-900 rounded-full z-10" />
            <div className="flex-1 flex flex-col items-start">
              <span className="font-serif text-xl">21:00hs</span>
              <h4 className="font-cormorant text-sm md:text-base">Recepción</h4>
              {/* <p className="text-xs md:text-sm">
                Jardines de la Sede Social de Jubilados Bancarios
              </p>
              <p className="text-xs md:text-sm">
                Av. Sta. Teresa, Asunción 001402
              </p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://maps.app.goo.gl/nkeUtWwcTbWFKe5N8"
                target="_blank"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs md:text-sm">Ubicación</span>
              </Link> */}
            </div>
          </div>
        </AnimatedSection>

        {/* Row 3 */}
        <AnimatedSection delay={0.5} direction="right">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex flex-col items-end">
              <span className="font-serif text-xl">22:00hs</span>
              <h4 className="font-cormorant text-sm md:text-lg">Boda Civil</h4>
              {/* <p className="text-xs md:text-sm text-right">
                Salon principal de la Sede Social de Jubilados Bancarios
              </p>
              <p className="text-xs md:text-sm text-right">
                Av. Sta. Teresa, Asunción 001402
              </p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://maps.app.goo.gl/5o51t8W8H4Q5bB9u6"
                target="_blank"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs md:text-sm">Ubicación</span>
              </Link> */}
            </div>
            <div className="mx-8 w-2 h-2 bg-green-900 rounded-full z-10" />
            <div className="flex-1">
              <Image
                src="/ring-icon.png"
                alt="icon-3"
                width={100}
                height={100}
                className="animate-bounce"
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
                className="animate-bounce"
              />
            </div>
            <div className="mx-8 w-2 h-2 bg-green-900 rounded-full z-10" />
            <div className="flex-1 flex flex-col items-start">
              <span className="font-serif text-xl">22:30hs</span>
              <h4 className="font-cormorant text-sm md:text-base">
                Celebración
              </h4>
              {/* <p className="text-xs md:text-sm">
                Salon principal de la Sede Social de Jubilados Bancarios
              </p>
              <p className="text-xs md:text-sm">
                Av. Sta. Teresa, Asunción 001402
              </p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://maps.app.goo.gl/5o51t8W8H4Q5bB9u6"
                target="_blank"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs md:text-sm">Ubicación</span>
              </Link> */}
            </div>
          </div>
        </AnimatedSection>

        {/* Divider vertical */}
        <div className="absolute w-[1px] bg-gray-200 top-4 bottom-4 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};
