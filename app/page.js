"use client";

import { useState } from "react";
import useInvite from "../config/useInvite";

import WelcomeStep from "../components/WelcomeStep";
import SuccessStep from "../components/SuccessStep";
import DateStep from "../components/DateStep";
import TimeStep from "../components/TimeStep";
import FoodStep from "../components/FoodStep";
import FinalStep from "../components/FinalStep";

export default function Home() {
  const [stage, setStage] = useState(0);
  const { invite, loading } = useInvite();

  const [data, setData] = useState({
    date: "",
    time: "",
    foods: []
  });

  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNo = () => {
    setNoPos((prev) => {
      const dx = (Math.random() - 0.5) * 180;
      const dy = (Math.random() - 0.5) * 180;

      return {
        x: Math.max(20, Math.min(300, prev.x + dx)),
        y: Math.max(20, Math.min(500, prev.y + dy))
      };
    });
  };

  // 🔥 ВАЖНО: защита от загрузки
  if (loading || !invite) {
    return (
      <div className="bg">
        <h2 style={{ color: "#ff4d88" }}>Загрузка... 💗</h2>
      </div>
    );
  }

  return (
    <div className="bg">
      {stage === 0 && (
        <WelcomeStep
          question={invite.question}
          image={invite.images?.first}
          noPos={noPos}
          moveNo={moveNo}
          onYes={() => setStage(1)}
        />
      )}

      {stage === 1 && (
        <SuccessStep
          image={invite.images?.second}
          onNext={() => setStage(2)}
        />
      )}

      {stage === 2 && (
        <DateStep
          onSelect={(date) => {
            setData({ ...data, date });
            setStage(3);
          }}
        />
      )}

      {stage === 3 && (
        <TimeStep
          onSelect={(time) => {
            setData({ ...data, time });
            setStage(4);
          }}
        />
      )}

      {stage === 4 && (
        <FoodStep
          foods={invite.foods}
          onSelect={(foods) => {
            setData({ ...data, foods });
            setStage(5);
          }}
        />
      )}

      {stage === 5 && <FinalStep data={data} />}
    </div>
  );
}