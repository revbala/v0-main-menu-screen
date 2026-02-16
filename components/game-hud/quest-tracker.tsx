"use client";

interface Quest {
  id: string;
  title: string;
  objective: string;
  progress: string;
  done: boolean;
}

const QUESTS: Quest[] = [
  { id: "q1", title: "Fix the Boiler", objective: "Find replacement valve in Market", progress: "0/1", done: false },
  { id: "q2", title: "Coal Delivery", objective: "Deliver 5 coal to Station Master", progress: "3/5", done: false },
  { id: "q3", title: "Old Debts", objective: "Speak with Margaret at the Slums", progress: "done", done: true },
];

export function QuestTracker() {
  return (
    <div
      className="relative border-2 px-3 py-2"
      style={{
        background: "hsla(40, 25%, 82%, 0.95)",
        borderColor: "hsl(30, 20%, 60%)",
        boxShadow: "3px 4px 10px hsla(0,0%,0%,0.5)",
        transform: "rotate(-0.5deg)",
        maxWidth: "200px",
      }}
    >
      {/* Paper texture lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              top: `${18 + i * 16}px`,
              height: "1px",
              background: "hsla(210, 15%, 70%, 0.3)",
            }}
          />
        ))}
        {/* Red margin line */}
        <div
          className="absolute top-0 h-full"
          style={{ left: "18px", width: "1px", background: "hsla(0, 50%, 60%, 0.3)" }}
        />
      </div>

      {/* Header */}
      <p
        className="relative mb-2 font-mono font-bold"
        style={{
          fontSize: "0.6rem",
          color: "hsl(20, 30%, 25%)",
          borderBottom: "1px solid hsl(30, 20%, 65%)",
          paddingBottom: "3px",
        }}
      >
        {"ACTIVE QUESTS"}
      </p>

      {/* Quest list */}
      <div className="relative flex flex-col gap-2">
        {QUESTS.map((q) => (
          <div key={q.id} className="flex flex-col gap-0.5" style={{ opacity: q.done ? 0.5 : 1 }}>
            <div className="flex items-start gap-1">
              {/* Checkbox */}
              <span
                className="mt-0.5 flex h-3 w-3 flex-shrink-0 items-center justify-center border"
                style={{
                  borderColor: "hsl(20, 20%, 45%)",
                  background: q.done ? "hsl(25, 40%, 50%)" : "transparent",
                  fontSize: "0.4rem",
                  color: "hsl(40, 30%, 85%)",
                }}
              >
                {q.done ? "X" : ""}
              </span>
              <div>
                <p
                  className="font-mono font-bold leading-tight"
                  style={{
                    fontSize: "0.5rem",
                    color: "hsl(20, 30%, 25%)",
                    textDecoration: q.done ? "line-through" : "none",
                  }}
                >
                  {q.title}
                </p>
                <p className="font-mono leading-tight" style={{ fontSize: "0.45rem", color: "hsl(20, 15%, 40%)" }}>
                  {q.objective}
                </p>
                {!q.done && (
                  <span className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(25, 60%, 45%)" }}>
                    [{q.progress}]
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paper fold corner */}
      <div
        className="absolute bottom-0 right-0 h-3 w-3"
        aria-hidden="true"
        style={{
          background: "linear-gradient(135deg, hsl(40, 25%, 82%) 50%, hsl(30, 20%, 65%) 50%)",
        }}
      />
    </div>
  );
}
