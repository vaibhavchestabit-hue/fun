"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Pause, Play } from "lucide-react";
import RomanticBackground from "./RomanticBackground";

interface ReasonCarouselProps {
  onComplete: () => void;
}

const reasons = [
  "Your smile lights up my darkest days.",
  "The way you laugh at my silly jokes.",
  "How you care for everyone around you.",
  "Your kindness is boundless.",
  "You make the world a better place just by being in it.",
  "Your eyes are the most beautiful thing I've ever seen.",
  "The way you look at me.",
  "You inspire me to be a better person.",
  "Your hug feels like home.",
  "We can talk about anything and everything.",
  "You're my best friend.",
  "You're intelligent and ambitious.",
  "Your cooking is amazing (even when it fails 😜).",
  "You handle tough situations with grace.",
  "You support my dreams.",
  "You're always there when I need you.",
  "Your fashion sense is impeccable.",
  "You're fiercely loyal.",
  "You're adventurous.",
  "You love me for who I am.",
  "You challenge me.",
  "You're cute when you're angry.",
  "You give the best advice.",
  "You're strong and independent.",
  "You have a heart of gold.",
  "You're passionate about what you do.",
  "You surprise me every day.",
  "You make boring things fun.",
  "You're a great listener.",
  "You're honest and genuine.",
  "You have a beautiful voice.",
  "You're patient with me.",
  "You believe in us.",
  "You're simply irresistible.",
  "You make me feel special.",
  "You remember the little things.",
  "You're my sunshine.",
  "You're my rock.",
  "You're my partner in crime.",
  "You make life an adventure.",
  "I love your quirks.",
  "I love how we grow together.",
  "I love your sense of humor.",
  "I love how you say my name.",
  "I love planning a future with you.",
  "I love how safe I feel with you.",
  "I love that we can be silent together.",
  "I love your optimism.",
  "I love everything about you.",
  "Because you are YOU."
];

export default function ReasonCarousel({ onComplete }: ReasonCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && index < reasons.length - 1) {
      interval = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 3000); // 3 seconds per reason (enough time to read)
    } else if (isPlaying && index === reasons.length - 1) {
        // Auto-complete after the last one is shown for a bit
        interval = setTimeout(() => {
            onComplete();
        }, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, index, onComplete]);

  const handleNext = () => {
    if (index < reasons.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden relative select-none">
      <RomanticBackground />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center px-4"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-12 tracking-wide drop-shadow-lg">
          50 Reasons I Love You
        </h2>

        <div className="relative h-64 w-full max-w-3xl flex items-center justify-center mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateX: 90 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="text-2xl md:text-4xl font-light italic leading-relaxed text-white drop-shadow-md p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              "{reasons[index]}"
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((index + 1) / reasons.length) * 100}%` }}
                transition={{ duration: 0.5 }}
            />
          </div>

          <p className="text-sm text-pink-200/70 font-mono">
            Reason {index + 1} of {reasons.length}
          </p>
          
          <div className="flex items-center gap-4">
            <button
                onClick={togglePlay}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition backdrop-blur-md border border-white/20 text-white"
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full transition shadow-lg shadow-pink-500/20 text-white font-semibold"
            >
                {index === reasons.length - 1 ? "Finish Journey" : "Next Reason"} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
