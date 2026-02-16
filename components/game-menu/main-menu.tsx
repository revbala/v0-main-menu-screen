"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Sword,
  SaveAll,
  Settings,
  BookOpen,
  DoorOpen,
} from "lucide-react";
import { GameTitle } from "./game-title";
import { MenuButton } from "./menu-button";
import { FactoryScene } from "./factory-scene";
import { GrainOverlay } from "./grain-overlay";
import { FlickerLamp } from "./flicker-lamp";
import {
  useMenuAudio,
  AudioToggle,
  useAudioMute,
} from "./audio-manager";

const MENU_ITEMS = [
  {
    label: "NEW GAME",
    icon: <Sword size={18} />,
    variant: "primary" as const,
  },
  {
    label: "CONTINUE",
    icon: <SaveAll size={18} />,
    variant: "steel" as const,
  },
  {
    label: "OPTIONS",
    icon: <Settings size={18} />,
    variant: "default" as const,
    spinIcon: true,
  },
  {
    label: "CREDITS",
    icon: <BookOpen size={18} />,
    variant: "default" as const,
  },
  {
    label: "EXIT",
    icon: <DoorOpen size={18} />,
    variant: "default" as const,
  },
];

interface MainMenuProps {
  onNewGame?: () => void;
}

export function MainMenu({ onNewGame }: MainMenuProps) {
  const { playHoverSound, playSelectSound, playWhistleSound } = useMenuAudio();
  const { muted, toggle: toggleMute } = useAudioMute();
  const [whistlePlayed, setWhistlePlayed] = useState(false);

  // Play train whistle on first interaction
  useEffect(() => {
    if (whistlePlayed || muted) return;

    const handler = () => {
      playWhistleSound();
      setWhistlePlayed(true);
      window.removeEventListener("click", handler);
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [whistlePlayed, muted, playWhistleSound]);

  const handleHover = useCallback(() => {
    if (!muted) playHoverSound();
  }, [muted, playHoverSound]);

  const handleSelect = useCallback(() => {
    if (!muted) playSelectSound();
  }, [muted, playSelectSound]);

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
      {/* Factory background scene */}
      <FactoryScene />

      {/* Flickering lamp light */}
      <FlickerLamp />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 px-4 py-8 sm:gap-12 sm:py-12 md:gap-14">
        {/* Title */}
        <GameTitle />

        {/* Menu buttons */}
        <nav
          className="flex w-full flex-col items-center gap-3 sm:gap-4"
          aria-label="Main menu"
        >
          {MENU_ITEMS.map((item, i) => (
            <div
              key={item.label}
              onMouseEnter={handleHover}
              onFocus={handleHover}
            >
              <MenuButton
                label={item.label}
                icon={item.icon}
                index={i}
                variant={item.variant}
                spinIcon={item.spinIcon}
                onClick={() => {
                  handleSelect();
                  if (item.label === "NEW GAME" && onNewGame) onNewGame();
                }}
              />
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="mt-2 flex flex-col items-center gap-1"
          style={{
            animation: "menu-slide-in 0.4s 1.5s ease-out both",
          }}
        >
          <p
            className="font-mono text-center tracking-widest"
            style={{
              fontSize: "clamp(0.45rem, 1vw, 0.65rem)",
              color: "hsl(25, 15%, 30%)",
            }}
          >
            {"v0.8.2 EARLY ACCESS"}
          </p>
          <p
            className="font-mono text-center tracking-wide"
            style={{
              fontSize: "clamp(0.4rem, 0.9vw, 0.55rem)",
              color: "hsl(25, 10%, 25%)",
            }}
          >
            {"CLICK ANYWHERE FOR SOUND"}
          </p>
        </div>
      </div>

      {/* Grain overlay + scanlines */}
      <GrainOverlay />

      {/* Audio toggle */}
      <AudioToggle muted={muted} onToggle={toggleMute} />
    </main>
  );
}
