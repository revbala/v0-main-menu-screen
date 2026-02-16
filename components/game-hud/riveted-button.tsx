"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

interface RivetedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function RivetedButton({ children, onClick, className = "" }: RivetedButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      /* audio not available */
    }
  }, []);

  const handleHover = useCallback(() => {
    setHovered(true);
    const id = nextId.current++;
    const x = 10 + Math.random() * 80;
    setPuffs((prev) => [...prev, { id, x, y: 0 }]);
    setTimeout(() => setPuffs((prev) => prev.filter((p) => p.id !== id)), 600);
  }, []);

  return (
    <button
      className={`group relative flex items-center justify-center gap-2 border-2 px-4 py-2 font-sans text-xs tracking-wider transition-all duration-150 ${className}`}
      style={{
        borderColor: hovered ? "hsl(25, 50%, 40%)" : "hsl(25, 15%, 25%)",
        background: hovered
          ? "linear-gradient(180deg, hsl(25, 18%, 18%), hsl(25, 12%, 14%))"
          : "linear-gradient(180deg, hsl(25, 12%, 15%), hsl(20, 10%, 10%))",
        color: hovered ? "hsl(25, 80%, 55%)" : "hsl(25, 25%, 50%)",
        boxShadow: hovered
          ? "inset 0 1px 0 hsla(25,50%,50%,0.15), 0 0 8px hsla(25,80%,50%,0.2)"
          : "inset 0 1px 0 hsla(25,20%,30%,0.2), 0 2px 4px hsla(0,0%,0%,0.3)",
      }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        playClick();
        onClick?.();
      }}
    >
      {/* Rivets */}
      <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" aria-hidden="true" style={{ background: "radial-gradient(circle, hsl(25, 15%, 30%), hsl(25, 10%, 18%))" }} />
      <span className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" aria-hidden="true" style={{ background: "radial-gradient(circle, hsl(25, 15%, 30%), hsl(25, 10%, 18%))" }} />

      {/* Steam puffs */}
      {puffs.map((puff) => (
        <span
          key={puff.id}
          className="pointer-events-none absolute rounded-full"
          aria-hidden="true"
          style={{
            left: `${puff.x}%`,
            top: "-4px",
            width: "6px",
            height: "6px",
            background: "radial-gradient(circle, hsla(25, 30%, 60%, 0.6), transparent)",
            animation: "steam-puff 0.6s ease-out forwards",
          }}
        />
      ))}

      {children}
    </button>
  );
}
