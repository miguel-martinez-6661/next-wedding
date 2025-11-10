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
import { LocationsSection } from "@/components/home/locations-section";

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
    <div className="w-full min-h-screen bg-gray-50/50">
      <main className="max-w-6xl mx-auto overflow-hidden pb-24 bg-white">
        <BannerSection imgSrc="/bg-0.jpg" y={30} className="-mt-14 md:-mt-40" />
        <HeroSection />
        <BannerSection imgSrc="/image.png" />
        <DateSection targetDate={new Date("2026-02-07T20:00:00")} />
        <BannerSection imgSrc="/image.png" />
        <AnimatedSection delay={0.2}>
          <LocationsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <DetailsSection />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <DressCodeSection />
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
        <ClosingSection />
      </main>
    </div>
  );
}
