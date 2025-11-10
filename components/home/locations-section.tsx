import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export const LocationsSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 -mt-32 pb-24 pt-64 px-4 relative">
      <Image
        src="/texture-3.jpg"
        alt="locations-section-background"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      />
      <div className="flex flex-col border shadow-md p-12 items-center bg-white z-10">
        <h3 className="font-ephesis text-5xl text-[#37414c]">Ceremonia</h3>
        <p className="text-xl text-gray-500 font-thin">20:30hs</p>
        <div className="flex flex-col gap-4 pt-6 items-center text-center">
          <p className="font-cormorant">Parroquia San Cristóbal</p>
          <p className="font-thin">
            Del Maestro y Denis Roa - Asunción, Paraguay
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-4 bg-[#37414c] text-white cursor-pointer"
          asChild
        >
          <span className="">Ver en el mapa</span>
        </Button>
      </div>

      <div className="flex flex-col border shadow-md p-12 items-center bg-white z-10">
        <h3 className="font-ephesis text-5xl text-[#37414c]">Recepción</h3>
        <p className="text-xl text-gray-500 font-thin">21:00hs</p>
        <div className="flex flex-col gap-4 pt-6 items-center text-center">
          <p className="font-cormorant">Sede Social de Jubilados Bancarios</p>
          <p className="font-thin">Av. Sta. Teresa - Asunción, Paraguay</p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-4 bg-[#37414c] text-white cursor-pointer"
          asChild
        >
          <span className="">Ver en el mapa</span>
        </Button>
      </div>
    </div>
  );
};
