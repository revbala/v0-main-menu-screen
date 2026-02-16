"use client";

import { useEffect, useState } from "react";

export function GameClock() {
  const [gameHour, setGameHour] = useState(18); // Start at 6 PM
  const [gameMinute, setGameMinute] = useState(30);

  // Advance game time (1 real second = 10 game minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      setGameMinute((prev) => {
        if (prev >= 50) {
          setGameHour((h) => (h + 1) % 24);
          return 0;
        }
        return prev + 10;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isNight = gameHour >= 20 || gameHour < 6;
  const isDusk = gameHour >= 18 && gameHour < 20;
  const timeLabel = `${gameHour.toString().padStart(2, "0")}:${gameMinute.toString().padStart(2, "0")}`;
  const period = isNight ? "NIGHT" : isDusk ? "DUSK" : gameHour < 12 ? "MORN" : "AFT";

  // Clock hand angle
  const minuteAngle = (gameMinute / 60) * 360;
  const hourAngle = ((gameHour % 12) / 12) * 360 + (gameMinute / 60) * 30;

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Clock face */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-full border-2"
        style={{
          width: "48px",
          height: "48px",
          borderColor: "hsl(35, 40%, 30%)",
          background: isNight
            ? "radial-gradient(circle, hsl(220, 15%, 12%), hsl(220, 10%, 6%))"
            : "radial-gradient(circle, hsl(35, 20%, 18%), hsl(25, 12%, 10%))",
          boxShadow: "inset 0 1px 4px hsla(0,0%,0%,0.5), 0 0 0 2px hsl(35, 35%, 22%)",
        }}
      >
        {/* Hour marks */}
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const x1 = 24 + 18 * Math.cos(angle);
            const y1 = 24 + 18 * Math.sin(angle);
            const x2 = 24 + 20 * Math.cos(angle);
            const y2 = 24 + 20 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(35, 40%, 40%)"
                strokeWidth={i % 3 === 0 ? "1.5" : "0.7"}
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1="24"
            y1="24"
            x2={24 + 10 * Math.sin((hourAngle * Math.PI) / 180)}
            y2={24 - 10 * Math.cos((hourAngle * Math.PI) / 180)}
            stroke="hsl(35, 50%, 45%)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1="24"
            y1="24"
            x2={24 + 14 * Math.sin((minuteAngle * Math.PI) / 180)}
            y2={24 - 14 * Math.cos((minuteAngle * Math.PI) / 180)}
            stroke="hsl(25, 70%, 50%)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Center pin */}
          <circle cx="24" cy="24" r="2" fill="hsl(35, 40%, 35%)" />
        </svg>
      </div>

      {/* Digital readout */}
      <div className="flex flex-col items-center">
        <span className="font-mono" style={{ fontSize: "0.65rem", color: "hsl(25, 60%, 55%)", textShadow: "0 0 4px hsla(25, 80%, 50%, 0.4)" }}>
          {timeLabel}
        </span>
        <span
          className="font-sans tracking-widest"
          style={{
            fontSize: "0.4rem",
            color: isNight ? "hsl(220, 30%, 50%)" : isDusk ? "hsl(25, 60%, 50%)" : "hsl(40, 50%, 55%)",
          }}
        >
          {period}
        </span>
      </div>
    </div>
  );
}
