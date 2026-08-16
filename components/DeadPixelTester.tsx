"use client";

import React, { useState, useEffect } from "react";
import { cyberAudio } from "@/lib/cyberAudio";

interface DeadPixelTesterProps {
  isOpen: boolean;
  onClose: () => void;
}

const PATTERNS = [
  { id: "black", name: "Pure OLED Black (Backlight Bleed & Bright Pixels)", bg: "#000000", text: "#ffffff" },
  { id: "white", name: "Pure White (Dead Pixels & Uniformity)", bg: "#ffffff", text: "#000000" },
  { id: "red", name: "Pure Red Subpixel (Dead Red Subpixels)", bg: "#ff0000", text: "#ffffff" },
  { id: "green", name: "Pure Green Subpixel (Dead Green Subpixels)", bg: "#00ff00", text: "#000000" },
  { id: "blue", name: "Pure Blue Subpixel (Dead Blue Subpixels)", bg: "#0000ff", text: "#ffffff" },
  { id: "cyan", name: "Cyber Cyan Subpixel Check", bg: "#00ffff", text: "#000000" },
  { id: "magenta", name: "Cyber Magenta Subpixel Check", bg: "#ff00ff", text: "#ffffff" },
  { id: "yellow", name: "Cyber Yellow Subpixel Check", bg: "#ffff00", text: "#000000" },
  { id: "grid", name: "Cyber Calibration Grid Pattern", bg: "grid", text: "#00f0ff" },
];

export const DeadPixelTester: React.FC<DeadPixelTesterProps> = ({ isOpen, onClose }) => {
  const [patternIndex, setPatternIndex] = useState(0);
  const [showHUD, setShowHUD] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        cyberAudio.playClick();
        setPatternIndex((prev) => (prev + 1) % PATTERNS.length);
      } else if (e.key === "ArrowLeft") {
        cyberAudio.playClick();
        setPatternIndex((prev) => (prev - 1 + PATTERNS.length) % PATTERNS.length);
      } else if (e.key === "h" || e.key === "H") {
        setShowHUD((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Request fullscreen on open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPattern = PATTERNS[patternIndex];

  const handleNext = () => {
    cyberAudio.playClick();
    setPatternIndex((prev) => (prev + 1) % PATTERNS.length);
  };

  const handlePrev = () => {
    cyberAudio.playClick();
    setPatternIndex((prev) => (prev - 1 + PATTERNS.length) % PATTERNS.length);
  };

  return (
    <div
      onClick={handleNext}
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 select-none cursor-pointer transition-colors duration-200"
      style={{
        backgroundColor: currentPattern.bg === "grid" ? "#030712" : currentPattern.bg,
        backgroundImage:
          currentPattern.bg === "grid"
            ? "linear-gradient(to right, #00f0ff33 1px, transparent 1px), linear-gradient(to bottom, #00f0ff33 1px, transparent 1px)"
            : "none",
        backgroundSize: currentPattern.bg === "grid" ? "40px 40px" : "auto",
      }}
    >
      {/* HUD Info Banner */}
      {showHUD && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#030712]/90 border border-[#00f0ff]/40 backdrop-blur-md rounded-lg p-4 max-w-xl mx-auto shadow-2xl flex flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold font-mono text-[#00f0ff]">
              DEAD PIXEL & DISPLAY CALIBRATION TEST [{patternIndex + 1}/{PATTERNS.length}]
            </span>
            <button
              onClick={onClose}
              className="text-xs font-mono px-2 py-1 bg-[#ff0055]/20 border border-[#ff0055] text-[#ff0055] rounded hover:bg-[#ff0055] hover:text-white"
            >
              EXIT TEST [ESC]
            </button>
          </div>

          <p className="text-xs font-mono text-white font-semibold">
            Pattern: {currentPattern.name}
          </p>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-700 pt-2">
            <span>Click / Space / Arrow Keys to cycle patterns</span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="px-2 py-0.5 bg-slate-800 rounded border border-slate-600 hover:text-white"
              >
                ◀ PREV
              </button>
              <button
                onClick={handleNext}
                className="px-2 py-0.5 bg-slate-800 rounded border border-slate-600 hover:text-white"
              >
                NEXT ▶
              </button>
              <button
                onClick={() => setShowHUD(false)}
                className="px-2 py-0.5 bg-slate-800 rounded border border-slate-600 hover:text-white"
              >
                HIDE HUD (H)
              </button>
            </div>
          </div>
        </div>
      )}

      {!showHUD && (
        <div className="text-center text-[11px] font-mono text-slate-500 bg-black/40 px-3 py-1 rounded mx-auto">
          Press &apos;H&apos; to show HUD | Click to cycle | ESC to exit
        </div>
      )}
    </div>
  );
};
