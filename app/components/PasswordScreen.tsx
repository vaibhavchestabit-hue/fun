"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import RomanticBackground from "./RomanticBackground";

interface PasswordScreenProps {
  onComplete: () => void;
}

export default function PasswordScreen({ onComplete }: PasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  // Accepted passwords set for O(1) loop up not needed for array of 2 but good practice
  const acceptedPasswords = ["meva30cutiepie", "meva30kuchupuchu"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (acceptedPasswords.includes(password.trim().toLowerCase())) {
        onComplete();
    } else {
        const errors = [
            "Access denied 😤",
            "Fake bubu detected",
            "Try again carefully",
            "Not even close! 🙅‍♂️",
            "Who are you really? 🤨"
        ];
        setError(errors[Math.floor(Math.random() * errors.length)]);
        setShake(true);
        setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden relative">
      <RomanticBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, x: shake ? [-10, 10, -10, 10, 0] : 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-[0_0_60px_rgba(236,72,153,0.3)] relative mx-4 z-10"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-br from-pink-500 to-purple-600 p-5 rounded-full border-4 border-black shadow-xl">
            <Lock size={32} className="text-white drop-shadow-md" />
        </div>

        <h2 className="text-2xl mt-8 mb-6 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 drop-shadow-sm">
          This will confirm you are my real bubu or not 😌
        </h2>
        
        <div className="mb-6 text-sm text-pink-100/80 bg-black/30 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
            <p className="font-bold mb-3 text-pink-300 uppercase tracking-wider text-xs">Security Hint:</p>
            <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"/> our combined name</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"/> proposal date (only date)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"/> the word I use most to call you</li>
            </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-pink-300/30 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-400 focus:bg-black/40 transition-all text-center tracking-wider text-lg"
                placeholder="Enter secret code..."
            />
          </div>
          
          {error && (
            <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-center text-sm font-bold bg-red-900/30 py-2 rounded-lg border border-red-500/20"
            >
                {error}
            </motion.p>
          )}
          
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/25 border border-white/10 mt-2"
          >
            Unlock My Heart 🔓
          </button>
        </form>
      </motion.div>
    </div>
  );
}
