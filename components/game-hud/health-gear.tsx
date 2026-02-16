"use client";

interface HealthGearProps {
  health: number; // 0-100
  maxHealth?: number;
}

export function HealthGear({ health, maxHealth = 100 }: HealthGearProps) {
  const pct = Math.min(100, Math.max(0, (health / maxHealth) * 100));
  const teeth = 12;
  const outerR = 40;
  const innerR = 30;
  const toothH = 8;

  // Generate gear SVG path
  function gearPath() {
    const pts: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2;
      const a2 = ((i + 0.35) / teeth) * Math.PI * 2;
      const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const a4 = ((i + 0.85) / teeth) * Math.PI * 2;

      const r1 = outerR;
      const r2 = outerR + toothH;

      pts.push(`${50 + r1 * Math.cos(a1)},${50 + r1 * Math.sin(a1)}`);
      pts.push(`${50 + r2 * Math.cos(a2)},${50 + r2 * Math.sin(a2)}`);
      pts.push(`${50 + r2 * Math.cos(a3)},${50 + r2 * Math.sin(a3)}`);
      pts.push(`${50 + r1 * Math.cos(a4)},${50 + r1 * Math.sin(a4)}`);
    }
    return `M${pts.join("L")}Z`;
  }

  const fillAngle = (pct / 100) * 360;
  const fillRad = (fillAngle * Math.PI) / 180;
  const largeArc = fillAngle > 180 ? 1 : 0;
  const endX = 50 + innerR * Math.sin(fillRad);
  const endY = 50 - innerR * Math.cos(fillRad);

  const fillColor =
    pct > 60
      ? "hsl(25, 90%, 50%)"
      : pct > 30
        ? "hsl(35, 80%, 45%)"
        : "hsl(0, 70%, 45%)";

  return (
    <div className="relative flex flex-col items-center gap-1">
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16 drop-shadow-lg sm:h-20 sm:w-20"
        role="img"
        aria-label={`Health: ${health} of ${maxHealth}`}
      >
        {/* Outer gear shape - dark metal */}
        <path d={gearPath()} fill="hsl(20, 10%, 18%)" stroke="hsl(20, 8%, 25%)" strokeWidth="1" />

        {/* Inner ring - dark background */}
        <circle cx="50" cy="50" r={innerR} fill="hsl(20, 10%, 10%)" />

        {/* Health fill arc */}
        {pct > 0 && (
          <path
            d={
              pct >= 100
                ? `M50,${50 - innerR} A${innerR},${innerR} 0 1,1 49.99,${50 - innerR} Z`
                : `M50,${50 - innerR} A${innerR},${innerR} 0 ${largeArc},1 ${endX},${endY} L50,50 Z`
            }
            fill={fillColor}
            opacity={0.85}
          />
        )}

        {/* Center bolt */}
        <circle cx="50" cy="50" r="6" fill="hsl(20, 10%, 22%)" stroke="hsl(20, 8%, 30%)" strokeWidth="1" />
        <circle cx="50" cy="50" r="2.5" fill="hsl(20, 8%, 15%)" />

        {/* Inner ring border */}
        <circle cx="50" cy="50" r={innerR} fill="none" stroke="hsl(25, 15%, 28%)" strokeWidth="1.5" />
      </svg>

      {/* Health text */}
      <span
        className="font-sans text-center"
        style={{
          fontSize: "0.55rem",
          color: fillColor,
          textShadow: `0 0 6px ${fillColor}`,
        }}
      >
        {health}/{maxHealth}
      </span>
    </div>
  );
}
