"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [text, setText] = useState("");
  const fullText = "Hi cutiepie";
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 3000); 
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch((e) => console.log("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-pink-300 relative">
        <audio ref={audioRef} loop src="/music/background.mp3" />

        <button 
            onClick={toggleAudio}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
        >
            {isMuted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
        </button>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl md:text-6xl font-bold tracking-wider drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]"
      >
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1 h-8 md:h-12 ml-1 bg-pink-400 align-middle"
        />
      </motion.h1>
    </div>
  );
}
