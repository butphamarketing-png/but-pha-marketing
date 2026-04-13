import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Case {
  id: string;
  title: string;
  before: string;
  after: string;
}

interface BeforeAfterSliderProps {
  cases?: Case[];
  beforeImage?: string; // fallback
  afterImage?: string;  // fallback
}

export function BeforeAfterSlider({ cases = [], beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Determine current images based on cases array or fallbacks
  const currentCase = cases.length > 0 ? cases[currentIndex] : null;
  const displayBefore = currentCase?.before || beforeImage;
  const displayAfter = currentCase?.after || afterImage;
  const displayTitle = currentCase?.title || "Sự Thay Đổi Kỳ Diệu";

  const updatePos = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging.current) updatePos(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { if (isDragging.current) updatePos(e.touches[0].clientX); };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const nextCase = () => {
    setCurrentIndex(prev => (prev + 1) % cases.length);
    setSliderPos(50);
  };

  const prevCase = () => {
    setCurrentIndex(prev => (prev - 1 + cases.length) % cases.length);
    setSliderPos(50);
  };

  return (
    <section data-section="before-after" id="before-after" className="py-20 px-4 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
        <div className="relative mb-12 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={displayTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-3xl font-black text-white md:text-4xl"
            >
              {displayTitle}
            </motion.h2>
          </AnimatePresence>
          <p className="mt-3 text-center text-lg text-gray-400">Trước Và Sau Khi Đồng Hành Cùng Chúng Tôi</p>
          
          {cases.length > 1 && (
            <div className="mt-6 flex items-center gap-4">
              <button onClick={prevCase} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {currentIndex + 1} / {cases.length}
              </span>
              <button onClick={nextCase} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="relative group">
          <div
            ref={containerRef}
            className="relative h-80 cursor-ew-resize select-none overflow-hidden rounded-3xl border border-white/10 bg-black/20 md:h-[450px] shadow-2xl shadow-purple-500/10"
            onMouseDown={() => { isDragging.current = true; }}
            onTouchStart={() => { isDragging.current = true; }}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* BEFORE side */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {displayBefore ? (
                    <img src={displayBefore} alt="Trước" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                      <div className="flex h-full flex-col items-center justify-center space-y-3 p-8 text-center opacity-70">
                        <div className="mx-auto h-12 w-32 rounded bg-gray-600" />
                        <div className="mx-auto h-3 w-48 rounded bg-gray-600" />
                        <div className="mx-auto h-3 w-36 rounded bg-gray-700" />
                        <div className="mx-auto h-20 w-full max-w-xs rounded bg-gray-700" />
                        <div className="mx-auto h-3 w-40 rounded bg-gray-600" />
                      </div>
                    </div>
                  )}
                  <div className="absolute left-6 top-6 z-10 rounded-full bg-red-500/90 px-4 py-1.5 text-xs font-black text-white shadow-lg">TRƯỚC</div>
                </div>

                {/* AFTER side — clipped from the LEFT to show on the RIGHT */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
                  style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                >
                  {displayAfter ? (
                    <img src={displayAfter} alt="Sau" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900" />
                      <div className="relative z-10 space-y-3 p-8 text-center">
                        <div className="mx-auto h-12 w-32 rounded-lg bg-purple-400/60 shadow-lg shadow-purple-500/30" />
                        <div className="mx-auto h-3 w-48 rounded-full bg-white/50" />
                        <div className="mx-auto h-3 w-36 rounded-full bg-white/40" />
                        <div className="mx-auto h-20 w-full max-w-xs rounded-xl bg-purple-500/30 shadow-xl" />
                        <div className="mx-auto flex justify-center gap-2">
                          <div className="h-8 w-20 rounded-full bg-purple-400/60" />
                          <div className="h-8 w-20 rounded-full bg-white/20" />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute right-6 top-6 z-10 rounded-full bg-purple-500/90 px-4 py-1.5 text-xs font-black text-white shadow-lg">SAU</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Divider */}
            <div className="absolute inset-y-0 z-20 flex items-center justify-center" style={{ left: `calc(${sliderPos}% - 2px)` }}>
              <div className="h-full w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-white/10 shadow-2xl backdrop-blur-md">
                <span className="select-none text-lg font-black text-white">⟺</span>
              </div>
            </div>
          </div>

          {/* Navigation Overlay (Mobile optimized) */}
          {cases.length > 1 && (
            <>
              <button 
                onClick={prevCase} 
                className="absolute -left-6 top-1/2 z-30 hidden -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 group-hover:left-4 transition-all md:flex"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextCase} 
                className="absolute -right-6 top-1/2 z-30 hidden -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all md:flex"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <span className="h-px w-8 bg-white/10"></span>
            Kéo thanh trượt để so sánh kết quả
            <span className="h-px w-8 bg-white/10"></span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

