"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import canvasConfetti from "canvas-confetti";

interface ChaosScreenProps {
  onComplete: () => void;
}

export default function ChaosScreen({ onComplete }: ChaosScreenProps) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);

    // Vibration/Shake effect
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

    // Confetti explosion
    const end = Date.now() + 3000;
    const colors = ["#ff0000", "#ffffff", "#ff69b4"];

    (function frame() {
      canvasConfetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      canvasConfetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Transition after chaos
    setTimeout(onComplete, 4000);
  };

  return (
    <div
      className={`h-screen w-full flex items-center justify-center bg-black transition-all duration-100 ${
        pressed ? "animate-shake bg-red-900/20" : ""
      }`}
    >
        <style jsx>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.5s;
          animation-iteration-count: infinite;
        }
      `}</style>

      {!pressed ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePress}
          className="px-10 py-6 text-2xl font-bold bg-red-600 text-white rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.6)] border-4 border-red-800 uppercase tracking-widest hover:bg-red-500 transition"
        >
          Do NOT Press
        </motion.button>
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                animate={{ opacity: 1, scale: [1, 1.5, 1], rotate: Math.random() * 360 }}
                transition={{ duration: 0.5, delay: Math.random() * 2 }}
                className="absolute text-pink-500 font-bold text-xl md:text-3xl whitespace-nowrap"
             >
                I LOVE YOU
             </motion.div> 
          ))}
        </div>
      )}
    </div>
  );
}
