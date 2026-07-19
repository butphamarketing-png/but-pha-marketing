/**
 * Lớp nền deep — ảnh city + lưới tím nhẹ.
 * Không amber glow / pulse.
 */
export function DeepTechAtmosphere({
  imageSrc = "/about/about-city-bg-deep.png?v=tech-land",
  intensity = "default",
}: {
  imageSrc?: string;
  intensity?: "default" | "soft" | "strong";
}) {
  const imgOpacity = intensity === "strong" ? 0.28 : intensity === "soft" ? 0.14 : 0.2;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        style={{ opacity: imgOpacity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(14,16,24,0.82) 0%, rgba(8,9,12,0.72) 45%, rgba(10,9,20,0.88) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,124,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(139,124,246,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(109,90,230,0.1), transparent 58%), radial-gradient(ellipse 40% 35% at 90% 15%, rgba(139,124,246,0.07), transparent 55%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090c] to-transparent" />
    </div>
  );
}
