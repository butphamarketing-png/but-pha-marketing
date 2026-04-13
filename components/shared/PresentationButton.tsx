import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Power } from "lucide-react";
import { DecisionTreeQuiz } from "./DecisionTreeQuiz";

export function PresentationButton() {
  const [isActive, setIsActive] = useState(false);
  const [showOffButton, setShowOffButton] = useState(false);

  const startPresentation = () => {
    setIsActive(true);
    setShowOffButton(true);
    sessionStorage.setItem('presentationMode', 'true');
    sessionStorage.setItem('showQuiz', 'true');
    
    // Scroll to audit section
    const auditSection = document.querySelector('[data-section="audit"]');
    if (auditSection) {
      auditSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stopPresentation = () => {
    setIsActive(false);
    setShowOffButton(false);
    sessionStorage.removeItem('presentationMode');
    sessionStorage.removeItem('showQuiz');
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-scroll to pricing section when quiz is completed
  useEffect(() => {
    const handleQuizComplete = () => {
      if (isActive) {
        setTimeout(() => {
          const pricingSection = document.querySelector('[data-section="pricing"]');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 1000);
      }
    };

    window.addEventListener('quizCompleted', handleQuizComplete);
    return () => window.removeEventListener('quizCompleted', handleQuizComplete);
  }, [isActive]);

  return (
    <>
      <motion.button
        onClick={startPresentation}
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

      {/* Off Button - appears when presentation is active */}
      <AnimatePresence>
        {showOffButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={stopPresentation}
            className="fixed bottom-24 right-20 z-[79] flex h-10 w-10 items-center justify-center rounded-full shadow-lg bg-red-600 hover:bg-red-700 transition-all"
            title="Dừng thuyết trình"
          >
            <Power size={16} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
