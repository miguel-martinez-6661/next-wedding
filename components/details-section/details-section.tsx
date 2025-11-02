import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section/animated-section";
import Link from "next/link";
import { MapPinIcon } from "lucide-react";

export const DetailsSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center my-10">
      <AnimatedSection delay={0.2}>
        <h3 className="font-ephesis text-6xl mt-8 text-center">Itinerario</h3>
      </AnimatedSection>
      <div className="md:w-full relative z-20 space-y-16 my-8 py-8">
        {/* Row 1 */}
        <AnimatedSection delay={0.3} direction="right">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex flex-col items-end">
              <span className="font-serif text-xl">20:00hs</span>
              <h4 className="font-cormorant font-bold text-right">Ceremonia</h4>
              <p className="text-xs md:text-sm">Parroquia San Cristobal</p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://www.google.com/maps/dir/-25.2425416,-57.5433627/PC2P%2BVGF+Parroquia+San+Crist%C3%B3bal,+Denis+Roa,+Asunci%C3%B3n/@-25.2695322,-57.5943718,17296m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x945da8b74d1fc95f:0xd194ed7cd0014f2d!2m2!1d-57.5637016!2d-25.2978001?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
                target="_blank"
              >
                <span className="text-xs md:text-sm">Ubicación</span>
                <MapPinIcon className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
            <div className="mx-8" />
            <div className="flex-1">
              <Image
                src="/church-icon.png"
                alt="icon-3"
                width={80}
                height={80}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Row 2 */}
        <AnimatedSection delay={0.4} direction="left">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex justify-end">
              <Image src="/arch-icon.png" alt="icon-3" width={80} height={80} />
            </div>
            <div className="mx-8" />
            <div className="flex-1 flex flex-col items-start">
              <span className="font-serif text-xl">21:00hs</span>
              <h4 className="font-cormorant text-sm md:text-base">Recepción</h4>
              <p className="text-xs md:text-sm">
                Sede Social de Jubilados Bancarios
              </p>
              <p className="text-xs md:text-sm">
                Av. Sta. Teresa, Asunción 001402
              </p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://maps.app.goo.gl/oB6Q6Rp23Pq7L7oC7"
                target="_blank"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs md:text-sm">Ubicación</span>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Row 3 */}
        <AnimatedSection delay={0.5} direction="right">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex flex-col items-end">
              <span className="font-serif text-xl">22:00hs</span>
              <h4 className="font-cormorant text-sm md:text-lg">Boda Civil</h4>
              <p className="text-xs md:text-sm text-right">
                Sede Social de Jubilados Bancarios
              </p>
              <p className="text-xs md:text-sm text-right">
                Av. Sta. Teresa, Asunción 001402
              </p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://maps.app.goo.gl/oB6Q6Rp23Pq7L7oC7"
                target="_blank"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs md:text-sm">Ubicación</span>
              </Link>
            </div>
            <div className="mx-8" />
            <div className="flex-1">
              <Image src="/ring-icon.png" alt="icon-3" width={80} height={80} />
            </div>
          </div>
        </AnimatedSection>

        {/* Row 4 */}
        <AnimatedSection delay={0.6} direction="left">
          <div className="flex items-center justify-center">
            <div className="flex-1 flex justify-end">
              <Image src="/wine-icon.png" alt="icon-3" width={80} height={80} />
            </div>
            <div className="mx-8" />
            <div className="flex-1 flex flex-col items-start">
              <span className="font-serif text-xl">22:30hs</span>
              <h4 className="font-cormorant text-sm md:text-base">
                Celebración
              </h4>
              <p className="text-xs md:text-sm">
                Sede Social de Jubilados Bancarios
              </p>
              <p className="text-xs md:text-sm">
                Av. Sta. Teresa, Asunción 001402
              </p>
              <Link
                className="flex items-center gap-2 border p-2 border-gray-600 rounded-sm mt-2"
                href="https://maps.app.goo.gl/oB6Q6Rp23Pq7L7oC7"
                target="_blank"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs md:text-sm">Ubicación</span>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Divider vertical */}
        <div className="absolute w-[1px] bg-gray-200 top-4 bottom-4 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};
