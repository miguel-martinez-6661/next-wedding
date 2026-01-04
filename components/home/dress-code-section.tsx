import Image from "next/image";

export function DressCodeSection() {
  return (
    <div className="gap-4 py-24 relative">
      {/* <Image
        src="/texture-1.jpg"
        alt="locations-section-background"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
      /> */}
      <div className="flex flex-col items-center justify-center z-10">
        <h1 className="font-ephesis text-center text-6xl">Dress Code</h1>
        <p className="text-center font-cormorant text-2xl">Formal</p>
        <div className="flex items-center justify-center gap-4 my-8">
          <Image
            src="/dress-coat.png"
            alt="dress-code-1"
            width={120}
            height={120}
            loading="lazy"
          />
          <Image
            src="/dress-icon.png"
            alt="dress-code-1"
            width={120}
            height={120}
            loading="lazy"
          />
        </div>
        <div className="font-cormorant rounded-lg p-4">
          <p className="text-lg text-center">Para ellas: Vestido largo.</p>
          <p className="text-lg text-center">Para ellos: Traje formal.</p>
        </div>
        <p className="text-lg text-center font-cormorant">
          Se reservan estos colores para uso exclusivo de los novios:
        </p>
        <div className="flex gap-4 font-cormorant mt-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-white shadow-md border-gray-200 rounded-full p-8"></div>
            <p className="text-lg text-center">Blanco</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-orange-100 shadow-md border-gray-200 rounded-full p-8"></div>
            <p className="text-lg text-center">Beige</p>
          </div>
        </div>
      </div>
    </div>
  );
}
