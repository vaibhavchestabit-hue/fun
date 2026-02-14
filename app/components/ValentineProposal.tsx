"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ValentineProposalProps {
  onComplete: () => void;
}

export default function ValentineProposal({ onComplete }: ValentineProposalProps) {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const noTexts = [
    "No",
    "Are you serious? 🤨",
    "Really? Think again! 🥺",
    "Last chance… 😭",
    "You're breaking my heart 💔",
    "Ab bolo haa yaa na! 😤"
  ];

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    // Move randomly
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const handleFinalConfirm = (confirmed: boolean) => {
      if (confirmed) {
          onComplete();
      } else {
        // "I know aapki naa mein bhi haan hai" logic
        alert("I know aapki naa mein bhi haan hai 😌");
        onComplete();
      }
  };

  if (yesPressed) {
      return (
          <div className="flex flex-col items-center justify-center h-screen bg-pink-900 text-white p-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center max-w-sm"
              >
                  <h2 className="text-3xl font-bold mb-8">Pakka na?</h2>
                  <div className="flex gap-4 justify-center">
                      <button 
                        onClick={() => handleFinalConfirm(true)}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold"
                      >
                          YES 💖
                      </button>
                      <button 
                        onClick={() => handleFinalConfirm(false)}
                        className="px-8 py-3 bg-gray-500 hover:bg-gray-600 rounded-lg font-bold"
                      >
                          NO 🙄
                      </button>
                  </div>
              </motion.div>
          </div>
      )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-12 text-center z-10"
      >
        <p className="text-xl text-pink-300 mb-4 font-light">So… after everything…</p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-shadow-lg">
          Would you like to be my Valentine?
        </h1>
      </motion.div>

      <div className="flex flex-wrap gap-8 items-center justify-center z-10 min-h-[100px]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYesClick}
          className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-2xl font-bold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] transition"
        >
          YES, I'D LOVE TO! 💖
        </motion.button>

        {noCount < 5 && (
          <motion.button
            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
            whileHover={{ scale: 0.9 }}
            onClick={handleNoClick}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold rounded-full transition"
            style={{ fontSize: `${Math.max(16 - noCount * 2, 8)}px` }}
          >
            {noTexts[Math.min(noCount, noTexts.length - 1)]}
          </motion.button>
        )}
      </div>
    </div>
  );
}
