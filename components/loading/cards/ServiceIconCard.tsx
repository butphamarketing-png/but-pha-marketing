import Image from "next/image";

export type ServiceIconConfig = {
  label: string;
  icon: string;
  accentClass: string;
  glowClass: string;
  featured?: boolean;
};

export function ServiceIconCard({ label, icon, accentClass, glowClass, featured }: ServiceIconConfig) {
  const size = featured ? "h-[108px] w-[108px] sm:h-[120px] sm:w-[120px]" : "h-[92px] w-[92px] sm:h-[104px] sm:w-[104px]";
  const iconSize = featured ? "h-[72px] w-[72px] sm:h-[80px] sm:w-[80px]" : "h-[60px] w-[60px] sm:h-[68px] sm:w-[68px]";

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${glowClass}`}
        style={{ opacity: featured ? 0.55 : 0.4 }}
      />

      <div
        className={`relative flex items-center justify-center rounded-full bg-white/95 p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/70 ${size}`}
      >
        <div className={`relative ${iconSize}`}>
          <Image src={icon} alt={label} fill className="object-contain" sizes="120px" priority />
        </div>
        <div className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br ${accentClass} opacity-[0.08]`} />
      </div>

      <p
        className={`mt-4 text-center font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] ${
          featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
