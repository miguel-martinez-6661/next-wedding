import { AnimatedSection } from "@/components/animated-section/animated-section";
import { BannerSection } from "@/components/home/banner-section";
import { ClosingSection } from "@/components/home/closing-section";
import { DateSection } from "@/components/home/date-section";
import { HeroSection } from "@/components/home/hero-section";
import { Rsvp } from "@/components/rsvp/rsvp";
import { getInviteByCode } from "@/lib/invite";
import { MessageCircleWarningIcon } from "lucide-react";
import { DetailsSection } from "@/components/details-section/details-section";
import { DressCodeSection } from "@/components/home/dress-code-section";
import { EnvelopeWrapper } from "@/components/envelop-modal/envelope-wrapper";

export default async function Home({
  searchParams,
}: {
  searchParams: { rsvp: string };
}) {
  const rsvpId = (await searchParams)?.rsvp || "";
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

  const content = (
    <div className="w-full min-h-screen bg-gray-50/50">
      <main className="max-w-6xl mx-auto overflow-hidden bg-white">
        <BannerSection
          imgSrc="https://img.smartslides.com/gal/aws/4k/2x/199826/fd3329cc581aca2cf53cdeb50508e1/da41649f165656a5de3c.jpg"
          // y={30}
          className="-mt-14 md:-mt-40"
        />
        <HeroSection />
        <BannerSection imgSrc="https://img.smartslides.com/gal/aws/4k/2x/199826/374353ef08a78837150a75971b5c93/951c4406b179801f4ed8.jpg" />
        <DateSection targetDate={new Date("2026-02-07T20:00:00")} />
        <BannerSection imgSrc="https://img.smartslides.com/gal/aws/4k/2x/199826/2908c5a22e47bdad21f60aaab1c26b/6f29f436ec6398b6e189.jpg" />

        <AnimatedSection delay={0.2}>
          <DetailsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <DressCodeSection />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Rsvp
            inviteCode={guest.inviteCode}
            name={guest.name}
            going={guest.going}
            numberOfGuests={guest.numberOfGuests}
            maxNumberOfGuests={guest.maxNumberOfGuests}
            qrCode={guest.qrCode}
            isConfirmed={guest.isConfirmed}
          />
        </AnimatedSection>
        <ClosingSection />
      </main>
    </div>
  );

  return <EnvelopeWrapper guest={guest}>{content}</EnvelopeWrapper>;
}
