"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpyMissionProps {
  onComplete: () => void;
}

export default function SpyMission({ onComplete }: SpyMissionProps) {
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [puzzleInput, setPuzzleInput] = useState("");
  const [showPuzzleSuccess, setShowPuzzleSuccess] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePuzzleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (puzzleInput.trim().toUpperCase() === "I LOVE U MEGHA" || puzzleInput.trim().toUpperCase() === "I LOVE YOU MEGHA") {
      setShowPuzzleSuccess(true);
      setTimeout(() => {
        setShowPuzzleSuccess(false);
        setStep(2);
      }, 3000);
    } else {
        alert("Incorrect code. Try again agent.");
    }
  };

  const handleQuizAnswer = (answer: string) => {
    if (answer === "You") {
      setShowReveal(true);
      setTimeout(onComplete, 8000); // Wait for animation
    } else {
        alert("Incorrect intel. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center relative overflow-hidden">
      {/* Spy Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="z-10 w-full max-w-2xl mt-8 border border-green-800 bg-black/90 p-6 rounded shadow-[0_0_20px_rgba(0,255,0,0.2)]">
        <header className="flex justify-between items-center border-b border-green-800 pb-4 mb-6">
          <h1 className="text-xl font-bold text-green-400">MISSION: Find who loves you</h1>
          <span className="text-red-500 font-bold animate-pulse">{formatTime(timeLeft)}</span>
        </header>

        {step === 1 && !showPuzzleSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-lg text-green-300">Phase 1: Decrypt the Code</h2>
            <div className="bg-green-900/20 p-4 border border-green-700/50 text-center">
              <p className="text-2xl tracking-widest font-bold">"E I O V L U G H A M"</p>
              <p className="text-xs text-green-600 mt-2">(Unscramble this)</p>
            </div>

            <form onSubmit={handlePuzzleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={puzzleInput}
                onChange={(e) => setPuzzleInput(e.target.value)}
                className="bg-black border border-green-600 p-3 text-green-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,0,0.4)] text-center uppercase"
                placeholder="ENTER DECRYPTED TEXT"
              />
              <button className="bg-green-800 hover:bg-green-700 text-green-100 py-2 font-bold tracking-wider transition">
                VERIFY INTEL
              </button>
            </form>
          </motion.div>
        )}

        {showPuzzleSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-10"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">INTELLIGENCE CONFIRMED</h2>
            <p className="text-green-600">Unlocking Phase 2...</p>
            <div className="h-2 w-full bg-gray-800 mt-4 rounded overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-green-500"
                />
            </div>
          </motion.div>
        )}

        {step === 2 && !showReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-lg text-green-300">Phase 2: Use the Clue</h2>
            
            <h3 className="text-xl font-bold mb-4">Who makes my world better every day?</h3>

            <div className="grid grid-cols-2 gap-4">
              {["Pizza", "Sleep", "You", "Netflix"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleQuizAnswer(opt)}
                  className="border border-green-600 p-4 hover:bg-green-900/30 transition text-center font-bold"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {showReveal && (
          <div className="text-center py-10 relative">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-green-500 font-mono text-sm mb-4"
            >
                Processing... Identity found...
            </motion.div>
            
            <motion.h1
                initial={{ scale: 0.5, filter: "blur(10px)", opacity: 0 }}
                animate={{ scale: 1.5, filter: "blur(0px)", opacity: 1 }}
                transition={{ delay: 2, duration: 1, type: "spring" }}
                className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(255,105,180,0.8)]"
            >
                ME
            </motion.h1>
            
            <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 3.5 }}
                 className="mt-8 text-pink-400 text-xl font-sans"
            >
                (Because I'm crazy about you)
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}
