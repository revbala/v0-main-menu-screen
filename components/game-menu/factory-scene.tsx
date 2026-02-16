"use client";

import { SmokeStacks } from "./smoke-stacks";

export function FactoryScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sunset sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              hsl(20, 12%, 6%) 0%,
              hsl(15, 25%, 10%) 25%,
              hsl(20, 50%, 15%) 45%,
              hsl(25, 70%, 22%) 60%,
              hsl(30, 80%, 28%) 72%,
              hsl(25, 60%, 18%) 85%,
              hsl(20, 12%, 6%) 100%
            )
          `,
        }}
      />

      {/* Sun / glow at horizon */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "28%",
          width: "clamp(200px, 40vw, 500px)",
          height: "clamp(60px, 10vw, 120px)",
          background:
            "radial-gradient(ellipse, hsla(30, 100%, 50%, 0.35) 0%, hsla(25, 80%, 40%, 0.1) 50%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      {/* Factory background image */}
      <div
        className="pixel-render absolute inset-0"
        style={{
          backgroundImage: "url(/images/factory-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          opacity: 0.35,
          mixBlendMode: "multiply",
        }}
      />

      {/* Factory silhouette - SVG overlay */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        style={{ height: "35%", minHeight: "180px" }}
      >
        {/* Main factory body */}
        <path
          d="M0,300 L0,220 L40,220 L40,180 L80,180 L80,140 L100,140 L100,120 L110,120 L110,60 L125,60 L125,120 L135,120 L135,140 L160,140 L160,180 L200,180 L200,200 L260,200 L260,160 L280,160 L280,130 L290,130 L290,50 L305,50 L305,130 L315,130 L315,160 L340,160 L340,200 L400,200 L400,220 L450,220 L450,180 L480,180 L480,140 L500,140 L500,160 L520,160 L520,200 L560,200 L560,170 L590,170 L590,130 L600,130 L600,40 L615,40 L615,130 L625,130 L625,170 L660,170 L660,190 L700,190 L700,160 L720,160 L720,200 L760,200 L760,180 L800,180 L800,200 L830,200 L830,150 L850,150 L850,80 L860,80 L860,30 L875,30 L875,80 L885,80 L885,150 L910,150 L910,190 L960,190 L960,210 L1000,210 L1000,180 L1040,180 L1040,200 L1080,200 L1080,160 L1100,160 L1100,120 L1110,120 L1110,70 L1125,70 L1125,120 L1135,120 L1135,160 L1160,160 L1160,200 L1200,200 L1200,300 Z"
          fill="hsl(20, 10%, 5%)"
        />

        {/* Smaller structures */}
        <rect
          x="180"
          y="230"
          width="60"
          height="70"
          fill="hsl(20, 10%, 7%)"
        />
        <rect
          x="430"
          y="240"
          width="40"
          height="60"
          fill="hsl(20, 10%, 6%)"
        />
        <rect
          x="680"
          y="230"
          width="50"
          height="70"
          fill="hsl(20, 10%, 7%)"
        />
        <rect
          x="950"
          y="240"
          width="55"
          height="60"
          fill="hsl(20, 10%, 6%)"
        />

        {/* Window lights */}
        {[210, 225, 465, 705, 720, 975].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={255}
            width={5}
            height={6}
            fill="hsl(30, 80%, 50%)"
            opacity={0.6}
          />
        ))}
      </svg>

      {/* Animated smoke from stacks */}
      <SmokeStacks />
    </div>
  );
}
