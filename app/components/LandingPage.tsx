"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white relative overflow-hidden">
      {/* Background Hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500/30"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart size={Math.random() * 40 + 20} fill="currentColor" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 drop-shadow-lg">
          A Journey for Us
        </h1>
        
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-8 py-4 text-xl font-semibold rounded-full border border-pink-400/50 bg-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]"
        >
          Begin the experience
        </motion.button>
      </motion.div>
    </div>
  );
}
