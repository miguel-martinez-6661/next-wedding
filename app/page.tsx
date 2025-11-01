import { CountdownSection } from "@/components/countdown-section/countdown-section";
import { Rsvp } from "@/components/rsvp/rsvp";
import { SectionContainer } from "@/components/section-container/section-container";
import SnippedSection from "@/components/sniped-section/sniped-section";
import { AnimatedSection } from "@/components/animated-section/animated-section";
import { getInviteByCode } from "@/lib/invite";
import { MessageCircleWarningIcon } from "lucide-react";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { rsvp: string };
}) {
  const rsvpId = (await searchParams)?.rsvp;
  const guest = await getInviteByCode(rsvpId);

  if (!rsvpId || !guest.inviteCode) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="border border-gray-300 rounded-lg p-4 mx-2 space-y-4">
          <MessageCircleWarningIcon className="w-10 h-10 text-gray-500 mx-auto" />
          <h2 className="text-2xl font-cormorant text-center">
            No se encontro invitación
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <main className="max-w-6xl mx-auto overflow-hidden pb-24">
        <SectionContainer className="w-full h-full md:h-full">
          <Image
            className="absolute -top-10 -right-40 opacity-40 w-[320px] h-[480px] md:w-[600px] md:h-[800px] object-contain"
            src="/flower-2.png"
            alt="flower-1"
            width={600}
            height={800}
          />
          <AnimatedSection
            delay={0.3}
            className="z-10 md:scale-150 py-6 md:py-24 px-4"
          >
            <div className="flex flex-col -space-y-1 md:-space-y-4">
              <AnimatedSection delay={0.1} className="inline-block">
                <span className="font-cormorant text-2xl">ESTAS</span>
              </AnimatedSection>
              <AnimatedSection
                delay={0.2}
                className="inline-block ml-16 md:ml-20"
              >
                <span className="font-allura text-5xl">cordialmente</span>
              </AnimatedSection>
              <AnimatedSection
                delay={0.3}
                className="inline-block ml-54 md:ml-[280]"
              >
                <span className="font-cormorant text-2xl">INVITADO</span>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* Banner 1 */}
        <AnimatedSection delay={0.2} className="relative z-10 -mx-1 md:-mx-3">
          <SnippedSection imgSrc="/bg-0.jpg" />
        </AnimatedSection>

        {/* Invite details */}
        <SectionContainer>
          <Image
            className="absolute -bottom-10 -left-40 opacity-40 w-[320px] h-[480px] md:w-[600px] md:h-[800px] object-contain"
            src="/flower-2.png"
            alt="flower-1"
            width={600}
            height={800}
          />
          <Image
            className="absolute -top-30 -right-40 opacity-90 rotate-180 w-[320px] h-[480px] md:w-[600px] md:h-[800px] z-10"
            src="/flower-1.png"
            alt="flower-1"
            width={600}
            height={800}
            objectFit="contain"
          />
          <div className="flex flex-col items-center z-10 md:scale-200">
            <AnimatedSection delay={0.2}>
              <span className="font-cormorant text-xl mb-2">La boda de</span>
            </AnimatedSection>
            <div className="flex flex-col items-center gap-4">
              <AnimatedSection delay={0.35}>
                <span className="font-serif text-gray-900 no-underline text-6xl font-bold">
                  Miguel
                </span>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <span className="font-allura text-gray-900 no-underline text-6xl">
                  &
                </span>
              </AnimatedSection>
              <AnimatedSection delay={0.65}>
                <span className="font-cormorant text-gray-900 no-underline text-6xl font-bold">
                  Romina
                </span>
              </AnimatedSection>
            </div>
          </div>
        </SectionContainer>

        {/* Banner 2 */}
        <AnimatedSection delay={0.2} className="relative z-10 -mx-1 md:-mx-3">
          <SnippedSection imgSrc="/image.png" />
        </AnimatedSection>

        {/* Invite details 2*/}
        <SectionContainer className="h-full py-24">
          <Image
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[380px] md:w-[700px] md:h-[900px] object-contain z-10"
            src="/flower-2.png"
            alt="flower-2"
            width={600}
            height={800}
          />
          <div className="flex flex-col items-center z-10 w-full md:scale-250">
            <div className="flex items-center justify-center gap-6 w-full">
              <AnimatedSection delay={0.2}>
                <span className="text-xl border-y-2 border-black p-1 px-6">
                  SABADO
                </span>
              </AnimatedSection>
              <AnimatedSection delay={0.35} scale={true}>
                <span className="text-8xl">7</span>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <span className="text-xl border-y-2 border-black p-1 px-6">
                  FEBRERO
                </span>
              </AnimatedSection>
            </div>
            <div className="flex flex-col items-center gap-4 mt-8">
              <AnimatedSection delay={0.65}>
                <span className="text-lg font-light">
                  Parroquia San Cristobal
                </span>
              </AnimatedSection>
              <AnimatedSection delay={0.8}>
                <span className="text-lg font-light">20:00Hs</span>
              </AnimatedSection>
            </div>
          </div>
        </SectionContainer>

        {/* Banner 3 */}
        <AnimatedSection delay={0.2} className="relative z-10 -mx-1 md:-mx-3">
          <SnippedSection imgSrc="/image.png" />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <CountdownSection targetDate={new Date("2026-02-07T20:00:00")} />
        </AnimatedSection>

        <SectionContainer className="h-full">
          <Image
            className="absolute -top-50 -left-40 opacity-80 z-0"
            src="/flower-3.png"
            alt="flower-1"
            width={500}
            height={500}
          />
          <Image
            className="absolute top-1/2 -right-40 opacity-80 z-0"
            src="/flower-1.png"
            alt="flower-1"
            width={500}
            height={500}
          />
          <div className="flex flex-col items-center z-10">
            <AnimatedSection delay={0.2}>
              <span className="font-cormorant font-bold text-3xl mt-8">
                Detalles
              </span>
            </AnimatedSection>
            <div className="flex flex-col gap-6 mt-4">
              <AnimatedSection delay={0.35}>
                <p className="font-allura text-4xl md:text-6xl">Recepción</p>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <p className="font-thin md:text-xl max-w-xl font-mono">
                  La ceremonia religiosa se llevará a cabo en la Parroquia San
                  Cristobal, seguida de una recepción en el Salón de Eventos El
                  Roble. Se ruega puntualidad y vestimenta formal.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.65}>
                <p className="font-allura text-4xl md:text-6xl">Celebración</p>
              </AnimatedSection>
              <AnimatedSection delay={0.8}>
                <p className="font-thin md:text-xl max-w-xl font-mono">
                  Después de la ceremonia, los invitados están cordialmente
                  invitados a una celebración con cena, música en vivo y baile
                  en el Salón de Eventos El Roble. ¡Esperamos compartir este
                  momento especial con ustedes!
                </p>
              </AnimatedSection>
            </div>
          </div>
        </SectionContainer>

        <AnimatedSection delay={0.3}>
          <Rsvp
            inviteCode={guest.inviteCode}
            name={guest.name}
            going={guest.going}
            numberOfGuests={guest.numberOfGuests}
            maxNumberOfGuests={guest.maxNumberOfGuests}
          />
        </AnimatedSection>

        <SectionContainer>
          <Image
            className="absolute -bottom-50 -right-40 opacity-80"
            src="/flower-2.png"
            alt="flower-1"
            width={500}
            height={500}
          />
          <Image
            className="absolute bottom-20 -left-40 opacity-80"
            src="/flower-1.png"
            alt="flower-1"
            width={500}
            height={500}
          />
          <div className="flex flex-col items-center z-10 md:scale-150">
            <AnimatedSection delay={0.2}>
              <p className="font-cormorant text-xl mb-4 text-center">
                ¡Estamos deseando verte en nuestra boda!
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.35}>
              <p className="font-cormorant text-xl mb-4 text-center">
                ¡Creemos recuerdos juntos!
              </p>
            </AnimatedSection>
            <div className="flex flex-row mt-12 -ml-2">
              <AnimatedSection delay={0.5}>
                <span className="font-allura text-6xl">M</span>
              </AnimatedSection>
              <AnimatedSection delay={0.7}>
                <span className="font-allura text-6xl">R</span>
              </AnimatedSection>
            </div>
          </div>
        </SectionContainer>
      </main>
    </div>
  );
}
