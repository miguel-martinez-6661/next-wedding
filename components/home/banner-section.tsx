import { AnimatedSection } from "@/components/animated-section/animated-section";
import SnippedSection from "@/components/sniped-section/sniped-section";

type BannerSectionProps = {
  imgSrc: string;
  delay?: number;
  className?: string;
  y?: number;
};

export function BannerSection({
  imgSrc,
  delay = 0.2,
  className,
  y,
}: BannerSectionProps) {
  const baseClassName = "relative z-10 -mx-1 md:-mx-3";
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <AnimatedSection delay={delay} className={combinedClassName}>
      <SnippedSection imgSrc={imgSrc} y={y} />
    </AnimatedSection>
  );
}

