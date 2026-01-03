import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export const LocationsSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12 md:py-24">
      <div className="flex flex-col shadow-md p-8 md:p-12 mx-4 md:mx-0 border border-gray-200 items-center bg-white z-10 rounded-4xl">
        <h3 className="font-ephesis text-4xl md:text-5xl text-[#37414c] text-center">
          Ceremonia Religiosa
        </h3>
        <p className="text-xl text-gray-500 font-thin">18:00hs</p>
        <div className="flex flex-col gap-4 pt-6 items-center text-center">
          <p className="font-cormorant">Parroquia San Cristóbal</p>
          <p className="font-thin">
            Del Maestro y Denis Roa - Asunción, Paraguay
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-4 bg-black text-white cursor-pointer"
          asChild
        >
          <Link
            href="https://maps.app.goo.gl/xTxAruEQweDLxhWt5"
            target="_blank"
          >
            <span className="">Ver en el mapa</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col shadow-md p-8 md:p-12 mx-4 md:mx-0 border border-gray-200 items-center bg-white z-10 rounded-4xl">
        <h3 className="font-ephesis text-4xl md:text-5xl text-[#37414c]">
          Recepción
        </h3>
        <p className="text-xl text-gray-500 font-thin">19:00hs</p>
        <div className="flex flex-col gap-4 pt-6 items-center text-center">
          <p className="font-cormorant">Sede Social de Jubilados Bancarios</p>
          <p className="font-thin">Av. Sta. Teresa - Asunción, Paraguay</p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="w-full mt-4 bg-black text-white cursor-pointer"
          asChild
        >
          <Link
            href="https://maps.app.goo.gl/J5cq1yT37XNX3fUM8"
            target="_blank"
          >
            <span className="">Ver en el mapa</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
