import {
  CheckCircleIcon,
  FrownIcon,
} from "lucide-react";

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
  const moreThanOneGuest = numberOfGuests > 1;
  return (
    <div className="flex flex-col w-full gap-8 items-center justify-center py-24 z-20">
      <h2 className="text-6xl text-center mb-2 font-ephesis">
        ¡Gracias por confirmar!
      </h2>

      {going ? (
        <>
          <div className="flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-20 h-20 text-green-400" />
          </div>
          <p className="text-xl font-cormorant text-center">
            ¡Estamos muy felices de que {moreThanOneGuest ? "puedan" : "puedas"}{" "}
            acompañarnos, <span className="font-bold">{name}</span>!
          </p>
          <p className="text-lg font-cormorant text-gray-700 text-center">
            Has confirmado asistencia para{" "}
            <span className="font-bold text-2xl">{`${numberOfGuests} `}</span>
            <span>{numberOfGuests === 1 ? "persona" : "personas"}</span>.
          </p>
          <p className="text-lg font-cormorant text-gray-700 mt-4 text-center">
            ¡Te esperamos con mucha ilusión!
          </p>
          <img src={qrCode} alt="qr-code" width={200} height={200} />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4">
            <FrownIcon className="w-20 h-20 text-gray-400" />
          </div>
          <p className="text-xl font-cormorant text-center">
            Lamentamos que no puedas acompañarnos,{" "}
            <span className="font-bold">{name}</span>.
          </p>
          <p className="text-lg font-cormorant text-gray-700 mt-4 text-center">
            Tu presencia será extrañada, pero entendemos completamente.
          </p>
          <p className="text-lg font-cormorant text-gray-700 text-center">
            ¡Esperamos verte pronto en otra ocasión!
          </p>
        </>
      )}
    </div>
  );
};
