import { CountdownSection } from "@/components/countdown-section/countdown-section";
import { Rsvp } from "@/components/rsvp/rsvp";
import { SectionContainer } from "@/components/section-container/section-container";
import SnippedSection from "@/components/sniped-section/sniped-section";
import { AnimatedSection } from "@/components/animated-section/animated-section";
import { getInviteByCode } from "@/lib/invite";
import { MessageCircleWarningIcon } from "lucide-react";
import Image from "next/image";
import { DetailsSection } from "@/components/details-section/details-section";
import { AudioPlayer } from "@/components/audio-player/audio-player";

export default async function Home({
  searchParams,
}: {
  searchParams: { rsvp: string };
}) {
  const rsvpId = (await searchParams)?.rsvp;
  const guest = await getInviteByCode(rsvpId);
  // const rsvpId = "1234567890";
  // const guest = {
  //   inviteCode: "1234567890",
  //   name: "Miguel",
  //   going: true,
  //   numberOfGuests: 1,
  //   maxNumberOfGuests: 100,
  // };

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
    <div className="w-full min-h-screen bg-gray-50/50">
      <main className="max-w-6xl mx-auto overflow-hidden pb-24 bg-white">
        <SectionContainer className="relative w-full h-full md:h-full">
          <AnimatedSection
            delay={0.3}
            className="z-10 md:scale-150 py-0 md:py-8 px-4"
          >
            <div className="flex flex-col -space-y-2 md:-space-y-4">
              <AnimatedSection
                delay={0.1}
                direction="right"
                className="inline-block"
              >
                <span className="font-cormorant text-2xl">ESTAS</span>
              </AnimatedSection>
              <AnimatedSection
                delay={0.2}
                direction="left"
                className="inline-block ml-16 md:ml-20"
              >
                <span className="font-ephesis text-5xl">cordialmente</span>
              </AnimatedSection>
              <AnimatedSection
                delay={0.3}
                direction="right"
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

        {/* Banner 2 */}
        <AnimatedSection delay={0.2} className="relative z-10 -mx-1 md:-mx-3">
          <SnippedSection imgSrc="/image.png" />
        </AnimatedSection>

        {/* Invite details 2*/}
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
              <CountdownSection targetDate={new Date("2026-02-07T20:00:00")} />
            </AnimatedSection>
          </div>
        </SectionContainer>

        {/* Banner 3 */}
        <AnimatedSection delay={0.2} className="relative z-10 -mx-1 md:-mx-3">
          <SnippedSection imgSrc="/image.png" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <DetailsSection />
        </AnimatedSection>

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
          {/* <Image
            className="absolute bottom-20 -left-40 opacity-80"
            src="/flower-1.png"
            alt="flower-1"
            width={500}
            height={500}
          /> */}
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
      </main>
    </div>
  );
}
