"use client";

import { useEffect, useState } from "react";
import { SteamParticles } from "./steam-particles";

export function GameTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Steam rising from the title */}
      <SteamParticles count={16} />

      {/* ASHES OF */}
      <div
        className="relative"
        style={{
          animation: mounted ? "title-slam 0.6s ease-out forwards" : "none",
          opacity: mounted ? 1 : 0,
        }}
      >
        <h1
          className="font-sans text-center leading-none tracking-wider"
          style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)" }}
        >
          <span
            className="relative inline-block"
            style={{
              color: "hsl(25, 15%, 42%)",
              textShadow: `
                2px 2px 0px hsl(20, 10%, 15%),
                -1px -1px 0px hsl(20, 10%, 25%)
              `,
              WebkitTextStroke: "0.5px hsl(20, 10%, 20%)",
            }}
          >
            {"ASHES OF"}
          </span>
        </h1>
      </div>

      {/* IRON - the big glowing title */}
      <div
        className="relative -mt-1 md:-mt-2"
        style={{
          animation: mounted
            ? "title-slam 0.6s 0.15s ease-out forwards"
            : "none",
          opacity: mounted ? 1 : 0,
        }}
      >
        <h1
          className="font-sans text-center leading-none tracking-widest"
          style={{
            fontSize: "clamp(3rem, 12vw, 8rem)",
            color: "hsl(25, 20%, 38%)",
            textShadow: `
              3px 3px 0px hsl(20, 10%, 10%),
              -1px -1px 0px hsl(20, 10%, 20%)
            `,
            WebkitTextStroke: "1px hsl(20, 10%, 18%)",
          }}
        >
          {"IRON"}
        </h1>

        {/* Glowing cracks overlay */}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-sans leading-none tracking-widest"
          aria-hidden="true"
          style={{
            fontSize: "clamp(3rem, 12vw, 8rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px hsl(25, 100%, 55%)",
            animation: "crack-glow 2s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        >
          {"IRON"}
        </span>
      </div>

      {/* Subtitle */}
      <p
        className="mt-2 font-mono text-center tracking-widest md:mt-3"
        style={{
          fontSize: "clamp(0.55rem, 1.4vw, 0.85rem)",
          color: "hsl(25, 40%, 50%)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s 0.8s ease-in",
          letterSpacing: "0.35em",
        }}
      >
        {"FORGE YOUR DESTINY"}
      </p>
    </div>
  );
}
