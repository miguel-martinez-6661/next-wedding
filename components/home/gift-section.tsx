import Link from "next/link";
import { Button } from "../ui/button";
import { GiftIcon, CreditCard } from "lucide-react";
import Image from "next/image";
import { CopyToClipboard } from "../copy-to-clipboard/copy-to-clipboard";

interface GiftSectionProps {
  rsvpCode?: string;
}

export const GiftSection = ({ rsvpCode }: GiftSectionProps) => {
  return (
    <div
      id="gift-section"
      className="w-full flex flex-col items-center justify-center mt-12 md:mt-24 gap-8 md:gap-12 relative  px-4 md:px-0"
    >
      <Image
        src="/flower-1.png"
        alt="flower-4"
        width={300}
        height={300}
        className="absolute top-0 right-0 z-0 opacity-50 hidden md:block"
      />
      <Image
        src="/flower-4.png"
        alt="flower-1"
        width={400}
        height={400}
        className="absolute top-0 -left-10 z-0 opacity-30"
      />
      <h1 className="font-ephesis text-center text-5xl md:text-6xl">Regalos</h1>
      <div className="font-cormorant text-lg md:text-xl text-center w-full max-w-2xl space-y-2">
        <p>
          Lo mas importante para nosotros es que nos acompañes en este día tan
          especial.
        </p>
        <p>
          Pero si deseas dejarnos un detalle, te invitamos a ver nuestra lista
          de regalos.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-4xl">
        {/* Bank Account Card */}
        <div className="flex flex-col shadow-md p-6 md:p-8 w-full md:w-auto border border-gray-200 items-center bg-white z-10 rounded-3xl min-w-[280px] h-[220px]">
          <CreditCard className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mb-4" />
          <h3 className="font-ephesis text-3xl md:text-4xl text-[#37414c] mb-4">
            Transferencia
          </h3>
          <Button
            variant="outline"
            size="lg"
            className="w-full mt-2 bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer font-cormorant"
            asChild
          >
            <CopyToClipboard title="Copiar alias" text="4693042-6" />
          </Button>
        </div>

        {/* Gift List Card */}
        <div className="flex flex-col shadow-md p-6 md:p-8 w-full md:w-auto border border-gray-200 items-center bg-white z-10 rounded-3xl min-w-[280px] h-[220px]">
          <GiftIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mb-4" />
          <h3 className="font-ephesis text-3xl md:text-4xl text-[#37414c] mb-4">
            Lista de Regalos
          </h3>
          <Button
            variant="outline"
            size="lg"
            className="w-full mt-2 bg-black text-white transition-colors cursor-pointer font-cormorant"
            asChild
          >
            <Link
              href={rsvpCode ? `/gift-list?rsvp=${rsvpCode}` : "/gift-list"}
            >
              Ver lista
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
