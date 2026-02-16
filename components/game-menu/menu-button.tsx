"use client";

import { useState, useCallback, type ReactNode } from "react";

interface MenuButtonProps {
  label: string;
  icon: ReactNode;
  index: number;
  variant?: "primary" | "steel" | "default";
  spinIcon?: boolean;
  onClick?: () => void;
}

export function MenuButton({
  label,
  icon,
  index,
  variant = "default",
  spinIcon = false,
  onClick,
}: MenuButtonProps) {
  const [hovered, setHovered] = useState(false);

  const baseColor =
    variant === "primary"
      ? "hsl(25, 90%, 50%)"
      : variant === "steel"
        ? "hsl(25, 8%, 50%)"
        : "hsl(25, 15%, 42%)";

  const hoverColor =
    variant === "primary"
      ? "hsl(25, 100%, 58%)"
      : variant === "steel"
        ? "hsl(25, 15%, 62%)"
        : "hsl(25, 30%, 55%)";

  const glowColor =
    variant === "primary"
      ? "0 0 12px hsla(25, 100%, 55%, 0.6), 0 0 24px hsla(25, 100%, 45%, 0.3)"
      : variant === "steel"
        ? "0 0 8px hsla(25, 10%, 50%, 0.3)"
        : "0 0 8px hsla(25, 30%, 50%, 0.3)";

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <button
      className="group relative flex w-full max-w-xs items-center gap-3 border-2 px-4 py-3 font-sans text-xs transition-all duration-200 sm:gap-4 sm:px-6 sm:py-4 sm:text-sm"
      style={{
        animation: `menu-slide-in 0.4s ${0.6 + index * 0.12}s ease-out both`,
        borderColor: hovered ? hoverColor : "hsl(25, 15%, 22%)",
        background: hovered
          ? "hsla(25, 20%, 12%, 0.9)"
          : "hsla(20, 12%, 8%, 0.85)",
        color: hovered ? hoverColor : baseColor,
        boxShadow: hovered ? glowColor : "none",
        borderImageSlice: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Pixel corner accents */}
      <span
        className="pointer-events-none absolute -left-px -top-px h-2 w-2"
        aria-hidden="true"
        style={{
          background: hovered ? hoverColor : "hsl(25, 15%, 28%)",
          transition: "background 0.2s",
        }}
      />
      <span
        className="pointer-events-none absolute -right-px -top-px h-2 w-2"
        aria-hidden="true"
        style={{
          background: hovered ? hoverColor : "hsl(25, 15%, 28%)",
          transition: "background 0.2s",
        }}
      />
      <span
        className="pointer-events-none absolute -bottom-px -left-px h-2 w-2"
        aria-hidden="true"
        style={{
          background: hovered ? hoverColor : "hsl(25, 15%, 28%)",
          transition: "background 0.2s",
        }}
      />
      <span
        className="pointer-events-none absolute -bottom-px -right-px h-2 w-2"
        aria-hidden="true"
        style={{
          background: hovered ? hoverColor : "hsl(25, 15%, 28%)",
          transition: "background 0.2s",
        }}
      />

      {/* Selection arrow */}
      <span
        className="font-mono text-xs transition-all duration-200 sm:text-sm"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          color: hoverColor,
        }}
        aria-hidden="true"
      >
        {">>"}
      </span>

      {/* Icon */}
      <span
        className="flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6"
        style={{
          transition: "transform 0.3s",
          animation:
            spinIcon && hovered ? "gear-spin 2s linear infinite" : "none",
        }}
      >
        {icon}
      </span>

      {/* Label */}
      <span className="flex-1 text-left tracking-wider">{label}</span>

      {/* Right side decorative bar */}
      <span
        className="h-0.5 transition-all duration-300"
        aria-hidden="true"
        style={{
          width: hovered ? "24px" : "12px",
          background: hovered
            ? hoverColor
            : "hsl(25, 15%, 25%)",
        }}
      />
    </button>
  );
}
