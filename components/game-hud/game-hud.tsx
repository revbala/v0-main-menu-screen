"use client";

import { useState } from "react";
import { HealthGear } from "./health-gear";
import { Inventory } from "./inventory";
import { MiniMap } from "./mini-map";
import { GameClock } from "./game-clock";
import { QuestTracker } from "./quest-tracker";
import { TrainTickets } from "./train-tickets";
import { CharacterDisplay } from "./character-display";
import { RivetedButton } from "./riveted-button";
import { GrainOverlay } from "../game-menu/grain-overlay";
import { FlickerLamp } from "../game-menu/flicker-lamp";

interface GameHUDProps {
  onBack?: () => void;
  onOpenMap?: () => void;
  onGoFactory?: () => void;
}

export function GameHUD({ onBack, onOpenMap, onGoFactory }: GameHUDProps) {
  const [health, setHealth] = useState(72);
  const [tickets, setTickets] = useState(3);
  const [showQuests, setShowQuests] = useState(true);

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden" style={{ background: "hsl(20, 10%, 8%)" }}>
      {/* Background scene - dark industrial interior */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                hsl(20, 8%, 6%) 0%,
                hsl(20, 12%, 10%) 30%,
                hsl(25, 15%, 12%) 60%,
                hsl(20, 10%, 7%) 100%
              )
            `,
          }}
        />
        {/* Workshop interior elements */}
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          {/* Workbench */}
          <rect x="50" y="380" width="700" height="8" fill="hsl(25, 20%, 15%)" />
          <rect x="80" y="388" width="12" height="212" fill="hsl(25, 15%, 12%)" />
          <rect x="710" y="388" width="12" height="212" fill="hsl(25, 15%, 12%)" />
          {/* Shelves */}
          <rect x="30" y="200" width="200" height="4" fill="hsl(25, 15%, 14%)" />
          <rect x="30" y="280" width="200" height="4" fill="hsl(25, 15%, 14%)" />
          {/* Hanging lamp */}
          <line x1="400" y1="0" x2="400" y2="80" stroke="hsl(25, 10%, 18%)" strokeWidth="2" />
          <polygon points="385,80 415,80 420,95 380,95" fill="hsl(25, 15%, 15%)" />
          <ellipse cx="400" cy="100" rx="30" ry="15" fill="hsla(30, 80%, 45%, 0.08)" />
          {/* Pipes */}
          <rect x="0" y="50" width="800" height="6" fill="hsl(25, 10%, 13%)" rx="3" />
          <rect x="0" y="120" width="400" height="4" fill="hsl(25, 8%, 11%)" rx="2" />
          <rect x="600" y="120" width="200" height="4" fill="hsl(25, 8%, 11%)" rx="2" />
        </svg>
      </div>

      <FlickerLamp />

      {/* Top HUD bar */}
      <div className="relative z-10 flex items-start justify-between gap-2 p-3 sm:p-4">
        {/* Left: Health + Tickets */}
        <div className="flex flex-col gap-3">
          <HealthGear health={health} maxHealth={100} />
          <TrainTickets count={tickets} />
        </div>

        {/* Center: Clock */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <GameClock />
        </div>

        {/* Right: Mini-map */}
        <MiniMap />
      </div>

      {/* Middle: Character + Inventory side by side */}
      <div className="relative z-10 flex flex-1 items-center justify-center gap-6 px-3 sm:gap-10 sm:px-6">
        {/* Left: Character */}
        <CharacterDisplay />

        {/* Right: Inventory + Controls */}
        <div className="flex flex-col gap-4">
          <Inventory />

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <RivetedButton onClick={() => setHealth((h) => Math.min(100, h + 10))}>
              {"USE POTION"}
            </RivetedButton>
            <RivetedButton onClick={() => setTickets((t) => Math.max(0, t - 1))}>
              {"USE TICKET"}
            </RivetedButton>
            <RivetedButton onClick={onOpenMap}>
              {"OPEN MAP"}
            </RivetedButton>
            <RivetedButton onClick={onGoFactory}>
              {"FACTORY"}
            </RivetedButton>
          </div>
        </div>
      </div>

      {/* Bottom: Quest tracker + nav */}
      <div className="relative z-10 flex items-end justify-between gap-2 p-3 sm:p-4">
        {/* Quest tracker */}
        <div>
          <RivetedButton onClick={() => setShowQuests((s) => !s)} className="mb-2">
            {showQuests ? "HIDE QUESTS" : "SHOW QUESTS"}
          </RivetedButton>
          {showQuests && (
            <div style={{ animation: "notebook-slide 0.3s ease-out" }}>
              <QuestTracker />
            </div>
          )}
        </div>

        {/* Back to menu */}
        <div className="flex flex-col items-end gap-2">
          <RivetedButton onClick={onBack}>
            {"MAIN MENU"}
          </RivetedButton>
          <p className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(25, 15%, 30%)" }}>
            {"ESC TO PAUSE"}
          </p>
        </div>
      </div>

      <GrainOverlay />
    </main>
  );
}
