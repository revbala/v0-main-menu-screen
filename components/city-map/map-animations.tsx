"use client";

import { useEffect, useState } from "react";

/** Animated factory smoke columns for the map */
export function FactorySmoke() {
  const [particles, setParticles] = useState<
    { id: number; x: number; delay: number; dur: number; size: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 8 + (i % 4) * 6,
        delay: i * 0.6,
        dur: 3 + (i % 3),
        size: 4 + (i % 3) * 2,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: "5%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "radial-gradient(circle, hsla(20, 8%, 35%, 0.5) 0%, transparent 100%)",
            animation: `smoke-drift ${p.dur}s ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Animated train moving on tracks */
export function TrainAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Track line */}
      <div
        className="absolute"
        style={{
          left: "55%",
          top: "38%",
          width: "40%",
          height: "3px",
          background: "linear-gradient(90deg, hsl(25, 15%, 20%), hsl(25, 10%, 25%), hsl(25, 15%, 20%))",
        }}
      >
        {/* Rail ties */}
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="absolute top-0.5"
            style={{
              left: `${i * 8.5}%`,
              width: "4px",
              height: "5px",
              background: "hsl(25, 10%, 18%)",
            }}
          />
        ))}
      </div>

      {/* Train */}
      <div
        className="absolute"
        style={{
          top: "36.5%",
          left: "55%",
          width: "40%",
          height: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2px",
            animation: "train-move 12s linear infinite",
            width: "30px",
          }}
        >
          {/* Engine */}
          <div
            style={{
              width: "14px",
              height: "8px",
              background: "hsl(20, 12%, 18%)",
              border: "1px solid hsl(25, 15%, 25%)",
              borderRadius: "1px 3px 1px 1px",
            }}
          />
          {/* Cars */}
          {[0, 1].map((c) => (
            <div
              key={c}
              style={{
                width: "10px",
                height: "7px",
                background: "hsl(25, 10%, 15%)",
                border: "1px solid hsl(25, 12%, 22%)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** NPCs walking between buildings */
export function NPCWalkers() {
  const [npcs, setNpcs] = useState<
    { id: number; x: number; y: number; dir: "h" | "v"; dist: number; dur: number; delay: number; color: string }[]
  >([]);

  useEffect(() => {
    const colors = [
      "hsl(25, 30%, 40%)",
      "hsl(30, 25%, 35%)",
      "hsl(20, 20%, 38%)",
      "hsl(35, 30%, 42%)",
      "hsl(15, 25%, 36%)",
    ];
    setNpcs(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: 20 + i * 15 + Math.random() * 5,
        y: 30 + (i % 3) * 20 + Math.random() * 10,
        dir: i % 2 === 0 ? "h" : "v",
        dist: 15 + Math.random() * 25,
        dur: 4 + Math.random() * 4,
        delay: i * 1.2,
        color: colors[i % colors.length],
      }))
    );
  }, []);

  if (npcs.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {npcs.map((npc) => (
        <span
          key={npc.id}
          className="absolute rounded-sm"
          style={{
            left: `${npc.x}%`,
            top: `${npc.y}%`,
            width: "4px",
            height: "4px",
            background: npc.color,
            boxShadow: `0 0 3px ${npc.color}`,
            ["--walk-dist" as string]: `${npc.dist}px`,
            animation: `npc-walk-${npc.dir} ${npc.dur}s ${npc.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Street lamps that flicker at night */
export function StreetLamps({ isNight }: { isNight: boolean }) {
  const lamps = [
    { x: "22%", y: "45%" },
    { x: "42%", y: "52%" },
    { x: "65%", y: "42%" },
    { x: "78%", y: "65%" },
    { x: "35%", y: "72%" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {lamps.map((lamp, i) => (
        <div key={i} className="absolute" style={{ left: lamp.x, top: lamp.y }}>
          {/* Lamp post */}
          <div
            className="absolute"
            style={{
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%)",
              width: "2px",
              height: "8px",
              background: "hsl(25, 10%, 20%)",
            }}
          />
          {/* Light glow */}
          <div
            className="rounded-full"
            style={{
              width: isNight ? "10px" : "4px",
              height: isNight ? "10px" : "4px",
              background: isNight
                ? "radial-gradient(circle, hsla(35, 80%, 55%, 0.9), hsla(30, 70%, 40%, 0.3), transparent)"
                : "hsl(35, 30%, 35%)",
              boxShadow: isNight ? "0 0 12px 4px hsla(35, 80%, 50%, 0.3)" : "none",
              animation: isNight ? `lamp-flicker ${3 + i * 0.5}s ease-in-out infinite` : "none",
              transition: "all 0.5s",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/** Steam vents from street grates */
export function SteamVents() {
  const vents = [
    { x: "28%", y: "55%", delay: 0 },
    { x: "52%", y: "48%", delay: 2 },
    { x: "70%", y: "60%", delay: 4 },
    { x: "40%", y: "68%", delay: 6 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {vents.map((vent, i) => (
        <div key={i} className="absolute" style={{ left: vent.x, top: vent.y }}>
          {/* Grate */}
          <div style={{ width: "6px", height: "3px", background: "hsl(25, 10%, 18%)", borderRadius: "1px" }} />
          {/* Steam puff */}
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2"
            style={{
              width: "8px",
              height: "16px",
              background: "linear-gradient(0deg, hsla(25, 15%, 45%, 0.4), transparent)",
              animation: `vent-burst ${8}s ${vent.delay}s linear infinite`,
              transformOrigin: "bottom center",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/** Boats bobbing in the dock */
export function DockBoats() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {[
        { x: "38%", y: "85%", delay: 0 },
        { x: "48%", y: "87%", delay: 0.5 },
        { x: "55%", y: "84%", delay: 1 },
      ].map((boat, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: boat.x,
            top: boat.y,
            animation: `boat-bob ${2.5 + i * 0.3}s ${boat.delay}s ease-in-out infinite`,
          }}
        >
          <svg width="12" height="8" viewBox="0 0 12 8">
            <path d="M1,5 L3,2 L9,2 L11,5 Z" fill="hsl(25, 20%, 25%)" stroke="hsl(25, 15%, 30%)" strokeWidth="0.5" />
            <line x1="6" y1="2" x2="6" y2="0" stroke="hsl(25, 10%, 30%)" strokeWidth="0.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/** Animated pistons in factory district */
export function FactoryPistons() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {[
        { x: "10%", y: "18%", delay: 0 },
        { x: "18%", y: "16%", delay: 0.3 },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: p.x, top: p.y, animation: `piston-pump 1.2s ${p.delay}s ease-in-out infinite` }}
        >
          <div style={{ width: "4px", height: "10px", background: "hsl(25, 12%, 22%)", borderRadius: "1px" }} />
        </div>
      ))}
    </div>
  );
}
