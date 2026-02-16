"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { NPC, type NPCData } from "./npc";
import { StoreBuilding } from "./store-building";
import { FactoryInterior } from "./factory-interior";
import { DialogBox } from "./dialog-box";
import { NPC_DIALOGS, FACTORY_QUESTS, type Quest } from "./quest-data";
import { GrainOverlay } from "../game-menu/grain-overlay";
import { FlickerLamp } from "../game-menu/flicker-lamp";
import { RivetedButton } from "../game-hud/riveted-button";

/** Civilian NPCs that appear OUTSIDE the factory -- dressed differently from workers */
const OUTSIDE_NPCS: NPCData[] = [
  {
    id: "old-berta",
    name: "Old Berta",
    role: "Coal Depot Owner",
    x: 78,
    y: 68,
    bodyColor: "hsl(30, 20%, 35%)",
    headColor: "hsl(35, 15%, 50%)",
    isQuestGiver: true,
    hasQuest: true,
    isWorker: false,
  },
  {
    id: "mercer",
    name: "Mercer",
    role: "Tool Shop Owner",
    x: 22,
    y: 68,
    bodyColor: "hsl(28, 22%, 38%)",
    headColor: "hsl(25, 10%, 30%)",
    isWorker: false,
  },
  {
    id: "street-vendor",
    name: "Pip",
    role: "Pie Vendor",
    x: 50,
    y: 75,
    bodyColor: "hsl(30, 30%, 42%)",
    headColor: "hsl(35, 25%, 45%)",
    isWorker: false,
  },
  {
    id: "worker-jenkins-wife",
    name: "Maggie",
    role: "Jenkins' Wife",
    x: 35,
    y: 82,
    bodyColor: "hsl(25, 25%, 40%)",
    headColor: "hsl(30, 20%, 45%)",
    isWorker: false,
  },
  {
    id: "lamplighter",
    name: "Silas",
    role: "Lamplighter",
    x: 65,
    y: 85,
    bodyColor: "hsl(20, 18%, 32%)",
    headColor: "hsl(25, 12%, 25%)",
    isWorker: false,
  },
];

interface FactoryDistrictProps {
  onBack: () => void;
}

export function FactoryDistrict({ onBack }: FactoryDistrictProps) {
  const [insideFactory, setInsideFactory] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [quests, setQuests] = useState<Quest[]>(FACTORY_QUESTS);
  const [acceptedQuests, setAcceptedQuests] = useState<string[]>([]);
  const [cluesFound, setCluesFound] = useState(0);
  const [hasValve, setHasValve] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  }, []);

  const acceptQuest = useCallback(
    (questId: string) => {
      if (!acceptedQuests.includes(questId)) {
        setAcceptedQuests((prev) => [...prev, questId]);
        const q = quests.find((quest) => quest.id === questId);
        if (q) showNotification(`Quest Accepted: ${q.title}`);
      }
    },
    [acceptedQuests, quests, showNotification]
  );

  const handleDialogChoice = useCallback(
    (action: string) => {
      switch (action) {
        case "accept-valve-quest":
          acceptQuest("broken-valve");
          break;
        case "accept-missing-quest":
          acceptQuest("missing-workers");
          break;
        case "accept-coal-quest":
          acceptQuest("coal-delivery");
          break;
        case "accept-both-quests":
          acceptQuest("broken-valve");
          acceptQuest("missing-workers");
          break;
        case "got-valve":
          if (acceptedQuests.includes("broken-valve")) {
            setHasValve(true);
            setQuests((prev) =>
              prev.map((q) =>
                q.id === "broken-valve" ? { ...q, progress: 1, completed: true } : q
              )
            );
            showNotification("Obtained: Pressure Valve! Quest Complete!");
          }
          break;
        case "clue-found":
          if (acceptedQuests.includes("missing-workers")) {
            const newClues = cluesFound + 1;
            setCluesFound(newClues);
            setQuests((prev) =>
              prev.map((q) =>
                q.id === "missing-workers"
                  ? { ...q, progress: Math.min(newClues, q.total), completed: newClues >= q.total }
                  : q
              )
            );
            showNotification(
              newClues >= 3
                ? "All clues found! Quest Complete!"
                : `Clue found! (${newClues}/3)`
            );
          }
          break;
      }
    },
    [acceptQuest, acceptedQuests, cluesFound, showNotification]
  );

  const handleNPCClick = useCallback((npc: NPCData) => {
    if (NPC_DIALOGS[npc.id]) {
      setActiveDialog(npc.id);
    }
  }, []);

  const outsideNPCs = OUTSIDE_NPCS.map((npc) => {
    if (npc.id === "old-berta") {
      return { ...npc, hasQuest: !acceptedQuests.includes("coal-delivery") };
    }
    return npc;
  });

  const activeQuests = quests.filter((q) => acceptedQuests.includes(q.id));

  return (
    <main
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{ background: "hsl(20, 10%, 7%)" }}
    >
      <FlickerLamp />

      {insideFactory ? (
        /* -------- FACTORY INTERIOR -------- */
        <div className="relative flex-1">
          <FactoryInterior
            onNPCClick={handleNPCClick}
            onExit={() => setInsideFactory(false)}
            questsAccepted={acceptedQuests}
          />
        </div>
      ) : (
        /* -------- OUTSIDE DISTRICT -------- */
        <>
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1
                className="font-sans tracking-widest"
                style={{
                  fontSize: "clamp(0.65rem, 2.2vw, 1rem)",
                  color: "hsl(25, 70%, 55%)",
                  textShadow: "0 0 8px hsla(25, 80%, 50%, 0.3), 2px 2px 0 hsl(20, 10%, 6%)",
                }}
              >
                {"FACTORY DISTRICT"}
              </h1>
              <p className="font-mono" style={{ fontSize: "0.45rem", color: "hsl(25, 15%, 35%)" }}>
                {"Northern Ironhaven - Smoke & Steel"}
              </p>
            </div>
            <div className="flex gap-2">
              <RivetedButton onClick={() => setShowQuestLog((s) => !s)}>
                {"QUESTS"}
              </RivetedButton>
              <RivetedButton onClick={onBack}>
                {"LEAVE"}
              </RivetedButton>
            </div>
          </div>

          {/* Main district view */}
          <div className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-3 sm:px-6">
            <div
              className="relative w-full overflow-hidden border-2"
              style={{
                paddingBottom: "75%",
                borderColor: "hsl(25, 15%, 20%)",
                background: "hsl(20, 10%, 7%)",
                boxShadow: "inset 0 2px 12px hsla(0,0%,0%,0.6), 0 0 0 4px hsl(25, 12%, 12%)",
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0" aria-hidden="true">
                <Image
                  src="/images/factory-exterior.jpg"
                  alt=""
                  fill
                  className="pixel-render object-cover"
                  style={{ imageRendering: "pixelated", opacity: 0.25 }}
                  priority
                />
              </div>

              {/* Street layout SVG */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 600 450"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                {/* Cobblestone road */}
                <rect x="0" y="250" width="600" height="40" fill="hsl(25, 8%, 14%)" />
                <rect x="0" y="252" width="600" height="2" fill="hsl(25, 10%, 18%)" opacity="0.5" />
                <rect x="0" y="260" width="600" height="1" fill="hsl(25, 8%, 12%)" opacity="0.3" />
                <rect x="0" y="275" width="600" height="1" fill="hsl(25, 8%, 12%)" opacity="0.3" />
                <rect x="0" y="288" width="600" height="2" fill="hsl(25, 10%, 18%)" opacity="0.5" />

                {/* Factory building - large structure at top */}
                <rect x="120" y="20" width="360" height="180" fill="hsl(20, 10%, 11%)" stroke="hsl(25, 12%, 18%)" strokeWidth="2" rx="2" />

                {/* Factory windows */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect
                    key={`fw-${i}`}
                    x={155 + i * 65}
                    y={60}
                    width={30}
                    height={25}
                    fill="hsla(25, 40%, 25%, 0.4)"
                    stroke="hsl(25, 12%, 20%)"
                    strokeWidth="1"
                  />
                ))}
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect
                    key={`fw2-${i}`}
                    x={155 + i * 65}
                    y={110}
                    width={30}
                    height={25}
                    fill="hsla(25, 40%, 25%, 0.4)"
                    stroke="hsl(25, 12%, 20%)"
                    strokeWidth="1"
                  />
                ))}

                {/* Furnace glow through windows */}
                <rect x="155" y="60" width="30" height="25" fill="hsla(20, 80%, 35%, 0.2)">
                  <animate attributeName="fill" values="hsla(20,80%,35%,0.15);hsla(20,80%,35%,0.35);hsla(20,80%,35%,0.15)" dur="3s" repeatCount="indefinite" />
                </rect>

                {/* Smokestacks */}
                <rect x="180" y="-10" width="16" height="40" fill="hsl(20, 10%, 14%)" rx="1" />
                <rect x="300" y="-20" width="20" height="50" fill="hsl(20, 10%, 14%)" rx="1" />
                <rect x="420" y="-5" width="14" height="35" fill="hsl(20, 10%, 14%)" rx="1" />

                {/* Smoke from stacks */}
                {[188, 310, 427].map((sx, i) => (
                  <g key={`smoke-${i}`}>
                    <circle cx={sx} cy={-15 - i * 5} r={6 + i * 2} fill="hsla(20, 8%, 30%, 0.3)">
                      <animate attributeName="cy" values={`${-15 - i * 5};${-45 - i * 5};${-15 - i * 5}`} dur={`${3 + i}s`} repeatCount="indefinite" />
                      <animate attributeName="r" values={`${6 + i * 2};${12 + i * 2};${6 + i * 2}`} dur={`${3 + i}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0.1;0.3" dur={`${3 + i}s`} repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}

                {/* Factory gate (enterable) */}
                <rect x="270" y="165" width="60" height="40" fill="hsl(20, 8%, 8%)" stroke="hsl(25, 15%, 22%)" strokeWidth="2" rx="1" />
                <text x="300" y="188" textAnchor="middle" fill="hsl(25, 25%, 40%)" fontSize="8" fontFamily="monospace">GATE</text>

                {/* Steam vents on street */}
                {[160, 350, 480].map((vx, i) => (
                  <g key={`vent-${i}`}>
                    <rect x={vx} y="265" width="8" height="4" fill="hsl(25, 10%, 18%)" rx="1" />
                    <rect x={vx + 1} y="248" width="6" height="18" fill="hsla(25, 20%, 50%, 0.2)" rx="2">
                      <animate attributeName="opacity" values="0;0.4;0" dur={`${4 + i * 2}s`} begin={`${i * 1.5}s`} repeatCount="indefinite" />
                      <animate attributeName="height" values="0;18;0" dur={`${4 + i * 2}s`} begin={`${i * 1.5}s`} repeatCount="indefinite" />
                    </rect>
                  </g>
                ))}

                {/* Gas lamps */}
                {[100, 250, 400, 540].map((lx, i) => (
                  <g key={`lamp-${i}`}>
                    <rect x={lx} y="240" width="3" height="20" fill="hsl(25, 10%, 22%)" />
                    <circle cx={lx + 1.5} cy="238" r="4" fill="hsla(35, 70%, 45%, 0.7)">
                      <animate attributeName="r" values="4;5;4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.7;0.5;0.7" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                    <circle cx={lx + 1.5} cy="238" r="12" fill="hsla(35, 70%, 45%, 0.06)" />
                  </g>
                ))}

                {/* Shops area - below the road */}
                {/* Mercer's Tool Shop */}
                <rect x="60" y="310" width="100" height="70" fill="hsl(25, 15%, 16%)" stroke="hsl(25, 18%, 24%)" strokeWidth="1.5" rx="2" />
                <rect x="80" y="325" width="25" height="18" fill="hsla(35, 40%, 30%, 0.4)" stroke="hsl(25, 15%, 22%)" strokeWidth="0.8" />
                <rect x="115" y="325" width="25" height="18" fill="hsla(35, 40%, 30%, 0.4)" stroke="hsl(25, 15%, 22%)" strokeWidth="0.8" />
                <rect x="95" y="355" width="24" height="25" fill="hsl(20, 10%, 10%)" />

                {/* Coal Depot */}
                <rect x="420" y="310" width="120" height="70" fill="hsl(20, 8%, 13%)" stroke="hsl(25, 12%, 20%)" strokeWidth="1.5" rx="2" />
                <rect x="440" y="325" width="20" height="15" fill="hsla(25, 20%, 22%, 0.5)" stroke="hsl(25, 10%, 18%)" strokeWidth="0.8" />
                <rect x="500" y="325" width="20" height="15" fill="hsla(25, 20%, 22%, 0.5)" stroke="hsl(25, 10%, 18%)" strokeWidth="0.8" />
                {/* Coal piles */}
                <circle cx="455" cy="365" r="8" fill="hsl(20, 5%, 10%)" />
                <circle cx="475" cy="368" r="6" fill="hsl(20, 5%, 12%)" />
                <rect x="470" y="355" width="24" height="25" fill="hsl(20, 8%, 8%)" />

                {/* Pie Cart */}
                <rect x="250" y="330" width="55" height="35" fill="hsl(30, 22%, 20%)" stroke="hsl(35, 30%, 30%)" strokeWidth="1" rx="2" />
                <circle cx="260" cy="368" r="5" fill="hsl(25, 10%, 18%)" stroke="hsl(25, 12%, 22%)" strokeWidth="1" />
                <circle cx="295" cy="368" r="5" fill="hsl(25, 10%, 18%)" stroke="hsl(25, 12%, 22%)" strokeWidth="1" />
                {/* Steam from pies */}
                <path d="M270,328 Q272,320 275,328 Q278,320 280,328" stroke="hsla(25, 20%, 50%, 0.3)" strokeWidth="1" fill="none">
                  <animate attributeName="d" values="M270,328 Q272,320 275,328 Q278,320 280,328;M270,325 Q273,315 275,325 Q278,315 280,325;M270,328 Q272,320 275,328 Q278,320 280,328" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>

              {/* Factory gate click area */}
              <button
                className="absolute z-20 transition-all duration-150"
                style={{
                  left: "43%",
                  top: "35%",
                  width: "14%",
                  height: "10%",
                  background: "transparent",
                  border: "2px solid transparent",
                  cursor: "pointer",
                }}
                onClick={() => setInsideFactory(true)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(25, 60%, 45%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px hsla(25, 80%, 50%, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                aria-label="Enter factory"
              >
                <span
                  className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans"
                  style={{ fontSize: "0.4rem", color: "hsl(25, 50%, 50%)", opacity: 0 }}
                >
                  {"ENTER"}
                </span>
              </button>

              {/* Store buildings (clickable overlays) */}
              <StoreBuilding
                name="MERCER'S TOOLS"
                type="tool-shop"
                x={8}
                y={67}
                width={18}
                height={16}
                onClick={() => setActiveDialog("mercer")}
              />
              <StoreBuilding
                name="COAL DEPOT"
                type="coal-depot"
                x={68}
                y={67}
                width={22}
                height={16}
                onClick={() => setActiveDialog("old-berta")}
              />
              <StoreBuilding
                name="PIP'S PIES"
                type="pie-cart"
                x={40}
                y={72}
                width={12}
                height={9}
                onClick={() => setActiveDialog("street-vendor")}
              />

              {/* Outside NPCs -- civilians, not workers */}
              {outsideNPCs.map((npc) => (
                <NPC key={npc.id} npc={npc} onClick={handleNPCClick} />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="relative z-10 flex items-center justify-center px-4 py-2">
            <p className="font-mono text-center" style={{ fontSize: "0.45rem", color: "hsl(25, 15%, 30%)" }}>
              {"CLICK ON NPCs TO TALK  |  CLICK THE FACTORY GATE TO ENTER  |  CLICK SHOPS TO INTERACT"}
            </p>
          </div>
        </>
      )}

      {/* Quest log overlay */}
      {showQuestLog && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div
            className="relative w-full max-w-sm border-2 px-5 py-4"
            style={{
              background: "hsla(40, 25%, 82%, 0.97)",
              borderColor: "hsl(30, 20%, 60%)",
              boxShadow: "4px 6px 20px hsla(0,0%,0%,0.6)",
              transform: "rotate(-0.5deg)",
              animation: "notebook-slide 0.3s ease-out",
            }}
          >
            {/* Paper lines */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-full"
                  style={{ top: `${24 + i * 22}px`, height: "1px", background: "hsla(210, 15%, 70%, 0.3)" }}
                />
              ))}
              <div className="absolute top-0 h-full" style={{ left: "22px", width: "1px", background: "hsla(0, 50%, 60%, 0.3)" }} />
            </div>

            <div className="relative">
              <div className="mb-3 flex items-center justify-between border-b pb-2" style={{ borderColor: "hsl(30, 20%, 65%)" }}>
                <h3 className="font-mono font-bold" style={{ fontSize: "0.7rem", color: "hsl(20, 30%, 25%)" }}>
                  {"QUEST LOG"}
                </h3>
                <button
                  className="font-mono font-bold hover:opacity-80"
                  style={{ fontSize: "0.7rem", color: "hsl(20, 30%, 35%)" }}
                  onClick={() => setShowQuestLog(false)}
                >
                  X
                </button>
              </div>

              {activeQuests.length === 0 ? (
                <p className="font-mono italic" style={{ fontSize: "0.55rem", color: "hsl(20, 15%, 45%)" }}>
                  {"No active quests. Talk to NPCs to find work."}
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {activeQuests.map((q) => (
                    <div key={q.id} style={{ opacity: q.completed ? 0.5 : 1 }}>
                      <div className="flex items-start gap-1.5">
                        <span
                          className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center border font-mono"
                          style={{
                            borderColor: "hsl(20, 20%, 45%)",
                            background: q.completed ? "hsl(25, 40%, 50%)" : "transparent",
                            fontSize: "0.45rem",
                            color: "hsl(40, 30%, 85%)",
                          }}
                        >
                          {q.completed ? "X" : ""}
                        </span>
                        <div>
                          <p
                            className="font-mono font-bold"
                            style={{
                              fontSize: "0.55rem",
                              color: "hsl(20, 30%, 25%)",
                              textDecoration: q.completed ? "line-through" : "none",
                            }}
                          >
                            {q.title}
                          </p>
                          <p className="font-mono" style={{ fontSize: "0.45rem", color: "hsl(20, 15%, 40%)", lineHeight: 1.5 }}>
                            {q.objective}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="font-mono" style={{ fontSize: "0.4rem", color: "hsl(25, 60%, 45%)" }}>
                              [{q.progress}/{q.total}]
                            </span>
                            {q.completed && (
                              <span className="font-mono font-bold" style={{ fontSize: "0.4rem", color: "hsl(120, 30%, 40%)" }}>
                                COMPLETE
                              </span>
                            )}
                          </div>
                          <p className="font-mono" style={{ fontSize: "0.38rem", color: "hsl(35, 30%, 50%)" }}>
                            {"Reward: "}{q.reward}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Paper fold */}
            <div
              className="absolute bottom-0 right-0 h-4 w-4"
              aria-hidden="true"
              style={{ background: "linear-gradient(135deg, hsl(40, 25%, 82%) 50%, hsl(30, 20%, 65%) 50%)" }}
            />
          </div>
        </div>
      )}

      {/* Quest notification toast */}
      {notification && (
        <div
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 border-2 px-4 py-2"
          style={{
            animation: "quest-pop 0.3s ease-out",
            background: "hsla(25, 20%, 12%, 0.95)",
            borderColor: "hsl(45, 70%, 50%)",
            boxShadow: "0 0 16px hsla(45, 80%, 50%, 0.3)",
          }}
        >
          <p className="font-sans tracking-wider" style={{ fontSize: "0.6rem", color: "hsl(45, 80%, 55%)", textShadow: "0 0 6px hsla(45, 80%, 50%, 0.4)" }}>
            {notification}
          </p>
        </div>
      )}

      {/* Dialog box */}
      {activeDialog && NPC_DIALOGS[activeDialog] && (
        <DialogBox
          lines={NPC_DIALOGS[activeDialog]}
          onClose={() => setActiveDialog(null)}
          onChoice={handleDialogChoice}
        />
      )}

      <GrainOverlay />
    </main>
  );
}
