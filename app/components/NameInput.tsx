"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import RomanticBackground from "./RomanticBackground";

interface NameInputProps {
  onComplete: () => void;
}

export default function NameInput({ onComplete }: NameInputProps) {
  const [name, setName] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const funnyMessages = [
    "Come on yrr… Megha is your name. Now give it a try 😌",
    "Itna bhi bhool gayi kya? 🤨",
    "Hint: starts with M 😉",
    "Focus agent!",
    "Are you really her? 🤔",
    "Try 'Megha' maybe? Just a guess 🤷‍♂️"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().toLowerCase() === "megha") {
      setModalMessage("I already knew it was you, Cutiepie!\nJust wanted to hear it from you. 💖");
      setIsSuccess(true);
      setShowModal(true);
    } else {
      const msgIndex = Math.min(attempts, funnyMessages.length - 1);
      setModalMessage(funnyMessages[msgIndex]);
      setAttempts((prev) => prev + 1);
      setShowModal(true);
      if (attempts >= funnyMessages.length - 1) {
          // Loop funny messages randomly after exhausting the list
          setAttempts(Math.floor(Math.random() * (funnyMessages.length - 1)) + 1);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isSuccess) {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden relative">
      <RomanticBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.3)] z-10 mx-4"
      >
        <h2 className="text-3xl mb-8 text-center font-light text-white drop-shadow-md">
          May I know your name, <span className="text-pink-300 font-semibold">beautiful</span>?
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/20 border border-pink-300/30 rounded-xl p-4 text-white text-lg placeholder:text-white/40 focus:outline-none focus:border-pink-400 focus:bg-black/40 transition-all text-center"
              placeholder="Type your name..."
            />
            <div className="absolute inset-0 rounded-xl bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-pink-500/25 border border-white/10"
          >
            Continue Journey 💖
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              className="bg-gray-900/90 border border-pink-500/50 p-6 rounded-2xl max-w-sm w-full relative shadow-[0_0_50px_rgba(236,72,153,0.5)]"
            >
              <button
                onClick={handleModalClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <p className="text-xl text-center whitespace-pre-line text-pink-200 font-medium leading-relaxed">
                {modalMessage}
              </p>
              <button
                onClick={handleModalClose}
                className="mt-8 w-full py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold transition shadow-lg"
              >
                {isSuccess ? "Proceed My Love 💖" : "Okay 🥺"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
