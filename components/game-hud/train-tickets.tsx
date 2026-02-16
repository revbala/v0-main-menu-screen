"use client";

export function TrainTickets({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Ticket icon */}
      <div
        className="relative flex items-center justify-center border-2"
        style={{
          width: "52px",
          height: "28px",
          borderColor: "hsl(35, 40%, 35%)",
          background: "linear-gradient(135deg, hsl(35, 30%, 22%), hsl(30, 20%, 16%))",
          boxShadow: "inset 0 1px 3px hsla(0,0%,0%,0.4)",
        }}
      >
        {/* Perforated edge */}
        <div className="pointer-events-none absolute -left-px top-0 flex h-full flex-col justify-evenly" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1 rounded-r-full" style={{ background: "hsl(20, 10%, 10%)" }} />
          ))}
        </div>

        {/* Count */}
        <span
          className="font-sans"
          style={{
            fontSize: "0.85rem",
            color: "hsl(25, 80%, 55%)",
            textShadow: "0 0 6px hsla(25, 90%, 50%, 0.4)",
          }}
        >
          {count}
        </span>
      </div>

      {/* Label */}
      <span className="font-sans tracking-wider" style={{ fontSize: "0.4rem", color: "hsl(25, 30%, 50%)" }}>
        {"TICKETS"}
      </span>
    </div>
  );
}
