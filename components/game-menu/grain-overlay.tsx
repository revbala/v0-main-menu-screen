"use client";

export function GrainOverlay() {
  return (
    <>
      {/* Film grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          animation: "grain-shift 0.5s steps(4) infinite",
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />

      {/* Scanline */}
      <div
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 h-1"
          style={{
            background:
              "linear-gradient(180deg, transparent, hsla(25, 60%, 50%, 0.04), transparent)",
            animation: "scanline 8s linear infinite",
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsla(20, 10%, 4%, 0.7) 100%)",
        }}
      />
    </>
  );
}
