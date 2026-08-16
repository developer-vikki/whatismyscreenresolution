"use client";

import React, { useState } from "react";
import { TelemetryData } from "@/lib/telemetry";
import { CopyIcon, CheckIcon, MonitorIcon, SparklesIcon } from "./Icons";
import { cyberAudio } from "@/lib/cyberAudio";

interface ResolutionHeroProps {
  telemetry: TelemetryData | null;
}

export const ResolutionHero: React.FC<ResolutionHeroProps> = ({ telemetry }) => {
  const [copied, setCopied] = useState(false);

  if (!telemetry) {
    return (
      <div className="w-full cyber-card rounded-lg p-8 text-center animate-pulse">
        <p className="text-[#00f0ff] font-mono">INTERROGATING DISPLAY CONTROLLER...</p>
      </div>
    );
  }

  const handleCopy = () => {
    cyberAudio.playClick();
    const resString = `${telemetry.physicalWidth} x ${telemetry.physicalHeight} (${telemetry.aspectRatio}, ${telemetry.dpr}x DPR)`;
    navigator.clipboard.writeText(resString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRetinaOrHiDPI = telemetry.dpr > 1;

  return (
    <section className="w-full cyber-card rounded-xl p-5 sm:p-8 relative overflow-hidden glow-box-cyan border border-[#00f0ff]/40">
      {/* Corner Brackets */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      {/* Cyber Grid Background Accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#00f0ff]/20 pb-3">
        <div className="flex items-center gap-2">
          <MonitorIcon size={18} className="text-[#00f0ff]" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-[#00f0ff] uppercase font-bold">
            PRIMARY DISPLAY TELEMETRY
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isRetinaOrHiDPI && (
            <span className="flex items-center gap-1 text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-[#bc13fe]/20 text-[#bc13fe] border border-[#bc13fe]/40">
              <SparklesIcon size={12} />
              HiDPI / RETINA ({telemetry.dpr}x)
            </span>
          )}
          <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
            {telemetry.orientationType.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main Resolution Showcase */}
      <div className="relative z-10 my-4 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#00f0ff] font-mono mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
            <span>DETECTED SCREEN RESOLUTION</span>
          </div>

          <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white glow-text-cyan font-mono">
              {telemetry.physicalWidth}{" "}
              <span className="text-[#00ff66] font-light">×</span>{" "}
              {telemetry.physicalHeight}
            </h1>
            <span className="text-lg sm:text-xl font-bold text-[#ffe600] font-mono">
              px
            </span>
          </div>

          <p className="mt-2 text-base sm:text-lg font-semibold text-slate-300 font-mono flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[#00ff66]">{telemetry.resolutionName}</span>
            <span className="text-slate-500">•</span>
            <span className="text-[#00f0ff]">{telemetry.aspectRatio} Aspect</span>
          </p>
        </div>

        {/* Copy & Quick Action */}
        <div className="flex flex-col gap-2 items-center sm:items-end w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className={`cyber-button text-xs py-2.5 px-5 flex items-center justify-center gap-2 w-full sm:w-auto ${
              copied ? "cyber-button-green" : ""
            }`}
            id="copy-resolution-btn"
          >
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
            <span>{copied ? "COPIED TO CLIPBOARD" : "COPY RESOLUTION"}</span>
          </button>
          <span className="text-[10px] text-slate-400 font-mono">
            PHYSICAL HARDWARE RESOLUTION
          </span>
        </div>
      </div>

      {/* Secondary Metrics Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-4 border-t border-[#00f0ff]/20">
        {/* Logical CSS Resolution */}
        <div className="bg-[#030712]/70 border border-[#00f0ff]/20 rounded p-2.5">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Logical (CSS)</div>
          <div className="text-sm sm:text-base font-bold text-[#00f0ff] font-mono">
            {telemetry.screenWidth} × {telemetry.screenHeight}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">CSS Scaled Px</div>
        </div>

        {/* Viewport Canvas */}
        <div className="bg-[#030712]/70 border border-[#00f0ff]/20 rounded p-2.5">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Viewport (Inner)</div>
          <div className="text-sm sm:text-base font-bold text-[#00ff66] font-mono">
            {telemetry.viewportWidth} × {telemetry.viewportHeight}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Browser Area</div>
        </div>

        {/* Available Work Area */}
        <div className="bg-[#030712]/70 border border-[#00f0ff]/20 rounded p-2.5">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Available Screen</div>
          <div className="text-sm sm:text-base font-bold text-[#ffe600] font-mono">
            {telemetry.availWidth} × {telemetry.availHeight}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Minus Taskbar/Dock</div>
        </div>

        {/* Device Pixel Ratio */}
        <div className="bg-[#030712]/70 border border-[#00f0ff]/20 rounded p-2.5">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Pixel Ratio (DPR)</div>
          <div className="text-sm sm:text-base font-bold text-[#bc13fe] font-mono">
            {telemetry.dpr}x
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Scale Multiplier</div>
        </div>

        {/* Color Depth */}
        <div className="bg-[#030712]/70 border border-[#00f0ff]/20 rounded p-2.5">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Color Depth</div>
          <div className="text-sm sm:text-base font-bold text-white font-mono">
            {telemetry.colorDepth}-Bit
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {telemetry.hdrSupport ? "HDR Enabled" : "SDR Standard"}
          </div>
        </div>

        {/* Color Gamut */}
        <div className="bg-[#030712]/70 border border-[#00f0ff]/20 rounded p-2.5">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Color Gamut</div>
          <div className="text-sm sm:text-base font-bold text-[#00f0ff] font-mono truncate" title={telemetry.colorGamut}>
            {telemetry.colorGamut.split(" ")[0]}
          </div>
          <div className="text-[10px] text-slate-400 font-mono truncate">
            {telemetry.colorGamut.includes("P3") ? "DCI-P3 Wide" : "Standard Range"}
          </div>
        </div>
      </div>
    </section>
  );
};
