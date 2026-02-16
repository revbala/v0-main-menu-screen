"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function CharacterDisplay() {
  const [lookDir, setLookDir] = useState(0);

  // Random look-around
  useEffect(() => {
    const interval = setInterval(() => {
      setLookDir(Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Character frame */}
      <div
        className="relative overflow-hidden border-2"
        style={{
          width: "120px",
          height: "160px",
          borderColor: "hsl(25, 15%, 25%)",
          background: "linear-gradient(180deg, hsl(20, 12%, 8%), hsl(20, 10%, 5%))",
          boxShadow: "inset 0 2px 8px hsla(0,0%,0%,0.6), 0 0 0 3px hsl(25, 12%, 15%), 0 4px 12px hsla(0,0%,0%,0.5)",
        }}
      >
        {/* Corner rivets */}
        {[
          { top: 3, left: 3 },
          { top: 3, right: 3 },
          { bottom: 3, left: 3 },
          { bottom: 3, right: 3 },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full"
            aria-hidden="true"
            style={{
              ...pos,
              background: "radial-gradient(circle, hsl(25, 15%, 30%), hsl(25, 10%, 18%))",
              boxShadow: "inset 0 -1px 1px hsla(0,0%,0%,0.3)",
            }}
          />
        ))}

        {/* Character sprite */}
        <div
          className="pixel-render flex h-full w-full items-center justify-center"
          style={{
            animation: "breathe 3s ease-in-out infinite",
          }}
        >
          <div
            style={{
              transform: `translateX(${lookDir * 2}px)`,
              transition: "transform 0.4s ease",
            }}
          >
            <Image
              src="/images/elias-sprite.jpg"
              alt="Elias the railway mechanic"
              width={100}
              height={140}
              className="pixel-render object-contain"
              style={{ imageRendering: "pixelated" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Name plate */}
      <div
        className="border-2 px-3 py-1 text-center"
        style={{
          borderColor: "hsl(25, 15%, 25%)",
          background: "linear-gradient(180deg, hsl(25, 12%, 14%), hsl(20, 10%, 10%))",
          boxShadow: "0 2px 4px hsla(0,0%,0%,0.4)",
        }}
      >
        <p
          className="font-sans tracking-wider"
          style={{
            fontSize: "0.6rem",
            color: "hsl(25, 70%, 55%)",
            textShadow: "0 0 6px hsla(25, 80%, 50%, 0.3)",
          }}
        >
          {"ELIAS"}
        </p>
        <p className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(25, 20%, 45%)" }}>
          {"Railway Mechanic"}
        </p>
      </div>
    </div>
  );
}
