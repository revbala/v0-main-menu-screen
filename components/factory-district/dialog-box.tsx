"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface DialogLine {
  speaker: string;
  text: string;
  /** Optional choices the player can pick at this line */
  choices?: { label: string; nextLineIndex?: number; action?: string }[];
}

interface DialogBoxProps {
  lines: DialogLine[];
  onClose: () => void;
  onChoice?: (action: string) => void;
  speakerColor?: string;
}

export function DialogBox({ lines, onClose, onChoice, speakerColor = "hsl(25, 70%, 55%)" }: DialogBoxProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLine = lines[lineIndex];

  // Typewriter effect
  useEffect(() => {
    if (!currentLine) return;
    setDisplayedText("");
    setIsTyping(true);
    let i = 0;
    const text = currentLine.text;

    function tick() {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        timerRef.current = setTimeout(tick, 28);
      } else {
        setIsTyping(false);
      }
    }
    tick();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lineIndex, currentLine]);

  const advance = useCallback(() => {
    if (isTyping) {
      // Skip to end of current text
      if (timerRef.current) clearTimeout(timerRef.current);
      setDisplayedText(currentLine.text);
      setIsTyping(false);
      return;
    }
    // If choices exist, do nothing (user must pick a choice)
    if (currentLine.choices && currentLine.choices.length > 0) return;
    // Go to next line or close
    if (lineIndex < lines.length - 1) {
      setLineIndex((i) => i + 1);
    } else {
      onClose();
    }
  }, [isTyping, currentLine, lineIndex, lines.length, onClose]);

  const handleChoice = useCallback(
    (choice: { label: string; nextLineIndex?: number; action?: string }) => {
      if (choice.action) onChoice?.(choice.action);
      if (choice.nextLineIndex !== undefined && choice.nextLineIndex < lines.length) {
        setLineIndex(choice.nextLineIndex);
      } else {
        onClose();
      }
    },
    [onChoice, lines.length, onClose]
  );

  if (!currentLine) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-4 sm:px-6 sm:pb-6"
      style={{ animation: "dialog-slide-up 0.3s ease-out" }}
    >
      <button
        className="w-full max-w-2xl cursor-pointer border-2 text-left"
        style={{
          borderColor: "hsl(25, 20%, 28%)",
          background: "linear-gradient(180deg, hsla(20, 12%, 10%, 0.97), hsla(20, 10%, 7%, 0.97))",
          boxShadow: "0 -4px 24px hsla(0,0%,0%,0.6), inset 0 1px 0 hsla(25, 20%, 30%, 0.2)",
        }}
        onClick={advance}
        aria-label="Advance dialog"
      >
        {/* Rivets */}
        <span className="absolute left-2 top-2 h-2 w-2 rounded-full" style={{ background: "radial-gradient(circle, hsl(25,15%,30%), hsl(25,10%,18%))" }} aria-hidden="true" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: "radial-gradient(circle, hsl(25,15%,30%), hsl(25,10%,18%))" }} aria-hidden="true" />
        <span className="absolute bottom-2 left-2 h-2 w-2 rounded-full" style={{ background: "radial-gradient(circle, hsl(25,15%,30%), hsl(25,10%,18%))" }} aria-hidden="true" />
        <span className="absolute bottom-2 right-2 h-2 w-2 rounded-full" style={{ background: "radial-gradient(circle, hsl(25,15%,30%), hsl(25,10%,18%))" }} aria-hidden="true" />

        <div className="px-5 py-4 sm:px-6 sm:py-5">
          {/* Speaker name */}
          <p
            className="mb-2 font-sans tracking-wider"
            style={{
              fontSize: "0.65rem",
              color: speakerColor,
              textShadow: `0 0 8px ${speakerColor}44`,
            }}
          >
            {currentLine.speaker}
          </p>

          {/* Dialog text */}
          <p
            className="font-mono leading-relaxed"
            style={{
              fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)",
              color: "hsl(35, 25%, 75%)",
              minHeight: "2.5em",
            }}
          >
            {displayedText}
            {isTyping && (
              <span
                className="ml-0.5 inline-block"
                style={{
                  width: "6px",
                  height: "clamp(0.65rem, 1.8vw, 0.85rem)",
                  background: "hsl(25, 70%, 55%)",
                  animation: "typewriter-cursor 0.6s step-end infinite",
                  verticalAlign: "text-bottom",
                }}
                aria-hidden="true"
              />
            )}
          </p>

          {/* Choices */}
          {!isTyping && currentLine.choices && currentLine.choices.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {currentLine.choices.map((choice, i) => (
                <button
                  key={i}
                  className="border px-3 py-1.5 text-left font-mono transition-all duration-150 hover:border-orange-500"
                  style={{
                    fontSize: "clamp(0.55rem, 1.5vw, 0.75rem)",
                    borderColor: "hsl(25, 15%, 25%)",
                    color: "hsl(35, 30%, 65%)",
                    background: "hsla(25, 12%, 12%, 0.8)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoice(choice);
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "hsl(25, 80%, 55%)";
                    (e.target as HTMLElement).style.background = "hsla(25, 20%, 15%, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "hsl(35, 30%, 65%)";
                    (e.target as HTMLElement).style.background = "hsla(25, 12%, 12%, 0.8)";
                  }}
                >
                  {">"} {choice.label}
                </button>
              ))}
            </div>
          )}

          {/* Continue hint */}
          {!isTyping && (!currentLine.choices || currentLine.choices.length === 0) && (
            <p
              className="mt-2 font-sans tracking-wider"
              style={{ fontSize: "0.4rem", color: "hsl(25, 15%, 35%)", animation: "typewriter-cursor 1s step-end infinite" }}
            >
              {"CLICK TO CONTINUE"}
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
