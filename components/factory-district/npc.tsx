"use client";

import { useState } from "react";

export interface NPCData {
  id: string;
  name: string;
  role: string;
  /** Pixel grid position in the district */
  x: number;
  y: number;
  /** Color of the NPC sprite body */
  bodyColor: string;
  /** Color of hat/hair */
  headColor: string;
  /** Is this the quest giver? Shows exclamation */
  isQuestGiver?: boolean;
  /** Has active quest available */
  hasQuest?: boolean;
  /** Is this a factory worker (different appearance from civilians) */
  isWorker?: boolean;
}

interface NPCProps {
  npc: NPCData;
  onClick: (npc: NPCData) => void;
}

export function NPC({ npc, onClick }: NPCProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="group absolute flex flex-col items-center"
      style={{
        left: `${npc.x}%`,
        top: `${npc.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: hovered ? 30 : 10,
      }}
      onClick={() => onClick(npc)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Talk to ${npc.name}, ${npc.role}`}
    >
      {/* Quest exclamation mark */}
      {npc.isQuestGiver && npc.hasQuest && (
        <span
          className="absolute -top-5 left-1/2 -translate-x-1/2 font-sans font-bold"
          style={{
            fontSize: "0.7rem",
            color: "hsl(45, 100%, 55%)",
            textShadow: "0 0 8px hsla(45, 100%, 55%, 0.6), 0 0 2px hsl(0,0%,0%)",
            animation: "exclaim-bounce 1.2s ease-in-out infinite",
          }}
          aria-hidden="true"
        >
          !
        </span>
      )}

      {/* NPC pixel sprite */}
      <div
        className="relative"
        style={{
          animation: "npc-idle 2.5s ease-in-out infinite",
          filter: hovered ? "brightness(1.3)" : "brightness(1)",
          transition: "filter 0.15s",
        }}
      >
        {/* Head */}
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "2px",
            background: "hsl(25, 35%, 60%)",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Hat/Hair */}
          <div
            style={{
              position: "absolute",
              top: "-3px",
              left: "-1px",
              right: "-1px",
              height: "5px",
              borderRadius: "2px 2px 0 0",
              background: npc.headColor,
            }}
          />
          {/* Eyes */}
          <div className="absolute flex gap-0.5" style={{ top: "4px", left: "1px" }}>
            <span style={{ width: "2px", height: "2px", background: "hsl(20, 10%, 15%)", borderRadius: "1px" }} />
            <span style={{ width: "2px", height: "2px", background: "hsl(20, 10%, 15%)", borderRadius: "1px", marginLeft: "2px" }} />
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            width: "12px",
            height: "14px",
            borderRadius: "1px",
            background: npc.bodyColor,
            margin: "1px auto 0",
            position: "relative",
          }}
        >
          {/* Worker apron/tool details */}
          {npc.isWorker && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  right: "2px",
                  height: "4px",
                  background: "hsla(25, 15%, 25%, 0.6)",
                  borderRadius: "0 0 1px 1px",
                }}
              />
              {/* Wrench/tool on belt */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1px",
                  right: "-2px",
                  width: "4px",
                  height: "2px",
                  background: "hsl(25, 10%, 45%)",
                  borderRadius: "1px",
                }}
              />
            </>
          )}
        </div>

        {/* Legs */}
        <div className="flex justify-center gap-0.5" style={{ marginTop: "1px" }}>
          <span style={{ width: "4px", height: "5px", background: npc.isWorker ? "hsl(25, 12%, 25%)" : "hsl(25, 15%, 35%)", borderRadius: "0 0 1px 1px" }} />
          <span style={{ width: "4px", height: "5px", background: npc.isWorker ? "hsl(25, 12%, 25%)" : "hsl(25, 15%, 35%)", borderRadius: "0 0 1px 1px" }} />
        </div>
      </div>

      {/* Hover tooltip - handwritten note */}
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
            {npc.name}
          </p>
          <p className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(20, 15%, 40%)" }}>
            {npc.role}
          </p>
        </div>
      )}
    </button>
  );
}
