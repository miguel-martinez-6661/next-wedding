import Image from "next/image";
import { RsvpForm } from "./form";
import { Guest } from "@/types";

export const Rsvp = ({
  inviteCode,
  name,
  going,
  numberOfGuests,
  maxNumberOfGuests,
}: Guest) => {
  if (!inviteCode) {
    return <div>Lo sentimos, no se encontró el invitado</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center relative px-4">
      <Image
        className="absolute -top-10 -left-40 opacity-40"
        src="/flower-2.png"
        alt="flower-1"
        width={500}
        height={500}
      />
      <RsvpForm
        name={name}
        inviteCode={inviteCode}
        going={going}
        numberOfGuests={numberOfGuests}
        maxNumberOfGuests={maxNumberOfGuests}
      />
    </div>
  );
};
