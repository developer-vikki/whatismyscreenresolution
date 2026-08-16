"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { CyberLoader } from "@/components/CyberLoader";
import { CyberNavbar } from "@/components/CyberNavbar";
import { ResolutionHero } from "@/components/ResolutionHero";
import { ResolutionSuite } from "@/components/ResolutionSuite";
import { TelemetryGrid } from "@/components/TelemetryGrid";
import { CyberTerminal } from "@/components/CyberTerminal";
import { DeadPixelTester } from "@/components/DeadPixelTester";
import { ExportModal } from "@/components/ExportModal";
import { extractFullTelemetry, measureRefreshRate, TelemetryData } from "@/lib/telemetry";
import { DownloadIcon, CrosshairIcon, TerminalIcon } from "@/components/Icons";
import { cyberAudio } from "@/lib/cyberAudio";

export default function Home() {
  const [bootCompleted, setBootCompleted] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);
  const [activeTab, setActiveTab] = useState<"dossier" | "suite" | "terminal">("dossier");
  const [deadPixelOpen, setDeadPixelOpen] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background Ambient Matrix Rain Canvas
  useEffect(() => {
    const canvas = bgCanvasRef.current;
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
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(0, 255, 102, 0.4)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.95) {
          ctx.fillStyle = "rgba(0, 240, 255, 0.6)";
        } else {
          ctx.fillStyle = "rgba(0, 255, 102, 0.25)";
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.985) {
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

  // Run telemetry extraction
  const runTelemetryExtraction = useCallback(async () => {
    setIsScanning(true);
    try {
      const data = await extractFullTelemetry();
      setTelemetry(data);
      // Measure real-time FPS
      measureRefreshRate((calculatedFps) => {
        setFps(calculatedFps);
        setTelemetry((prev) => (prev ? { ...prev, estimatedRefreshRate: calculatedFps } : null));
      });
    } catch {
      // Fallback
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    runTelemetryExtraction();
  }, [runTelemetryExtraction]);

  // Window resize & orientation change listeners
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const dpr = window.devicePixelRatio || 1;
      const screenW = window.screen.width;
      const screenH = window.screen.height;
      const physicalW = Math.round(screenW * dpr);
      const physicalH = Math.round(screenH * dpr);

      setTelemetry((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          screenWidth: screenW,
          screenHeight: screenH,
          physicalWidth: physicalW,
          physicalHeight: physicalH,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          outerWidth: window.outerWidth,
          outerHeight: window.outerHeight,
          availWidth: window.screen.availWidth || screenW,
          availHeight: window.screen.availHeight || screenH,
          dpr,
          windowPositionX: window.screenX ?? window.screenLeft ?? 0,
          windowPositionY: window.screenY ?? window.screenTop ?? 0,
          orientationType: window.screen.orientation?.type || prev.orientationType,
          orientationAngle: window.screen.orientation?.angle || prev.orientationAngle,
        };
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#e2e8f0] flex flex-col font-mono selection:bg-[#00f0ff] selection:text-[#030712]">
      {/* Background Matrix Rain */}
      <canvas ref={bgCanvasRef} className="fixed inset-0 pointer-events-none opacity-25 z-0" />

      {/* Retro CRT Scanlines & Vignette */}
      {scanlinesEnabled && (
        <>
          <div className="fixed inset-0 scanlines z-30 pointer-events-none" />
          <div className="fixed inset-0 scan-beam z-30 pointer-events-none" />
          <div className="fixed inset-0 crt-vignette z-30 pointer-events-none" />
        </>
      )}

      {/* Hacker Glitch Boot Screen */}
      {!bootCompleted && (
        <CyberLoader
          onComplete={() => {
            setBootCompleted(true);
          }}
        />
      )}

      {/* Top Cyber Navigation Bar */}
      <CyberNavbar
        fps={fps}
        onRescan={runTelemetryExtraction}
        isScanning={isScanning}
        scanlinesEnabled={scanlinesEnabled}
        onToggleScanlines={() => setScanlinesEnabled((prev) => !prev)}
        onOpenDeadPixelTest={() => setDeadPixelOpen(true)}
      />

      {/* Main Content Dashboard */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Primary Screen Resolution Hero Showcase */}
        <ResolutionHero telemetry={telemetry} />

        {/* View Mode Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#00f0ff]/20 pb-2">
          <div className="flex flex-wrap gap-2">
            {/* Dossier Tab */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab("dossier");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-bold transition-all border ${
                activeTab === "dossier"
                  ? "bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_12px_#00f0ff44]"
                  : "bg-[#070d1e] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
              id="tab-dossier-btn"
            >
              <CrosshairIcon size={16} />
              <span>FULL TELEMETRY DOSSIER (50+ METRICS)</span>
            </button>

            {/* Resolution Comparator & Suite Tab */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab("suite");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-bold transition-all border ${
                activeTab === "suite"
                  ? "bg-[#00ff66]/20 border-[#00ff66] text-[#00ff66] shadow-[0_0_12px_#00ff6644]"
                  : "bg-[#070d1e] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
              id="tab-suite-btn"
            >
              <span>MOBILE / LAPTOP / DESKTOP RESOLUTION SUITE</span>
            </button>

            {/* Terminal CLI Tab */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab("terminal");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-bold transition-all border ${
                activeTab === "terminal"
                  ? "bg-[#bc13fe]/20 border-[#bc13fe] text-[#bc13fe] shadow-[0_0_12px_#bc13fe44]"
                  : "bg-[#070d1e] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
              id="tab-terminal-btn"
            >
              <TerminalIcon size={16} />
              <span>HACKER TERMINAL CLI</span>
            </button>
          </div>

          {/* Quick Action: Export Dossier */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              setExportModalOpen(true);
            }}
            className="cyber-button text-xs py-2 px-4 flex items-center gap-2"
            id="export-dossier-btn"
          >
            <DownloadIcon size={14} />
            <span>EXPORT DOSSIER (JSON / ASCII)</span>
          </button>
        </div>

        {/* Tab 1: Full Telemetry Dossier */}
        {activeTab === "dossier" && telemetry && (
          <div className="space-y-6 animate-fadeIn">
            <TelemetryGrid telemetry={telemetry} />
            <ResolutionSuite detectedTelemetry={telemetry} />
          </div>
        )}

        {/* Tab 2: Resolution Suite & Comparator */}
        {activeTab === "suite" && (
          <div className="space-y-6 animate-fadeIn">
            <ResolutionSuite detectedTelemetry={telemetry} />
            {telemetry && <TelemetryGrid telemetry={telemetry} />}
          </div>
        )}

        {/* Tab 3: Terminal CLI Shell */}
        {activeTab === "terminal" && (
          <div className="space-y-6 animate-fadeIn">
            <CyberTerminal
              telemetry={telemetry}
              onRescan={runTelemetryExtraction}
              onExport={() => setExportModalOpen(true)}
              onOpenDeadPixelTest={() => setDeadPixelOpen(true)}
            />
            {telemetry && <TelemetryGrid telemetry={telemetry} />}
          </div>
        )}
      </main>

      {/* Cyberpunk Footer */}
      <footer className="relative z-10 border-t border-[#00f0ff]/20 bg-[#030712]/95 py-6 px-4 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] pulse-led" />
            <span className="text-[#00f0ff] font-bold">CYBER-RESOLUTION MATRIX</span>
            <span>// DEEP HARDWARE TELEMETRY INTERROGATOR</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Node Session: <span className="text-[#ffe600]">{telemetry?.hardwareFingerprint || "INITIALIZING..."}</span>
          </div>
        </div>
      </footer>

      {/* Fullscreen Dead Pixel & Calibration Test Modal */}
      <DeadPixelTester
        isOpen={deadPixelOpen}
        onClose={() => setDeadPixelOpen(false)}
      />

      {/* Export Dossier Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        telemetry={telemetry}
      />
    </div>
  );
}
