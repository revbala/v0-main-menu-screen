"use client";

export function MiniMap() {
  return (
    <div className="relative flex flex-col items-center gap-1">
      <div className="font-sans tracking-wider" style={{ fontSize: "0.5rem", color: "hsl(25, 30%, 50%)" }}>
        {"IRONHAVEN"}
      </div>

      {/* Brass compass frame */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-full border-2"
        style={{
          width: "80px",
          height: "80px",
          borderColor: "hsl(35, 50%, 35%)",
          background: "hsl(20, 10%, 10%)",
          boxShadow:
            "inset 0 2px 8px hsla(0,0%,0%,0.6), 0 0 0 3px hsl(35, 40%, 28%), 0 0 0 5px hsl(20, 10%, 12%)",
        }}
      >
        {/* Brass ring gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          aria-hidden="true"
          style={{
            background: "conic-gradient(from 0deg, hsla(35,50%,45%,0.15), hsla(35,50%,30%,0.05), hsla(35,50%,45%,0.15), hsla(35,50%,30%,0.05))",
          }}
        />

        {/* Mini city map dots */}
        <svg viewBox="0 0 60 60" className="h-14 w-14">
          {/* Factory district - top left */}
          <rect x="5" y="5" width="18" height="14" rx="1" fill="hsl(20, 15%, 20%)" opacity="0.7" />
          <rect x="8" y="3" width="2" height="4" fill="hsl(20, 15%, 25%)" />
          <rect x="16" y="2" width="2" height="5" fill="hsl(20, 15%, 25%)" />

          {/* Market - center */}
          <rect x="22" y="22" width="16" height="14" rx="1" fill="hsl(30, 30%, 25%)" opacity="0.6" />
          <circle cx="30" cy="29" r="2" fill="hsl(35, 60%, 45%)" opacity="0.5" />

          {/* Train station - right */}
          <rect x="42" y="15" width="14" height="10" rx="1" fill="hsl(25, 12%, 22%)" opacity="0.6" />
          <line x1="42" y1="20" x2="58" y2="20" stroke="hsl(25, 20%, 35%)" strokeWidth="1" />

          {/* Slums - bottom left */}
          <rect x="3" y="35" width="20" height="18" rx="1" fill="hsl(20, 10%, 18%)" opacity="0.5" />

          {/* Docks - bottom */}
          <rect x="30" y="48" width="20" height="10" rx="1" fill="hsl(210, 20%, 25%)" opacity="0.4" />

          {/* Residential - top right */}
          <rect x="38" y="3" width="18" height="10" rx="1" fill="hsl(25, 15%, 22%)" opacity="0.5" />

          {/* Player location marker */}
          <circle cx="30" cy="29" r="2.5" fill="hsl(25, 90%, 50%)" opacity="0.9">
            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Compass cardinal marks */}
        <span
          className="absolute font-sans"
          style={{ top: "4px", left: "50%", transform: "translateX(-50%)", fontSize: "0.35rem", color: "hsl(35, 50%, 50%)" }}
          aria-hidden="true"
        >
          N
        </span>
        <span
          className="absolute font-sans"
          style={{ bottom: "4px", left: "50%", transform: "translateX(-50%)", fontSize: "0.35rem", color: "hsl(35, 40%, 40%)" }}
          aria-hidden="true"
        >
          S
        </span>
        <span
          className="absolute font-sans"
          style={{ left: "5px", top: "50%", transform: "translateY(-50%)", fontSize: "0.35rem", color: "hsl(35, 40%, 40%)" }}
          aria-hidden="true"
        >
          W
        </span>
        <span
          className="absolute font-sans"
          style={{ right: "5px", top: "50%", transform: "translateY(-50%)", fontSize: "0.35rem", color: "hsl(35, 40%, 40%)" }}
          aria-hidden="true"
        >
          E
        </span>
      </div>
    </div>
  );
}
