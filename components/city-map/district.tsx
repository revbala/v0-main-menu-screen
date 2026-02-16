"use client";

import { useState, type ReactNode } from "react";

interface DistrictProps {
  name: string;
  description: string;
  x: string;
  y: string;
  width: string;
  height: string;
  color: string;
  borderColor: string;
  pulse?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

export function District({
  name,
  description,
  x,
  y,
  width,
  height,
  color,
  borderColor,
  pulse = false,
  children,
  onClick,
}: DistrictProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="absolute transition-all duration-200"
      style={{
        left: x,
        top: y,
        width,
        height,
        background: hovered
          ? `linear-gradient(135deg, ${color}, ${borderColor})`
          : color,
        border: `2px solid ${hovered ? "hsl(25, 70%, 50%)" : borderColor}`,
        boxShadow: hovered
          ? "0 0 16px hsla(25, 80%, 50%, 0.3), inset 0 0 12px hsla(25, 60%, 40%, 0.15)"
          : pulse
            ? undefined
            : "inset 0 1px 4px hsla(0,0%,0%,0.4)",
        animation: pulse && !hovered ? "district-pulse 2s ease-in-out infinite" : undefined,
        cursor: "pointer",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        zIndex: hovered ? 20 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      aria-label={`${name}: ${description}`}
    >
      {children}

      {/* District name tooltip */}
      {hovered && (
        <div
          className="pointer-events-none absolute -top-10 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap border-2 px-2 py-1"
          style={{
            animation: "tooltip-appear 0.2s ease-out forwards",
            background: "hsl(40, 30%, 85%)",
            borderColor: "hsl(30, 20%, 65%)",
            boxShadow: "2px 3px 6px hsla(0,0%,0%,0.5)",
            transform: "translateX(-50%) rotate(-1deg)",
          }}
        >
          <p className="font-mono font-bold" style={{ fontSize: "0.55rem", color: "hsl(20, 30%, 25%)" }}>
            {name}
          </p>
          <p className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(20, 15%, 40%)" }}>
            {description}
          </p>
        </div>
      )}
    </button>
  );
}
