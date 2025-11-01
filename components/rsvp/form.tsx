"use client";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { submitRsvp } from "@/lib/actions";
import { toast } from "sonner";

type RsvpFormProps = {
  inviteCode?: string;
  going: boolean | null;
  numberOfGuests: number;
  maxNumberOfGuests: number;
};

export const RsvpForm = ({
  inviteCode = "default",
  going = false,
  numberOfGuests,
  maxNumberOfGuests,
}: RsvpFormProps) => {
  const [isGoing, setIsGoing] = useState<boolean | null>(going);
  const [guests, setGuests] = useState<number>(numberOfGuests);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGuestChange = (value: string) => {
    setGuests(Number(value));
  };

  const handleGoingChange = (value: boolean | null) => {
    setIsGoing(value);
  };

  const handleSubmit = async () => {
    // Validation
    if (isGoing === null) {
      toast.error("Por favor, indica si asistirás o no");
      return;
    }

    if (isGoing && guests < 1) {
      toast.error("Por favor, indica el número de invitados");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitRsvp({
        inviteCode,
        going: isGoing,
        numberOfGuests: isGoing ? guests : 0,
      });

      if (result.success) {
        toast.success("¡Asistencia confirmada! Gracias por responder.");
      } else {
        toast.error(result.error || "Error al enviar la confirmación");
      }
    } catch (error) {
      toast.error("Error inesperado. Por favor, intenta de nuevo.");
      console.error("RSVP submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 items-center">
      <h2 className="text-xl text-center font-cormorant">Por favor</h2>
      <h2 className="text-6xl text-center mb-8 font-allura">
        Confirmar Asistencia
      </h2>
      <div className="flex flex-col border-1 border-gray-200 bg-white/50 rounded-lg w-full md:w-2/3 p-4 z-20">
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-cormorant font-bold">Asistirás?</Label>
          <div className="flex w-full space-x-2 text-gray-600">
            <Button
              variant="outline"
              className={`w-1/2 ${
                isGoing === true
                  ? "bg-primary text-primary-foreground border-primary"
                  : ""
              }`}
              onClick={() => handleGoingChange(true)}
            >
              Si, asistiré
            </Button>
            <Button
              variant="outline"
              className={`w-1/2 ${
                isGoing === false
                  ? "bg-primary text-primary-foreground border-primary"
                  : ""
              }`}
              onClick={() => handleGoingChange(false)}
            >
              No asistiré
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-1 border-gray-200 bg-white/50 rounded-lg w-full md:w-2/3 p-4 z-20">
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-cormorant font-bold">
            Cuantas personas irán?
          </Label>
          <Select value={guests.toString()} onValueChange={handleGuestChange}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Indicar cuantas personas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: maxNumberOfGuests }, (_, i) => i + 1).map(
                  (num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {`${num} ${num === 1 ? "persona" : "personas"}`}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="w-full font-cormorant font-bold md:w-2/3 mt-4 z-10 h-12"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
      </Button>
    </div>
  );
};
