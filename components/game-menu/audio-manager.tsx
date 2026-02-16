"use client";

import { useCallback, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function useMenuAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playHoverSound = useCallback(() => {
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      /* audio not available */
    }
  }, [getContext]);

  const playSelectSound = useCallback(() => {
    try {
      const ctx = getContext();

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "square";
      osc1.frequency.setValueAtTime(330, ctx.currentTime);
      osc1.frequency.setValueAtTime(440, ctx.currentTime + 0.08);
      osc1.frequency.setValueAtTime(550, ctx.currentTime + 0.16);

      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(165, ctx.currentTime);
      osc2.frequency.setValueAtTime(220, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.25);
    } catch {
      /* audio not available */
    }
  }, [getContext]);

  const playWhistleSound = useCallback(() => {
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 1.2);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 1.8);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(700, ctx.currentTime);
      filter.Q.setValueAtTime(5, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.07, ctx.currentTime + 1.0);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2);
    } catch {
      /* audio not available */
    }
  }, [getContext]);

  return { playHoverSound, playSelectSound, playWhistleSound };
}

export function AudioToggle({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center border-2 transition-colors duration-200 sm:h-12 sm:w-12"
      style={{
        borderColor: "hsl(25, 15%, 25%)",
        background: "hsla(20, 12%, 10%, 0.9)",
        color: muted ? "hsl(25, 10%, 40%)" : "hsl(25, 80%, 55%)",
      }}
      aria-label={muted ? "Unmute audio" : "Mute audio"}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}

export function useAudioMute() {
  const [muted, setMuted] = useState(false);
  const toggle = useCallback(() => setMuted((m) => !m), []);
  return { muted, toggle };
}
