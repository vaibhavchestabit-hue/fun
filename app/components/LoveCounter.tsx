"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoveCounter() {
  const START_DATE = new Date("2025-04-19T00:00:00");
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    smiles: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      
      // Let's assume you smile approximately once every 15 minutes of knowing her?
      // Or maybe more! Let's say once every 10 minutes on average.
      const totalSmiles = Math.floor(totalMinutes / 10);

      setTime({
        seconds: totalSeconds,
        minutes: totalMinutes,
        smiles: totalSmiles,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center gap-8 my-10 w-full max-w-5xl">
      <div className="text-2xl md:text-3xl font-light text-pink-200/90 mb-4 tracking-wide font-serif border-b border-pink-500/30 pb-2">
        Since the moment our stars collided (April 19, 2025)
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        <CounterItem label="Seconds We've Shared" value={time.seconds} delay={0.2} />
        <CounterItem label="Minutes You're On My Mind" value={time.minutes} delay={0.4} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        className="w-full max-w-md bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-10 rounded-[2rem] border border-pink-400/20 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,0.15)] flex flex-col items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        
        <div className="flex flex-col items-center z-10">
            <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-pink-300 drop-shadow-2xl tabular-nums">
                {time.smiles.toLocaleString()}
            </span>
            <span className="text-xl text-pink-200 mt-4 font-light tracking-widest uppercase text-center">
                Times I Smiled Because of You 😊
            </span>
        </div>
      </motion.div>
    </div>
  );
}

const CounterItem = ({ label, value, delay }: { label: string, value: number, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ y: -5 }}
    className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-lg min-w-[240px] hover:bg-white/10 transition-colors"
  >
    <div className="text-5xl md:text-6xl font-mono font-bold text-pink-300 tabular-nums drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]">
      {value.toLocaleString()}
    </div>
    <div className="text-xs md:text-sm text-pink-200/70 uppercase tracking-[0.2em] mt-3 font-medium text-center">
      {label}
    </div>
  </motion.div>
);
