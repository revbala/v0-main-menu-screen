"use client";

export function FlickerLamp() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, hsla(30, 80%, 45%, 0.08) 0%, transparent 70%)",
        animation: "lamp-flicker 4s ease-in-out infinite",
      }}
    />
  );
}
