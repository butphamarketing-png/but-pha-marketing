import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { DecisionTreeQuiz } from "./DecisionTreeQuiz";

export function PresentationButton() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setShowQuiz(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-24 right-4 z-[79] flex h-12 w-12 items-center justify-center rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all group"
        title="Thuyết trình: Chuẩn đoán marketing"
      >
        <div className="relative">
          <Play size={20} className="text-white fill-white" />
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500"
            animate={{ 
              scale: [1, 1.5], 
              opacity: [1, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            style={{ zIndex: -1 }}
          />
        </div>
        
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: -5 }}
          className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium whitespace-nowrap pointer-events-none"
        >
          Thuyết trình
        </motion.div>
      </motion.button>

      <DecisionTreeQuiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
    </>
  );
}
