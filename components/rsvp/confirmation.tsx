"use client";

import Image from "next/image";
import { CheckCircleIcon, Download, FrownIcon } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "../ui/button";

type ConfirmationProps = {
  name: string;
  going: boolean;
  numberOfGuests: number;
  qrCode: string;
};

export const RsvpConfirmation = ({
  name,
  going,
  numberOfGuests,
  qrCode,
}: ConfirmationProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const moreThanOneGuest = numberOfGuests > 1;

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    bodyClass: "print-page",
    onPrintError: (error) => {
      console.error("Error al imprimir:", error);
    },
  });

  return (
    <div className="flex flex-col w-full gap-8 items-center justify-center py-24 z-20">
      <h2 className="text-6xl text-center mb-2 font-ephesis">
        ¡Gracias por confirmar!
      </h2>
      {going ? (
        <>
          <div
            ref={componentRef}
            className="flex flex-col h-full items-center justify-center gap-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <CheckCircleIcon className="w-20 h-20 text-green-400" />
            </div>
            <p className="text-xl font-cormorant text-center">
              ¡Estamos muy felices de que{" "}
              {moreThanOneGuest ? "puedan" : "puedas"} acompañarnos,{" "}
              <span className="font-bold">{name}</span>!
            </p>
            <p className="text-lg font-cormorant text-gray-700 text-center">
              Has confirmado asistencia para{" "}
              <span className="font-bold text-2xl">{`${numberOfGuests} `}</span>
              <span>{numberOfGuests === 1 ? "persona" : "personas"}</span>.
            </p>
            <p className="text-lg font-cormorant text-gray-700 mt-4 text-center">
              ¡Te esperamos con mucha ilusión!
            </p>
            <Image
              src={qrCode}
              alt="qr-code"
              width={200}
              height={200}
              className="mt-8"
            />
            <p className="font-cormorant text-lg text-gray-700 mt-4 text-center">
              Presentar este QR en la recepción para ingresar a la boda.
            </p>
          </div>

          <Button
            type="button"
            className="flex items-center gap-2 text-sm group-hover:opacity-80 transition mt-4 cursor-pointer"
            onClick={handlePrint}
          >
            <Download className="w-8 h-8" />
            <span>Descargar QR</span>
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4">
            <FrownIcon className="w-20 h-20 text-orange-100" />
          </div>
          <p className="text-lg font-cormorant mt-4 text-center">
            Lamentamos que no puedas/n acompañarnos,{" "}
            <span className="font-bold">{name}</span>.
          </p>
          <p className="text-lg font-cormorant text-center">
            Entendemos completamente y agradecemos nos lo hayan hecho saber.
          </p>
          <p className="text-lg font-cormorant text-center">
            Esperamos vernos en otra ocasión.
          </p>
        </>
      )}
    </div>
  );
};
