import { useState } from "react";
import { Volume2, Square } from "lucide-react";

export function AudioGuide({ text, color }: { text: string; color?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // clear previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button 
      onClick={toggleSpeak}
      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${isPlaying ? "border-primary bg-primary/20 text-primary" : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"}`}
    >
      {isPlaying ? <Square size={12} className="fill-current" /> : <Volume2 size={12} />}
      🎵 Nghe tư vấn
    </button>
  );
}

