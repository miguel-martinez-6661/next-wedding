import Image from "next/image";
import { RsvpForm } from "./form";
import { RsvpConfirmation } from "./confirmation";
import { Guest } from "@/types";

export const Rsvp = ({
  inviteCode,
  name,
  going,
  numberOfGuests,
  maxNumberOfGuests,
  qrCode,
  isConfirmed,
}: Guest) => {
  if (!inviteCode) {
    return <div>Lo sentimos, no se encontró el invitado</div>;
  }

  // If RSVP is already confirmed, show confirmation component
  if (isConfirmed && going !== null) {
    return (
      <div className="flex flex-col items-center justify-center relative px-6">
        <Image
          className="absolute -top-10 -left-40 opacity-40"
          src="/flower-2.png"
          alt="flower-1"
          width={500}
          height={500}
        />
        <RsvpConfirmation
          name={name}
          going={going}
          numberOfGuests={going ? numberOfGuests : 0}
          qrCode={qrCode}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden">
      <Image
        className="absolute -top-10 md:top-0 -left-40 opacity-40"
        src="/flower-2.png"
        alt="flower-1"
        width={500}
        height={500}
      />

      <div className="w-full py-12 md:py-24 px-6">
        <RsvpForm
          name={name}
          inviteCode={inviteCode}
          going={going}
          numberOfGuests={numberOfGuests}
          maxNumberOfGuests={maxNumberOfGuests}
          qrCode={qrCode}
        />
      </div>
    </div>
  );
};
