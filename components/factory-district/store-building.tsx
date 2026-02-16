"use client";

import { useState } from "react";

interface StoreBuildingProps {
  name: string;
  type: "tool-shop" | "coal-depot" | "pie-cart";
  x: number;
  y: number;
  width?: number;
  height?: number;
  onClick: () => void;
}

export function StoreBuilding({ name, type, x, y, width = 14, height = 10, onClick }: StoreBuildingProps) {
  const [hovered, setHovered] = useState(false);

  const storeColors: Record<string, { wall: string; roof: string; accent: string }> = {
    "tool-shop": { wall: "hsl(25, 15%, 18%)", roof: "hsl(25, 20%, 14%)", accent: "hsl(35, 40%, 40%)" },
    "coal-depot": { wall: "hsl(20, 10%, 14%)", roof: "hsl(20, 8%, 10%)", accent: "hsl(25, 30%, 30%)" },
    "pie-cart": { wall: "hsl(30, 25%, 22%)", roof: "hsl(30, 30%, 18%)", accent: "hsl(35, 50%, 45%)" },
  };

  const colors = storeColors[type] || storeColors["tool-shop"];

  return (
    <button
      className="absolute transition-all duration-150"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        zIndex: hovered ? 20 : 5,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Enter ${name}`}
    >
      {/* Building body */}
      <div
        className="relative h-full w-full"
        style={{
          background: colors.wall,
          border: `2px solid ${hovered ? "hsl(25, 60%, 45%)" : colors.accent}`,
          boxShadow: hovered
            ? "0 0 12px hsla(25, 80%, 50%, 0.3), inset 0 0 8px hsla(25, 50%, 35%, 0.2)"
            : "inset 0 1px 4px hsla(0,0%,0%,0.4)",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        {/* Roof */}
        <div
          className="absolute -top-2 left-0 right-0"
          style={{
            height: "6px",
            background: colors.roof,
            borderTop: `1px solid ${colors.accent}`,
          }}
        />

        {/* Door */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "30%",
            height: "40%",
            background: "hsl(20, 12%, 10%)",
            borderTop: `1px solid ${colors.accent}`,
          }}
        />

        {/* Window */}
        <div
          className="absolute left-1"
          style={{
            top: "20%",
            width: "25%",
            height: "25%",
            background: hovered ? "hsla(35, 60%, 45%, 0.5)" : "hsla(35, 30%, 25%, 0.4)",
            border: `1px solid ${colors.accent}`,
            transition: "background 0.2s",
          }}
        />
        <div
          className="absolute right-1"
          style={{
            top: "20%",
            width: "25%",
            height: "25%",
            background: hovered ? "hsla(35, 60%, 45%, 0.5)" : "hsla(35, 30%, 25%, 0.4)",
            border: `1px solid ${colors.accent}`,
            transition: "background 0.2s",
          }}
        />
      </div>

      {/* Sign */}
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap border px-1.5 py-0.5"
        style={{
          background: "hsl(30, 25%, 20%)",
          borderColor: colors.accent,
          animation: hovered ? "sign-sway 2s ease-in-out infinite" : "none",
          transformOrigin: "top center",
        }}
      >
        <span className="font-sans" style={{ fontSize: "0.35rem", color: "hsl(35, 30%, 65%)" }}>
          {name}
        </span>
      </div>

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="pointer-events-none absolute -top-14 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap border-2 px-2 py-1"
          style={{
            animation: "tooltip-appear 0.2s ease-out forwards",
            background: "hsl(40, 30%, 85%)",
            borderColor: "hsl(30, 20%, 65%)",
            boxShadow: "2px 3px 6px hsla(0,0%,0%,0.5)",
            transform: "translateX(-50%) rotate(-1deg)",
          }}
        >
          <p className="font-mono font-bold" style={{ fontSize: "0.5rem", color: "hsl(20, 30%, 25%)" }}>
            {name}
          </p>
          <p className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(20, 15%, 40%)" }}>
            {"CLICK TO ENTER"}
          </p>
        </div>
      )}
    </button>
  );
}
