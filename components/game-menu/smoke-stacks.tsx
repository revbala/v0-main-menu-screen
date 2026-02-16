"use client";

import { useEffect, useState } from "react";

interface SmokeParticle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  slow: boolean;
}

export function SmokeStacks() {
  const stacks = [
    { x: "18%", count: 4 },
    { x: "35%", count: 3 },
    { x: "72%", count: 5 },
    { x: "88%", count: 3 },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-full"
      aria-hidden="true"
    >
      {stacks.map((stack, si) => (
        <SmokeColumn key={si} x={stack.x} count={stack.count} />
      ))}
    </div>
  );
}

function SmokeColumn({ x, count }: { x: string; count: number }) {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${-8 + Math.random() * 16}px`,
        delay: `${Math.random() * 4}s`,
        duration: `${4 + Math.random() * 3}s`,
        size: 8 + Math.random() * 14,
        slow: Math.random() > 0.5,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div
      className="absolute"
      style={{ left: x, bottom: "28%", width: "20px" }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              "radial-gradient(circle, hsla(20,8%,30%,0.4) 0%, hsla(20,8%,20%,0.05) 100%)",
            animation: `${p.slow ? "smoke-drift-slow" : "smoke-drift"} ${p.duration} ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
