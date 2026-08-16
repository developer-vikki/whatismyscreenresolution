"use client";

import React, { useEffect, useRef, useState } from "react";
import { cyberAudio } from "@/lib/cyberAudio";

interface CyberLoaderProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  "INITIALIZING NEURAL INTERFACE // KERNEL v4.89-CYBER",
  "ESTABLISHING LOW-LEVEL HARDWARE LINK...",
  "HOOKING DISPLAY CONTROLLER & FRAMEBUFFER...",
  "PROBING DISPLAY RESOLUTION & DEVICE PIXEL RATIO...",
  "QUERYING WEBGL UNMASKED GPU ACCELERATOR...",
  "SCANNING HARDWARE CONCURRENCY & MEMORY HEAP...",
  "INTERROGATING NETWORK TELEMETRY & ROUTING TABLE...",
  "DECRYPTING CLIENT USER-AGENT & SYSTEM ENTROPY...",
  "COMPUTING DIGITAL FINGERPRINT HASH...",
  "TELEMETRY EXTRACTION COMPLETE. ACCESS GRANTED.",
];

export const CyberLoader: React.FC<CyberLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Matrix Rain Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const characters = "0123456789ABCDEF01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Glowing cyan leader glyph
        if (Math.random() > 0.85) {
          ctx.fillStyle = "#00f0ff";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00f0ff";
        } else {
          ctx.fillStyle = "#00ff66";
          ctx.shadowBlur = 2;
          ctx.shadowColor = "#00ff66";
        }

        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Boot sequence timer and log streaming
  useEffect(() => {
    const totalDuration = 2200; // Fast and punchy 2.2 seconds
    const intervalTime = 40;
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, Math.round(prev + step));
        // Add log messages at specific intervals
        const targetLogIdx = Math.floor((next / 100) * BOOT_MESSAGES.length);
        if (targetLogIdx > logIndex && targetLogIdx <= BOOT_MESSAGES.length) {
          setLogIndex(targetLogIdx);
          setLogs((prevLogs) => [...prevLogs, BOOT_MESSAGES[targetLogIdx - 1]]);
          cyberAudio.playType();
        }

        // Trigger glitch burst at 45% and 85%
        if (next === 44 || next === 84) {
          setIsGlitching(true);
          cyberAudio.playGlitch();
          setTimeout(() => setIsGlitching(false), 200);
        }

        if (next >= 100) {
          clearInterval(timer);
          cyberAudio.playBootSuccess();
          setTimeout(() => {
            onComplete();
          }, 350);
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [logIndex, onComplete]);

  const handleOverride = () => {
    cyberAudio.playClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] select-none overflow-hidden">
      {/* Matrix Canvas Stream */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-45 pointer-events-none" />

      {/* CRT Scanline Beam & Vignette */}
      <div className="absolute inset-0 scanlines z-10" />
      <div className="absolute inset-0 scan-beam z-10" />
      <div className="absolute inset-0 crt-vignette z-10" />

      {/* Main Center Cyber Terminal Box */}
      <div
        className={`relative z-20 w-full max-w-2xl mx-4 p-6 sm:p-8 bg-[#070d1e]/90 border ${
          isGlitching ? "border-[#ff0055] scale-[1.01]" : "border-[#00f0ff]/50"
        } rounded-lg shadow-2xl backdrop-blur-xl transition-all duration-100 ${
          isGlitching ? "glitch-active" : ""
        }`}
      >
        {/* Corner Accents */}
        <div className="corner-tl" />
        <div className="corner-tr" />
        <div className="corner-bl" />
        <div className="corner-br" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00ff66] pulse-led shadow-[0_0_10px_#00ff66]" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#00f0ff] uppercase">
              // CYBER_TELEMETRY_INTERROGATOR //
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
            SYSTEM BOOT: v4.89
          </span>
        </div>

        {/* Glitch Title */}
        <div className="text-center my-4">
          <h1
            className="glitch-text text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2"
            data-text="INITIALIZING SYSTEM INTERROGATION"
          >
            INITIALIZING SYSTEM INTERROGATION
          </h1>
          <p className="text-xs sm:text-sm text-[#00f0ff] tracking-wider uppercase glow-text-cyan">
            Extracting Screen Resolution, Display Buffers & Hardware Telemetry
          </p>
        </div>

        {/* Cyber Progress Gauge */}
        <div className="my-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#00f0ff] animate-ping" />
              DECRYPTING DATA STREAMS
            </span>
            <span className="font-bold text-[#00ff66] glow-text-green text-sm sm:text-base">
              {progress}%
            </span>
          </div>

          <div className="h-3 w-full bg-[#030712] border border-[#00f0ff]/40 rounded-full p-0.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f0ff] via-[#00ff66] to-[#ffe600] rounded-full transition-all duration-75 shadow-[0_0_15px_#00f0ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Live Terminal Log Stream */}
        <div className="h-36 sm:h-44 bg-[#030712]/95 border border-[#00f0ff]/20 rounded p-3 overflow-y-auto font-mono text-[11px] sm:text-xs text-slate-300 space-y-1 scrollbar-none flex flex-col justify-end">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-[#00ff66] select-none">{">"}</span>
              <span
                className={
                  idx === logs.length - 1
                    ? "text-[#00f0ff] font-semibold glow-text-cyan"
                    : "text-slate-400"
                }
              >
                {log}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1 text-[#00ff66]">
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#00f0ff]/20">
          <span className="text-[11px] text-slate-400 font-mono">
            PRESS <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[#00f0ff]">ESC</kbd> OR CLICK OVERRIDE TO BYPASS
          </span>
          <button
            onClick={handleOverride}
            className="cyber-button text-xs py-2 px-5 w-full sm:w-auto"
            id="override-boot-btn"
          >
            [ OVERRIDE & ENTER SYSTEM ]
          </button>
        </div>
      </div>
    </div>
  );
};
