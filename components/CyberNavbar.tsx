"use client";

import React, { useEffect, useState } from "react";
import {
  VolumeIcon,
  VolumeMuteIcon,
  RefreshIcon,
  MaximizeIcon,
  ActivityIcon,
} from "./Icons";
import { cyberAudio } from "@/lib/cyberAudio";

interface CyberNavbarProps {
  fps: number;
  onRescan: () => void;
  isScanning: boolean;
  scanlinesEnabled: boolean;
  onToggleScanlines: () => void;
  onOpenDeadPixelTest: () => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  fps,
  onRescan,
  isScanning,
  scanlinesEnabled,
  onToggleScanlines,
  onOpenDeadPixelTest,
}) => {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = cyberAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleFullscreenToggle = () => {
    cyberAudio.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#00f0ff]/25 bg-[#030712]/90 backdrop-blur-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded bg-[#070d1e] border border-[#00f0ff] shadow-[0_0_12px_#00f0ff88]">
            <span className="text-sm font-black text-[#00f0ff]">Ω</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00ff66] pulse-led" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold tracking-wider text-white glitch-text" data-text="CYBER-RESOLUTION">
                CYBER-RESOLUTION
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
                PRO-SCAN v4.89
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden md:block">
              Deep Screen Resolution & Hardware Interrogator
            </p>
          </div>
        </div>

        {/* Live HUD Badges & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Live FPS Display */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070d1e] border border-[#00f0ff]/30 text-xs font-mono">
            <ActivityIcon size={14} className="text-[#00ff66] animate-pulse" />
            <span className="text-slate-400 hidden sm:inline">REFRESH:</span>
            <span className="text-[#00ff66] font-bold glow-text-green">{fps} Hz</span>
          </div>

          {/* System Time */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070d1e] border border-[#00f0ff]/30 text-xs font-mono text-slate-300">
            <span className="text-[#00f0ff]">LOCAL:</span>
            <span>{timeStr || "--:--:--"}</span>
          </div>

          {/* Audio SFX Toggle Button */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono transition-all ${
              !isMuted
                ? "bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_#00f0ff55]"
                : "bg-[#070d1e] border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
            title={isMuted ? "Unmute Cyber SFX" : "Mute Cyber SFX"}
            id="audio-toggle-btn"
          >
            {!isMuted ? <VolumeIcon size={14} /> : <VolumeMuteIcon size={14} />}
            <span className="hidden sm:inline">{!isMuted ? "AUDIO: ON" : "AUDIO: OFF"}</span>
          </button>

          {/* Scanlines Toggle Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onToggleScanlines();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono transition-all ${
              scanlinesEnabled
                ? "bg-[#bc13fe]/15 border-[#bc13fe] text-[#bc13fe] shadow-[0_0_10px_#bc13fe55]"
                : "bg-[#070d1e] border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
            title="Toggle CRT Scanline Overlay"
            id="scanline-toggle-btn"
          >
            <span className="text-xs">CRT</span>
            <span className="hidden sm:inline">{scanlinesEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Dead Pixel Test Trigger */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenDeadPixelTest();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070d1e] border border-[#ffe600]/40 text-[#ffe600] hover:bg-[#ffe600]/15 transition-all text-xs font-mono"
            id="dead-pixel-btn"
          >
            <span className="hidden sm:inline">CALIBRATE</span>
            <span className="sm:hidden">TEST</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreenToggle}
            className="p-1.5 rounded bg-[#070d1e] border border-[#00f0ff]/30 text-slate-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
            id="fullscreen-toggle-btn"
          >
            <MaximizeIcon size={16} />
          </button>

          {/* Re-Scan Button */}
          <button
            onClick={() => {
              cyberAudio.playScan();
              onRescan();
            }}
            disabled={isScanning}
            className="cyber-button text-xs py-1.5 px-3 flex items-center gap-1.5"
            id="rescan-telemetry-btn"
          >
            <RefreshIcon size={14} className={isScanning ? "animate-spin" : ""} />
            <span className="hidden sm:inline">{isScanning ? "SCANNING..." : "DEEP RESCAN"}</span>
            <span className="sm:hidden">RESCAN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
