export const SectionContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center justify-center relative p-8 h-[450px] md:h-[920px] ${className}`}>
      {children}
    </div>
  );
};
