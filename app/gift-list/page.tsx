import { AnimatedSection } from "@/components/animated-section/animated-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GiftIcon, ExternalLink, Clipboard } from "lucide-react";
import { CopyToClipboard } from "@/components/copy-to-clipboard/copy-to-clipboard";
import Image from "next/image";

interface Vendor {
  name: string;
  clipboard?: string;
  link: string;
  logo: string;
  action: string;
}

const vendors: Vendor[] = [
  {
    name: "Tupi",
    link: "https://www.tupi.com.py/regalos_en_lista/9022/Boda-de-Romina-Cristaldo-y-Miguel-Martinez-el-07-02-2026",
    logo: "https://www.tupi.com.py/assets/images/logo-2021.png",
    action: "Ver lista de regalos",
  },
  {
    name: "Olier",
    link: "https://www.olier.com.py/lista-bodas/ver/722",
    logo: "https://www.olier.com.py/assets_front/images/logo.svg",
    action: "Ver lista de regalos",
  },
    {
      name: "Amazon Gift",
      clipboard: "mmartinez6661@gmail.com",
      link: "https://www.amazon.com/Amazon-eGift-Card-Orange-Animated/dp/B004LLIKVU?th=1",
      logo: "https://m.media-amazon.com/images/G/01/GiftCards/2025/Q4/VX-2825/Flyout_Nav_SendEGC_US-EN.png",
      action: "Copiar Info y Enviar e-gift",
    },
];

export default async function GiftListPage({
  searchParams,
}: {
  searchParams: Promise<{ rsvp?: string }>;
}) {
  const params = await searchParams;
  const rsvpCode = params?.rsvp || "";

  return (
    <div className="w-full h-screen min-h-screen bg-gray-50/50">
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16 bg-white h-full">
        {/* Header */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="font-cormorant"
              asChild
            >
              <Link
                href={
                  rsvpCode
                    ? `/?rsvp=${rsvpCode}&showContent=true#gift-section`
                    : "/"
                }
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="text-center mb-12 relative">
            <h1 className="font-ephesis text-5xl md:text-6xl text-[#37414c] mb-4 relative z-10">
              Lista de Regalos
            </h1>
            <p className="font-cormorant text-lg md:text-xl text-gray-700 max-w-2xl mx-auto relative z-10">
              Lo más importante para nosotros es que nos acompañes en este día
              tan especial. Pero si deseas dejarnos un detalle, aquí está
              nuestra lista de regalos.
            </p>
          </div>
        </AnimatedSection>

        {/* Vendor Gift Lists */}
        {vendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            {vendors.map((vendor, index) => (
              <AnimatedSection key={index} delay={1} direction="up">
                <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4 h-full">
                    <Image
                      src={vendor.logo}
                      alt={vendor.name}
                      width={100}
                      height={100}
                    />
                    <h3 className="font-ephesis text-3xl md:text-4xl text-[#37414c]">
                      {vendor.name}
                    </h3>
                  </div>
                  {vendor.clipboard ? (
                    <CopyToClipboard
                      title={vendor.action}
                      text={vendor.clipboard}
                      redirect={vendor.link}
                    />
                  ) : (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full font-cormorant bg-black text-white mt-auto"
                      asChild
                    >
                      <Link
                        href={vendor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver lista de regalos
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
