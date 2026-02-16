"use client";

import { useEffect, useState } from "react";

interface SteamParticle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  alt: boolean;
}

export function SteamParticles({ count = 12 }: { count?: number }) {
  const [particles, setParticles] = useState<SteamParticle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`,
        size: `${3 + Math.random() * 5}px`,
        alt: Math.random() > 0.5,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-8 h-16 overflow-visible"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, hsla(25,60%,60%,0.5) 0%, hsla(25,40%,40%,0.1) 100%)",
            animation: `${p.alt ? "steam-rise-alt" : "steam-rise"} ${p.duration} ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
