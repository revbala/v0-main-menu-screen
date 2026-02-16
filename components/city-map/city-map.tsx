"use client";

import { useState } from "react";
import Image from "next/image";
import { District } from "./district";
import {
  FactorySmoke,
  TrainAnimation,
  NPCWalkers,
  StreetLamps,
  SteamVents,
  DockBoats,
  FactoryPistons,
} from "./map-animations";
import { GrainOverlay } from "../game-menu/grain-overlay";
import { FlickerLamp } from "../game-menu/flicker-lamp";
import { RivetedButton } from "../game-hud/riveted-button";

interface CityMapProps {
  onBack?: () => void;
  onDistrictSelect?: (district: string) => void;
}

const DISTRICTS = [
  {
    id: "factory",
    name: "FACTORY DISTRICT",
    description: "Click to enter the smoke-filled factories",
    x: "3%",
    y: "5%",
    width: "32%",
    height: "30%",
    color: "hsla(20, 12%, 12%, 0.85)",
    borderColor: "hsl(20, 15%, 20%)",
  },
  {
    id: "residential",
    name: "RESIDENTIAL QUARTER",
    description: "Quiet homes of Ironhaven's workers",
    x: "62%",
    y: "3%",
    width: "35%",
    height: "25%",
    color: "hsla(25, 15%, 14%, 0.85)",
    borderColor: "hsl(25, 15%, 22%)",
  },
  {
    id: "market",
    name: "MARKET SQUARE",
    description: "Trade goods and hear the latest rumors",
    x: "25%",
    y: "38%",
    width: "30%",
    height: "22%",
    color: "hsla(30, 20%, 16%, 0.85)",
    borderColor: "hsl(35, 25%, 28%)",
  },
  {
    id: "station",
    name: "TRAIN STATION",
    description: "Board the next train out of Ironhaven",
    x: "58%",
    y: "30%",
    width: "38%",
    height: "20%",
    color: "hsla(25, 10%, 13%, 0.85)",
    borderColor: "hsl(25, 12%, 22%)",
    pulse: true,
  },
  {
    id: "slums",
    name: "THE SLUMS",
    description: "Cramped quarters where hope is scarce",
    x: "3%",
    y: "40%",
    width: "20%",
    height: "30%",
    color: "hsla(20, 8%, 11%, 0.85)",
    borderColor: "hsl(20, 10%, 18%)",
  },
  {
    id: "docks",
    name: "RIVER DOCKS",
    description: "Boats arrive with supplies from upstream",
    x: "28%",
    y: "72%",
    width: "35%",
    height: "25%",
    color: "hsla(210, 15%, 14%, 0.85)",
    borderColor: "hsl(210, 15%, 22%)",
  },
];

export function CityMap({ onBack, onDistrictSelect }: CityMapProps) {
  const [timeHour, setTimeHour] = useState(18);
  const isNight = timeHour >= 20 || timeHour < 6;
  const isDusk = timeHour >= 17 && timeHour < 20;

  const skyColor = isNight
    ? "hsl(220, 15%, 6%)"
    : isDusk
      ? "hsl(20, 25%, 10%)"
      : "hsl(25, 12%, 12%)";

  const timeLabel = `${timeHour.toString().padStart(2, "0")}:00`;

  return (
    <main className="relative flex min-h-svh flex-col items-center overflow-hidden" style={{ background: skyColor, transition: "background 1s" }}>
      {/* Background map image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/ironhaven-map.jpg"
          alt=""
          fill
          className="pixel-render object-cover"
          style={{
            imageRendering: "pixelated",
            opacity: isNight ? 0.15 : 0.25,
            filter: isNight ? "brightness(0.5) saturate(0.3)" : "none",
            transition: "opacity 1s, filter 1s",
          }}
          priority
        />
        {/* Dark overlay for night */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: isNight
              ? "hsla(220, 15%, 3%, 0.5)"
              : "transparent",
          }}
        />
      </div>

      <FlickerLamp />

      {/* Header */}
      <div className="relative z-10 flex w-full items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div>
          <h1
            className="font-sans tracking-widest"
            style={{
              fontSize: "clamp(0.8rem, 2.5vw, 1.4rem)",
              color: "hsl(25, 70%, 55%)",
              textShadow: "0 0 8px hsla(25, 80%, 50%, 0.3), 2px 2px 0 hsl(20, 10%, 8%)",
            }}
          >
            {"IRONHAVEN"}
          </h1>
          <p className="font-mono tracking-wide" style={{ fontSize: "0.5rem", color: "hsl(25, 20%, 40%)" }}>
            {"CITY OF SMOKE AND STEEL"}
          </p>
        </div>

        {/* Time indicator & slider */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span
              className="font-mono"
              style={{
                fontSize: "0.7rem",
                color: isNight ? "hsl(220, 30%, 55%)" : "hsl(25, 60%, 55%)",
                textShadow: isNight ? "0 0 6px hsla(220, 50%, 50%, 0.4)" : "0 0 6px hsla(25, 80%, 50%, 0.3)",
              }}
            >
              {timeLabel}
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: "0.4rem",
                color: isNight ? "hsl(220, 25%, 45%)" : isDusk ? "hsl(25, 50%, 50%)" : "hsl(35, 40%, 50%)",
              }}
            >
              {isNight ? "NIGHT" : isDusk ? "DUSK" : timeHour < 12 ? "MORNING" : "AFTERNOON"}
            </span>
          </div>

          {/* Day/night slider */}
          <div className="flex items-center gap-2">
            <span className="font-sans" style={{ fontSize: "0.35rem", color: "hsl(25, 20%, 35%)" }}>06</span>
            <input
              type="range"
              min={0}
              max={23}
              value={timeHour}
              onChange={(e) => setTimeHour(Number(e.target.value))}
              className="h-1 w-24 cursor-pointer appearance-none rounded-full sm:w-32"
              style={{
                background: `linear-gradient(90deg,
                  hsl(220, 20%, 20%) 0%,
                  hsl(25, 50%, 35%) 30%,
                  hsl(35, 60%, 45%) 50%,
                  hsl(25, 50%, 35%) 70%,
                  hsl(220, 20%, 20%) 100%
                )`,
                accentColor: "hsl(25, 80%, 50%)",
              }}
              aria-label="Time of day"
            />
            <span className="font-sans" style={{ fontSize: "0.35rem", color: "hsl(25, 20%, 35%)" }}>23</span>
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-3 py-2 sm:px-6">
        <div
          className="relative w-full overflow-hidden border-2"
          style={{
            paddingBottom: "70%",
            borderColor: "hsl(25, 15%, 20%)",
            background: isNight ? "hsl(220, 10%, 5%)" : "hsl(20, 10%, 7%)",
            boxShadow: "inset 0 2px 12px hsla(0,0%,0%,0.6), 0 0 0 4px hsl(25, 12%, 12%)",
            transition: "background 1s",
          }}
        >
          {/* Grid lines - roads */}
          <div className="absolute inset-0" aria-hidden="true">
            {/* Horizontal roads */}
            <div className="absolute" style={{ left: "5%", top: "36%", width: "90%", height: "2px", background: "hsl(25, 8%, 16%)" }} />
            <div className="absolute" style={{ left: "5%", top: "64%", width: "65%", height: "2px", background: "hsl(25, 8%, 16%)" }} />
            {/* Vertical roads */}
            <div className="absolute" style={{ left: "24%", top: "5%", width: "2px", height: "90%", background: "hsl(25, 8%, 16%)" }} />
            <div className="absolute" style={{ left: "57%", top: "5%", width: "2px", height: "65%", background: "hsl(25, 8%, 16%)" }} />
            {/* River */}
            <div
              className="absolute"
              style={{
                left: "25%",
                top: "68%",
                width: "42%",
                height: "4px",
                borderRadius: "2px",
                background: isNight
                  ? "linear-gradient(90deg, hsla(210, 25%, 18%, 0.8), hsla(210, 30%, 22%, 0.8), hsla(210, 25%, 18%, 0.8))"
                  : "linear-gradient(90deg, hsla(210, 25%, 25%, 0.6), hsla(210, 30%, 30%, 0.6), hsla(210, 25%, 25%, 0.6))",
                backgroundSize: "200% 100%",
                animation: "water-shimmer 4s linear infinite",
                transition: "background 1s",
              }}
            />
          </div>

          {/* Districts */}
          {DISTRICTS.map((d) => (
            <District
              key={d.id}
              name={d.name}
              description={d.description}
              x={d.x}
              y={d.y}
              width={d.width}
              height={d.height}
              color={d.color}
              borderColor={d.borderColor}
              pulse={d.pulse}
              onClick={() => onDistrictSelect?.(d.id)}
            >
              {/* District-specific content */}
              {d.id === "factory" && (
                <>
                  {/* Smokestacks */}
                  <div className="absolute left-2 top-1" aria-hidden="true" style={{ width: "3px", height: "14px", background: "hsl(20, 10%, 20%)" }} />
                  <div className="absolute left-5 top-2" aria-hidden="true" style={{ width: "3px", height: "12px", background: "hsl(20, 10%, 20%)" }} />
                  <div className="absolute right-4 top-1" aria-hidden="true" style={{ width: "4px", height: "16px", background: "hsl(20, 10%, 20%)" }} />
                </>
              )}
              {d.id === "slums" && (
                <>
                  {/* Clotheslines */}
                  <div
                    className="absolute"
                    aria-hidden="true"
                    style={{
                      left: "20%",
                      top: "30%",
                      width: "60%",
                      height: "1px",
                      background: "hsl(25, 10%, 25%)",
                      animation: "clothesline-sway 3s ease-in-out infinite",
                      transformOrigin: "left center",
                    }}
                  />
                </>
              )}
              {d.id === "market" && (
                <>
                  {/* Colorful market stalls */}
                  {[
                    { left: "10%", top: "25%", bg: "hsl(25, 50%, 35%)" },
                    { left: "35%", top: "20%", bg: "hsl(35, 60%, 40%)" },
                    { left: "60%", top: "30%", bg: "hsl(15, 40%, 30%)" },
                    { left: "80%", top: "22%", bg: "hsl(30, 45%, 38%)" },
                  ].map((stall, i) => (
                    <div
                      key={i}
                      className="absolute"
                      aria-hidden="true"
                      style={{
                        left: stall.left,
                        top: stall.top,
                        width: "6px",
                        height: "5px",
                        background: stall.bg,
                        borderRadius: "1px",
                      }}
                    />
                  ))}
                </>
              )}
            </District>
          ))}

          {/* Animated elements */}
          <FactorySmoke />
          <FactoryPistons />
          <TrainAnimation />
          <NPCWalkers />
          <StreetLamps isNight={isNight} />
          <SteamVents />
          <DockBoats />
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 flex w-full items-center justify-between px-4 py-3 sm:px-6">
        <RivetedButton onClick={onBack}>
          {"BACK"}
        </RivetedButton>
        <p className="font-mono" style={{ fontSize: "0.45rem", color: "hsl(25, 15%, 30%)" }}>
          {"CLICK A DISTRICT TO ENTER"}
        </p>
      </div>

      <GrainOverlay />
    </main>
  );
}
