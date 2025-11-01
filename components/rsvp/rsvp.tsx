import Image from "next/image";
import { RsvpForm } from "./form";
import { Guest } from "@/types";

export const Rsvp = ({
  inviteCode,
  going,
  numberOfGuests,
  maxNumberOfGuests,
}: Guest) => {
  if (!inviteCode || !going || !numberOfGuests || !maxNumberOfGuests) {
    return <div>Lo sentimos, no se encontró el invitado</div>;
  }

  console.log({ inviteCode, going, numberOfGuests, maxNumberOfGuests });

  return (
    <div className="flex flex-col items-center justify-center relative p-4">
      <Image
        className="absolute -top-10 -left-40 opacity-40"
        src="/flower-2.png"
        alt="flower-1"
        width={500}
        height={500}
      />
      <RsvpForm
        going={going}
        numberOfGuests={numberOfGuests}
        maxNumberOfGuests={maxNumberOfGuests}
      />
    </div>
  );
};
