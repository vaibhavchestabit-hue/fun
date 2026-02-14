"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import LoveCounter from "./LoveCounter";
import RomanticBackground from "./RomanticBackground";

export default function FinalScreen() {
  const handleReplay = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-6 relative overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Animated Background */}
        <RomanticBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl flex flex-col items-center z-10 py-10"
      >
        <div className="relative mb-8">
            <motion.div 
                className="absolute -inset-10 bg-pink-500/20 rounded-full blur-3xl opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <h1 className="relative text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 leading-tight drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">
            Happy Valentine’s Day<br/>My Love 💖
            </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-pink-100/90 mb-10 font-light max-w-2xl leading-relaxed drop-shadow-md">
            You are my favorite person in this universe.<br/>
            <span className="italic text-pink-300">And now you are officially stuck with me forever.</span>
        </p>
        
        {/* The Live Counter */}
        <LoveCounter />

        <div className="mt-16">
            <motion.button
            onClick={handleReplay}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 mx-auto px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full transition-all text-base uppercase tracking-widest font-bold shadow-lg shadow-pink-500/30 border border-white/10"
            >
            <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-500" /> 
            Replay Our Journey
            </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
