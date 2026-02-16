"use client";

import Image from "next/image";
import { NPC, type NPCData } from "./npc";

/** Workers only appear inside the factory -- they wear aprons and carry tools */
const FACTORY_WORKERS: NPCData[] = [
  {
    id: "worker-thomas",
    name: "Thomas",
    role: "Boiler Operator",
    x: 30,
    y: 50,
    bodyColor: "hsl(25, 12%, 28%)",
    headColor: "hsl(20, 8%, 22%)",
    isWorker: true,
  },
  {
    id: "worker-mabel",
    name: "Mabel",
    role: "Riveter",
    x: 65,
    y: 55,
    bodyColor: "hsl(25, 15%, 30%)",
    headColor: "hsl(20, 12%, 28%)",
    isWorker: true,
  },
  {
    id: "foreman-griggs",
    name: "Foreman Griggs",
    role: "Factory Foreman",
    x: 50,
    y: 30,
    bodyColor: "hsl(25, 18%, 32%)",
    headColor: "hsl(30, 15%, 20%)",
    isWorker: true,
    isQuestGiver: true,
    hasQuest: true,
  },
];

interface FactoryInteriorProps {
  onNPCClick: (npc: NPCData) => void;
  onExit: () => void;
  questsAccepted: string[];
}

export function FactoryInterior({ onNPCClick, onExit, questsAccepted }: FactoryInteriorProps) {
  const workers = FACTORY_WORKERS.map((w) => {
    if (w.id === "foreman-griggs") {
      return {
        ...w,
        hasQuest: !questsAccepted.includes("broken-valve") || !questsAccepted.includes("missing-workers"),
      };
    }
    return w;
  });

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/factory-interior.jpg"
          alt=""
          fill
          className="pixel-render object-cover"
          style={{ imageRendering: "pixelated", opacity: 0.3 }}
          priority
        />
      </div>

      {/* Interior dark overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(180deg,
              hsla(20, 10%, 5%, 0.8) 0%,
              hsla(20, 12%, 8%, 0.6) 40%,
              hsla(25, 15%, 6%, 0.7) 100%
            )
          `,
        }}
      />

      {/* Factory machinery SVG */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* Pipes along ceiling */}
        <rect x="0" y="30" width="800" height="6" fill="hsl(25, 10%, 18%)" rx="3" />
        <rect x="0" y="50" width="500" height="4" fill="hsl(25, 8%, 15%)" rx="2" />
        <rect x="550" y="50" width="250" height="4" fill="hsl(25, 8%, 15%)" rx="2" />

        {/* Vertical pipes */}
        <rect x="120" y="30" width="5" height="200" fill="hsl(25, 10%, 16%)" rx="2" />
        <rect x="680" y="30" width="5" height="250" fill="hsl(25, 10%, 16%)" rx="2" />

        {/* Furnace glow */}
        <rect x="50" y="280" width="120" height="100" fill="hsl(20, 12%, 12%)" stroke="hsl(25, 15%, 22%)" strokeWidth="2" rx="2" />
        <rect x="60" y="290" width="40" height="30" fill="hsl(15, 80%, 25%)" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="110" y="290" width="40" height="30" fill="hsl(20, 90%, 30%)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite" />
        </rect>

        {/* Orange glow from furnace */}
        <ellipse cx="110" cy="310" rx="80" ry="50" fill="hsla(25, 90%, 40%, 0.08)">
          <animate attributeName="fill" values="hsla(25,90%,40%,0.06);hsla(25,90%,40%,0.12);hsla(25,90%,40%,0.06)" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* Conveyor belt */}
        <rect x="250" y="350" width="300" height="8" fill="hsl(25, 10%, 14%)" rx="1" />
        <rect x="250" y="350" width="300" height="8" fill="url(#conveyorPattern)" rx="1" opacity="0.4">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="20 0" dur="1s" repeatCount="indefinite" />
        </rect>
        {/* Conveyor supports */}
        <rect x="270" y="358" width="4" height="30" fill="hsl(25, 8%, 16%)" />
        <rect x="400" y="358" width="4" height="30" fill="hsl(25, 8%, 16%)" />
        <rect x="530" y="358" width="4" height="30" fill="hsl(25, 8%, 16%)" />

        {/* Gears on wall */}
        <circle cx="650" cy="150" r="25" fill="none" stroke="hsl(25, 12%, 22%)" strokeWidth="3">
          <animateTransform attributeName="transform" type="rotate" from="0 650 150" to="360 650 150" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="690" cy="185" r="15" fill="none" stroke="hsl(25, 12%, 20%)" strokeWidth="2.5">
          <animateTransform attributeName="transform" type="rotate" from="360 690 185" to="0 690 185" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* Boiler 7 (quest target) */}
        <rect x="600" y="280" width="80" height="120" fill="hsl(20, 10%, 13%)" stroke="hsl(25, 15%, 22%)" strokeWidth="2" rx="3" />
        <text x="640" y="300" textAnchor="middle" fill="hsl(25, 20%, 35%)" fontSize="10" fontFamily="monospace">B-7</text>
        {/* Steam leak */}
        <line x1="620" y1="310" x2="620" y2="280" stroke="hsla(25, 20%, 50%, 0.3)" strokeWidth="3" strokeDasharray="4 3">
          <animate attributeName="strokeDashoffset" from="0" to="-14" dur="0.8s" repeatCount="indefinite" />
        </line>

        {/* Pattern def */}
        <defs>
          <pattern id="conveyorPattern" width="20" height="8" patternUnits="userSpaceOnUse">
            <rect width="20" height="8" fill="transparent" />
            <line x1="10" y1="0" x2="10" y2="8" stroke="hsl(25, 8%, 20%)" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>

      {/* "FACTORY FLOOR" header */}
      <div className="relative z-10 px-4 pt-3">
        <h2
          className="font-sans tracking-widest"
          style={{
            fontSize: "clamp(0.6rem, 2vw, 0.9rem)",
            color: "hsl(25, 70%, 55%)",
            textShadow: "0 0 8px hsla(25, 80%, 50%, 0.3), 2px 2px 0 hsl(20, 10%, 6%)",
          }}
        >
          {"FACTORY FLOOR"}
        </h2>
        <p className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(25, 15%, 35%)" }}>
          {"Workers only. Watch for steam leaks."}
        </p>
      </div>

      {/* Exit door */}
      <button
        className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 border-2 px-3 py-1.5 font-sans text-xs tracking-wider transition-all duration-150 hover:border-orange-500"
        style={{
          borderColor: "hsl(25, 15%, 25%)",
          background: "linear-gradient(180deg, hsl(25, 12%, 15%), hsl(20, 10%, 10%))",
          color: "hsl(25, 25%, 50%)",
        }}
        onClick={onExit}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.color = "hsl(25, 80%, 55%)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.color = "hsl(25, 25%, 50%)";
        }}
      >
        {"EXIT FACTORY"}
      </button>

      {/* Worker NPCs */}
      <div className="absolute inset-0 z-10">
        {workers.map((npc) => (
          <NPC key={npc.id} npc={npc} onClick={onNPCClick} />
        ))}
      </div>
    </div>
  );
}
