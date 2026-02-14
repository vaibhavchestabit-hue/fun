"use client";

import React, { useState } from "react";
import IntroScreen from "./IntroScreen";
import LandingPage from "./LandingPage";
import NameInput from "./NameInput";
import PasswordScreen from "./PasswordScreen";
import HeartCatchGame from "./HeartCatchGame";
import SpyMission from "./SpyMission";
import ChaosScreen from "./ChaosScreen";
import ReasonCarousel from "./ReasonCarousel";
import ValentineProposal from "./ValentineProposal";
import FinalScreen from "./FinalScreen";

export default function ValentineJourney() {
  const [stage, setStage] = useState(0);

  const nextStage = () => setStage((prev) => prev + 1);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans">
      {stage === 0 && <IntroScreen onComplete={nextStage} />}
      {stage === 1 && <LandingPage onStart={nextStage} />}
      {stage === 2 && <NameInput onComplete={nextStage} />}
      {stage === 3 && <PasswordScreen onComplete={nextStage} />}
      {stage === 4 && <HeartCatchGame onComplete={nextStage} />}
      {stage === 5 && <SpyMission onComplete={nextStage} />}
      {stage === 6 && <ChaosScreen onComplete={nextStage} />}
      {stage === 7 && <ReasonCarousel onComplete={nextStage} />}
      {stage === 8 && <ValentineProposal onComplete={nextStage} />}
      {stage === 9 && <FinalScreen />}
    </div>
  );
}
