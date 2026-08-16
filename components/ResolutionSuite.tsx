"use client";

import React, { useState } from "react";
import { DEVICE_PRESETS, DevicePreset, calculateAspectRatio, computeDisplayMetrics } from "@/lib/presets";
import { TelemetryData } from "@/lib/telemetry";
import { SmartphoneIcon, LaptopIcon, MonitorIcon, SparklesIcon, CopyIcon, CheckIcon } from "./Icons";
import { cyberAudio } from "@/lib/cyberAudio";

interface ResolutionSuiteProps {
  detectedTelemetry: TelemetryData | null;
}

export const ResolutionSuite: React.FC<ResolutionSuiteProps> = ({ detectedTelemetry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [customWidth, setCustomWidth] = useState<number>(1920);
  const [customHeight, setCustomHeight] = useState<number>(1080);
  const [customDpr, setCustomDpr] = useState<number>(1.0);
  const [customDiagonal, setCustomDiagonal] = useState<number>(24.0);
  const [activePresetId, setActivePresetId] = useState<string | null>("desktop-1080p");
  const [copiedMetrics, setCopiedMetrics] = useState(false);

  // Initialize or set custom preset
  const handleSelectPreset = (preset: DevicePreset) => {
    cyberAudio.playClick();
    setActivePresetId(preset.id);
    setCustomWidth(preset.width);
    setCustomHeight(preset.height);
    setCustomDpr(preset.dpr);
    setCustomDiagonal(preset.diagonalInches);
  };

  const handleUseDetected = () => {
    if (!detectedTelemetry) return;
    cyberAudio.playClick();
    setActivePresetId(null);
    setCustomWidth(detectedTelemetry.physicalWidth);
    setCustomHeight(detectedTelemetry.physicalHeight);
    setCustomDpr(detectedTelemetry.dpr);
    // Estimate diagonal if not known
    setCustomDiagonal(detectedTelemetry.dpr >= 2 ? 14.2 : 24.0);
  };

  const filteredPresets = selectedCategory === "all"
    ? DEVICE_PRESETS
    : DEVICE_PRESETS.filter((p) => p.category === selectedCategory);

  const customAspect = calculateAspectRatio(customWidth, customHeight);
  const metrics = computeDisplayMetrics(customWidth, customHeight, customDiagonal);

  const handleCopySpec = () => {
    cyberAudio.playClick();
    const spec = `Display Resolution: ${customWidth} x ${customHeight} px
Device Pixel Ratio (DPR): ${customDpr}x
Aspect Ratio: ${customAspect}
Screen Diagonal: ${customDiagonal}"
PPI: ${metrics?.ppi || "N/A"}
Megapixels: ${metrics?.megapixels || "N/A"} MP
Dot Pitch: ${metrics?.dotPitchMm || "N/A"} mm
Physical Size: ${metrics?.physicalWidthInches}" x ${metrics?.physicalHeightInches}" (${metrics?.physicalWidthCm} x ${metrics?.physicalHeightCm} cm)`;

    navigator.clipboard.writeText(spec);
    setCopiedMetrics(true);
    setTimeout(() => setCopiedMetrics(false), 2000);
  };

  // Compare bounding box scale relative to max container
  const detectedW = detectedTelemetry ? detectedTelemetry.physicalWidth : 1920;
  const detectedH = detectedTelemetry ? detectedTelemetry.physicalHeight : 1080;
  const maxRefW = Math.max(detectedW, customWidth, 3840);
  const maxRefH = Math.max(detectedH, customHeight, 2160);

  const targetBoxWidthPercent = Math.max(15, Math.min(100, (customWidth / maxRefW) * 100));
  const targetBoxHeightPercent = Math.max(15, Math.min(100, (customHeight / maxRefH) * 100));

  const detectedBoxWidthPercent = Math.max(15, Math.min(100, (detectedW / maxRefW) * 100));
  const detectedBoxHeightPercent = Math.max(15, Math.min(100, (detectedH / maxRefH) * 100));

  return (
    <div className="w-full cyber-card rounded-xl p-5 sm:p-7 space-y-6 border border-[#00f0ff]/30">
      {/* Corner accents */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#00f0ff]/20 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-white font-mono flex items-center gap-2">
            <span className="text-[#00ff66]">{"//"}</span> INTERACTIVE RESOLUTION SUITE & PPI CALCULATOR
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Test, provide, or simulate mobile, laptop, tablet, desktop, and ultrawide screen resolutions.
          </p>
        </div>

        {detectedTelemetry && (
          <button
            onClick={handleUseDetected}
            className="cyber-button cyber-button-green text-xs py-1.5 px-3 flex items-center gap-1.5"
            id="use-detected-res-btn"
          >
            <SparklesIcon size={14} />
            <span>LOAD DETECTED SCREEN ({detectedTelemetry.physicalWidth}×{detectedTelemetry.physicalHeight})</span>
          </button>
        )}
      </div>

      {/* Device Category Preset Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider font-bold">
            1. Select Device Preset or Enter Custom Specs:
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            { id: "all", label: "All Presets" },
            { id: "mobile", label: "Mobile Phones", icon: SmartphoneIcon },
            { id: "tablet", label: "Tablets" },
            { id: "laptop", label: "Laptops & MacBooks", icon: LaptopIcon },
            { id: "desktop", label: "Desktop Monitors", icon: MonitorIcon },
            { id: "ultrawide", label: "Ultrawide 21:9 & 32:9" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                cyberAudio.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all border ${
                selectedCategory === cat.id
                  ? "bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_#00f0ff44]"
                  : "bg-[#070d1e] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Preset Cards Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {filteredPresets.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-2.5 rounded border transition-all relative ${
                  isActive
                    ? "bg-[#00f0ff]/15 border-[#00f0ff] shadow-[0_0_12px_#00f0ff44]"
                    : "bg-[#030712]/80 border-[#00f0ff]/20 hover:border-[#00f0ff]/60 hover:bg-[#070d1e]"
                }`}
              >
                {isActive && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_6px_#00ff66]" />
                )}
                <div className="text-xs font-bold text-white truncate font-mono">{preset.name}</div>
                <div className="text-[11px] text-[#00ff66] font-mono mt-0.5">{preset.label}</div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-1">
                  <span>{preset.aspectRatio}</span>
                  <span>•</span>
                  <span>{preset.diagonalInches}&quot;</span>
                  <span>•</span>
                  <span>{preset.dpr}x DPR</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Input Controls & PPI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#00f0ff]/20">
        {/* Input Parameters Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 bg-[#030712]/70 p-4 rounded-lg border border-[#00f0ff]/20">
          <div className="text-xs font-mono text-[#00f0ff] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>2. Custom Parameter Tuning</span>
            <span className="text-[10px] text-slate-400">Live Computed</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Width Input */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Width (Pixels)
              </label>
              <input
                type="number"
                min={240}
                max={15360}
                step={10}
                value={customWidth}
                onChange={(e) => {
                  setActivePresetId(null);
                  setCustomWidth(Math.max(1, Number(e.target.value) || 0));
                }}
                className="w-full bg-[#070d1e] border border-[#00f0ff]/40 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
              />
            </div>

            {/* Height Input */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Height (Pixels)
              </label>
              <input
                type="number"
                min={240}
                max={8640}
                step={10}
                value={customHeight}
                onChange={(e) => {
                  setActivePresetId(null);
                  setCustomHeight(Math.max(1, Number(e.target.value) || 0));
                }}
                className="w-full bg-[#070d1e] border border-[#00f0ff]/40 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Diagonal Inches */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Screen Diagonal (Inches)
              </label>
              <input
                type="number"
                min={1}
                max={150}
                step={0.1}
                value={customDiagonal}
                onChange={(e) => {
                  setCustomDiagonal(Math.max(0.1, Number(e.target.value) || 1));
                }}
                className="w-full bg-[#070d1e] border border-[#00f0ff]/40 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
              />
            </div>

            {/* Pixel Ratio (DPR) */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Device Pixel Ratio (DPR)
              </label>
              <select
                value={customDpr}
                onChange={(e) => setCustomDpr(Number(e.target.value))}
                className="w-full bg-[#070d1e] border border-[#00f0ff]/40 rounded px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-[#00f0ff]"
              >
                <option value={1}>1.0x (Standard / Desktop)</option>
                <option value={1.25}>1.25x (125% Windows Scale)</option>
                <option value={1.5}>1.5x (150% Windows Scale)</option>
                <option value={2}>2.0x (Retina / 200% Scale)</option>
                <option value={2.5}>2.5x (High Density Mobile)</option>
                <option value={3}>3.0x (Super Retina / Flagship)</option>
                <option value={3.5}>3.5x (Ultra High Density)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCopySpec}
            className="w-full cyber-button text-xs py-2 flex items-center justify-center gap-2"
          >
            {copiedMetrics ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            <span>{copiedMetrics ? "SPECS COPIED" : "COPY CALIBRATION METRICS"}</span>
          </button>
        </div>

        {/* Computed Metrics & Visual Scale Comparator (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Computed Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* PPI */}
            <div className="bg-[#070d1e] border border-[#00f0ff]/30 rounded p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Pixel Density</div>
              <div className="text-xl font-extrabold text-[#00ff66] font-mono glow-text-green">
                {metrics?.ppi || "N/A"}{" "}
                <span className="text-xs font-normal text-slate-400">PPI</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {(metrics?.ppi || 0) >= 220 ? "Retina Grade" : "Standard"}
              </div>
            </div>

            {/* Megapixels */}
            <div className="bg-[#070d1e] border border-[#00f0ff]/30 rounded p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Total Resolution</div>
              <div className="text-xl font-extrabold text-[#00f0ff] font-mono glow-text-cyan">
                {metrics?.megapixels || "N/A"}{" "}
                <span className="text-xs font-normal text-slate-400">MP</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {metrics?.totalPixels ? `${(metrics.totalPixels / 1_000_000).toFixed(2)}M px` : ""}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="bg-[#070d1e] border border-[#00f0ff]/30 rounded p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Aspect Ratio</div>
              <div className="text-xl font-extrabold text-[#ffe600] font-mono">
                {customAspect}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {customWidth > customHeight ? "Landscape" : "Portrait"}
              </div>
            </div>

            {/* Dot Pitch */}
            <div className="bg-[#070d1e] border border-[#00f0ff]/30 rounded p-3 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Dot Pitch</div>
              <div className="text-xl font-extrabold text-[#bc13fe] font-mono">
                {metrics?.dotPitchMm || "N/A"}{" "}
                <span className="text-xs font-normal text-slate-400">mm</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Pixel Spacing</div>
            </div>
          </div>

          {/* Physical Dimensions Panel */}
          {metrics && (
            <div className="bg-[#070d1e]/80 border border-[#00f0ff]/20 rounded p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-slate-300">
                <strong className="text-[#00f0ff]">Physical Screen Size:</strong> {metrics.physicalWidthInches}&quot; × {metrics.physicalHeightInches}&quot; ({metrics.physicalWidthCm} × {metrics.physicalHeightCm} cm)
              </span>
              <span className="text-slate-400">
                CSS Viewport: <span className="text-[#00ff66]">{Math.round(customWidth / customDpr)} × {Math.round(customHeight / customDpr)}</span>
              </span>
            </div>
          )}

          {/* Scaled Visual Viewport Comparison Box */}
          <div className="bg-[#030712] border border-[#00f0ff]/30 rounded-lg p-4 relative h-48 flex items-center justify-center overflow-hidden">
            <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#00f0ff] rounded-sm" />
              <span>Target: {customWidth} × {customHeight}</span>
              {detectedTelemetry && (
                <>
                  <span className="inline-block w-2 h-2 bg-[#00ff66] rounded-sm ml-2" />
                  <span>Detected: {detectedW} × {detectedH}</span>
                </>
              )}
            </div>

            {/* Target Selected Frame */}
            <div
              className="border-2 border-[#00f0ff] bg-[#00f0ff]/10 rounded flex flex-col items-center justify-center p-2 text-center transition-all duration-300 relative shadow-[0_0_15px_#00f0ff33]"
              style={{
                width: `${targetBoxWidthPercent}%`,
                height: `${targetBoxHeightPercent}%`,
              }}
            >
              <span className="text-xs font-bold text-white font-mono">
                {customWidth} × {customHeight}
              </span>
              <span className="text-[10px] text-[#00f0ff] font-mono">
                {customAspect} • {customDiagonal}&quot;
              </span>
            </div>

            {/* Detected Overlay Outline */}
            {detectedTelemetry && (
              <div
                className="absolute border border-dashed border-[#00ff66] pointer-events-none transition-all duration-300 rounded"
                style={{
                  width: `${detectedBoxWidthPercent}%`,
                  height: `${detectedBoxHeightPercent}%`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
