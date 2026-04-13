import { useState, useEffect, useRef } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const toggleMusic = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (isPlaying) {
      audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      audioCtxRef.current.resume();
      if (!oscillatorRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gainNode = audioCtxRef.current.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, audioCtxRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);
        
        // Simple ambient modulation
        setInterval(() => {
          if (audioCtxRef.current) {
            osc.frequency.setTargetAtTime(
              220 + Math.random() * 20, 
              audioCtxRef.current.currentTime, 
              0.5
            );
          }
        }, 2000);

        osc.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);
        osc.start();
        oscillatorRef.current = osc;
      }
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="absolute -top-10 right-0 hidden whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-sm group-hover:block">
        Nhạc nền thư giãn
      </div>
      <button
        onClick={toggleMusic}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/40 text-purple-200 shadow-[0_0_15px_rgba(107,33,168,0.5)] backdrop-blur-md transition-transform hover:scale-110"
      >
        {isPlaying ? (
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="flex items-center gap-[2px]"
          >
            <div className="h-3 w-1 animate-pulse bg-purple-300" style={{ animationDelay: "0ms" }} />
            <div className="h-5 w-1 animate-pulse bg-purple-300" style={{ animationDelay: "150ms" }} />
            <div className="h-4 w-1 animate-pulse bg-purple-300" style={{ animationDelay: "300ms" }} />
          </motion.div>
        ) : (
          <Music size={20} />
        )}
      </button>
    </div>
  );
}

