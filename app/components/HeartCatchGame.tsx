"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";

interface HeartCatchGameProps {
  onComplete: () => void;
}

interface HeartItem {
  id: number;
  x: number;
  y: number;
}

export default function HeartCatchGame({ onComplete }: HeartCatchGameProps) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [clickEffects, setClickEffects] = useState<{id: number, x: number, y: number}[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const TARGET_SCORE = 24;

  // Use a ref to access the latest score inside the interval closure
  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (gameOver) return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const heartInterval = setInterval(() => {
        spawnHeart();
    }, 600);

    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        clearInterval(heartInterval);
    }
  }, [gameOver]);

  const spawnHeart = () => {
    const id = Date.now();
    const x = Math.random() * 80 + 10; // Avoid edges
    const y = Math.random() * 80 + 10;
    
    setHearts((prev) => [...prev, { id, x, y }]);
    
    // Remove heart after 1.5 seconds (challenging)
    setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1500);
  };

  const handleHeartClick = (id: number, x: number, y: number) => {
    if (gameOver) return;
    setScore((prev) => prev + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
    
    const effectId = Date.now() + Math.random();
    setClickEffects(prev => [...prev, { id: effectId, x, y }]);
    setTimeout(() => {
        setClickEffects(prev => prev.filter(e => e.id !== effectId));
    }, 1000);
  };

  const handleRetry = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

  const isSuccess = score >= TARGET_SCORE;

  return (
    <div className="relative h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900 via-purple-950 to-black overflow-hidden select-none touch-none">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full blur-xl"
                initial={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0.1
                }}
                animate={{
                    x: [null, Math.random() * window.innerWidth],
                    y: [null, Math.random() * window.innerHeight],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        ))}
      </div>

      <div className="absolute top-4 left-4 right-4 flex justify-between text-white z-20 font-bold text-xl">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full shadow-lg">
            Time: <span className={timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-pink-400"}>{timeLeft}s</span>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full shadow-lg">
            Hearts: <span className={score >= TARGET_SCORE ? "text-green-400" : "text-pink-400"}>{score}</span> / {TARGET_SCORE}
        </div>
      </div>

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute cursor-pointer p-4"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            onClick={() => handleHeartClick(heart.id, heart.x, heart.y)}
            onTap={() => handleHeartClick(heart.id, heart.x, heart.y)}
          >
            <Heart size={48} className="text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {clickEffects.map((effect) => (
            <motion.div
                key={effect.id}
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 2, y: -100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute pointer-events-none z-30"
                style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
            >
                <Heart size={48} className="text-pink-300 fill-pink-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-bold text-xl drop-shadow-md">+1</span>
            </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg p-4"
          >
            <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gray-900/90 border border-pink-500/50 p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(236,72,153,0.5)] relative overflow-hidden"
            >
              {isSuccess && (
                  <div className="absolute inset-0 pointer-events-none">
                      {[...Array(10)].map((_, i) => (
                          <motion.div
                              key={i}
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 400, opacity: [0, 1, 0] }}
                              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                              className="absolute text-2xl"
                              style={{ left: `${Math.random() * 100}%` }}
                          >
                              ❤️
                          </motion.div>
                      ))}
                  </div>
              )}

              <h2 className={`text-4xl font-black mb-4 ${isSuccess ? "text-pink-500" : "text-gray-400"}`}>
                {isSuccess ? "Success! 🎉" : "Time's Up! ⏳"}
              </h2>
              
              <p className="text-xl text-pink-100 mb-8 font-medium leading-relaxed">
                {isSuccess 
                    ? "Yaa… you have my heart! 💘\nYou caught enough love." 
                    : "Come on, you can do it! \nTry again to catch my heart."}
              </p>
              
              {isSuccess ? (
                <button
                  onClick={onComplete}
                  className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Confirm My Love <Heart className="fill-current w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="w-full py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl text-lg shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  Try Again <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
