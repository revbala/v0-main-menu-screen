"use client";

import { useState, useCallback } from "react";
import { MainMenu } from "./game-menu/main-menu";
import { GameHUD } from "./game-hud/game-hud";
import { CityMap } from "./city-map/city-map";

type Screen = "menu" | "game" | "map";

export function GameApp() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useCallback((to: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(to);
      setTransitioning(false);
    }, 400);
  }, []);

  return (
    <div className="relative min-h-svh overflow-hidden">
      {/* Transition overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-400"
        style={{
          background: "hsl(20, 10%, 4%)",
          opacity: transitioning ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Screen renderer */}
      {screen === "menu" && (
        <MainMenu
          onNewGame={() => navigate("game")}
        />
      )}
      {screen === "game" && (
        <GameHUD
          onBack={() => navigate("menu")}
          onOpenMap={() => navigate("map")}
        />
      )}
      {screen === "map" && (
        <CityMap
          onBack={() => navigate("game")}
          onDistrictSelect={(district) => {
            // For now, clicking a district takes you back to the HUD
            navigate("game");
          }}
        />
      )}
    </div>
  );
}
