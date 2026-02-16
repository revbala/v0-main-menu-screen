"use client";

import { useState } from "react";

interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const DEFAULT_ITEMS: (InventoryItem | null)[] = [
  { id: "wrench", name: "Iron Wrench", icon: "W", description: "Elias's trusty wrench. Fixes most things." },
  { id: "coal", name: "Coal Chunk", icon: "C", description: "A lump of coal. Burns hot and long." },
  { id: "ticket", name: "Old Blueprint", icon: "B", description: "Faded engineering blueprint." },
  null,
  null,
  null,
];

export function Inventory() {
  const [items] = useState<(InventoryItem | null)[]>(DEFAULT_ITEMS);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ item: InventoryItem; x: number; y: number } | null>(null);

  return (
    <div className="relative">
      {/* Pouch label */}
      <div
        className="mb-1 font-sans tracking-wider"
        style={{ fontSize: "0.5rem", color: "hsl(25, 30%, 50%)" }}
      >
        {"INVENTORY"}
      </div>

      {/* Slots grid */}
      <div className="grid grid-cols-3 gap-1">
        {items.map((item, i) => (
          <button
            key={i}
            className="relative flex items-center justify-center border-2 transition-all duration-150"
            style={{
              width: "42px",
              height: "42px",
              borderColor: hoveredSlot === i ? "hsl(25, 60%, 45%)" : "hsl(25, 15%, 22%)",
              background:
                hoveredSlot === i
                  ? "linear-gradient(135deg, hsla(25, 20%, 15%, 0.95), hsla(30, 15%, 12%, 0.95))"
                  : "linear-gradient(135deg, hsla(25, 12%, 10%, 0.9), hsla(30, 10%, 8%, 0.9))",
              boxShadow:
                hoveredSlot === i
                  ? "inset 0 0 8px hsla(25, 60%, 40%, 0.3), 0 0 6px hsla(25, 60%, 40%, 0.2)"
                  : "inset 0 1px 3px hsla(0,0%,0%,0.5)",
            }}
            onMouseEnter={(e) => {
              setHoveredSlot(i);
              if (item) {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({ item, x: rect.left, y: rect.top - 4 });
              }
            }}
            onMouseLeave={() => {
              setHoveredSlot(null);
              setTooltip(null);
            }}
            aria-label={item ? item.name : `Empty slot ${i + 1}`}
          >
            {/* Corner rivets */}
            <span className="absolute left-0.5 top-0.5 h-1 w-1 rounded-full" style={{ background: "hsl(25, 10%, 28%)" }} aria-hidden="true" />
            <span className="absolute right-0.5 top-0.5 h-1 w-1 rounded-full" style={{ background: "hsl(25, 10%, 28%)" }} aria-hidden="true" />
            <span className="absolute bottom-0.5 left-0.5 h-1 w-1 rounded-full" style={{ background: "hsl(25, 10%, 28%)" }} aria-hidden="true" />
            <span className="absolute bottom-0.5 right-0.5 h-1 w-1 rounded-full" style={{ background: "hsl(25, 10%, 28%)" }} aria-hidden="true" />

            {item && (
              <span
                className="font-sans"
                style={{
                  fontSize: "0.85rem",
                  color: hoveredSlot === i ? "hsl(25, 90%, 55%)" : "hsl(25, 30%, 55%)",
                  textShadow: hoveredSlot === i ? "0 0 6px hsla(25, 90%, 50%, 0.5)" : "none",
                }}
              >
                {item.icon}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Handwritten tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 w-40 border-2 px-2 py-1.5"
          style={{
            animation: "tooltip-appear 0.2s ease-out forwards",
            background: "hsl(40, 30%, 85%)",
            borderColor: "hsl(30, 20%, 65%)",
            boxShadow: "2px 3px 8px hsla(0,0%,0%,0.4)",
            transform: "rotate(-1deg)",
          }}
        >
          <p className="font-mono font-bold" style={{ fontSize: "0.6rem", color: "hsl(20, 30%, 25%)" }}>
            {tooltip.item.name}
          </p>
          <p className="font-mono" style={{ fontSize: "0.5rem", color: "hsl(20, 15%, 40%)", lineHeight: 1.4 }}>
            {tooltip.item.description}
          </p>
        </div>
      )}
    </div>
  );
}
