"use client";

import React, { useState, useRef, useEffect } from "react";
import { TelemetryData } from "@/lib/telemetry";
import { TerminalIcon } from "./Icons";
import { cyberAudio } from "@/lib/cyberAudio";

interface CyberTerminalProps {
  telemetry: TelemetryData | null;
  onRescan: () => void;
  onExport: () => void;
  onOpenDeadPixelTest: () => void;
}

interface CommandLog {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string;
}

export const CyberTerminal: React.FC<CyberTerminalProps> = ({
  telemetry,
  onRescan,
  onExport,
  onOpenDeadPixelTest,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    { id: "1", type: "system", text: "CYBER-CLI TERMINAL SHELL v4.89 [Type 'help' for commands]" },
    { id: "2", type: "system", text: "Connected to local node session. Low-level driver attached." },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = input.trim();
    if (!rawCmd) return;

    cyberAudio.playType();

    // Add to history
    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newLogs: CommandLog[] = [
      ...history,
      { id: String(Date.now()), type: "input", text: `root@cyber-node:~# ${rawCmd}` },
    ];

    const cmd = rawCmd.toLowerCase();

    switch (cmd) {
      case "help":
        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `AVAILABLE CYBER COMMANDS:
  help           - Displays this command reference list
  resolution     - Prints current screen resolution, DPR & viewport
  gpu            - Interrogates unmasked WebGL GPU hardware specs
  ip             - Prints public IP, ISP & geolocation coordinates
  battery        - Displays battery charge level & power status
  bench          - Executes a live browser compute & frame benchmark
  whoami         - Reveals system identity & digital telemetry fingerprint
  scan / rescan  - Initiates deep hardware & telemetry rescan
  calibrate      - Launches fullscreen dead pixel & display test
  export / dump  - Exports complete telemetry report to file
  audio          - Toggles cyber audio sound synthesizer
  clear / cls    - Clears the terminal screen buffer`,
        });
        break;

      case "resolution":
      case "res":
        if (telemetry) {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "output",
            text: `[DISPLAY SPECS]
  Physical Hardware: ${telemetry.physicalWidth} x ${telemetry.physicalHeight} px
  Logical (CSS):     ${telemetry.screenWidth} x ${telemetry.screenHeight} px
  Active Viewport:   ${telemetry.viewportWidth} x ${telemetry.viewportHeight} px
  Available Area:    ${telemetry.availWidth} x ${telemetry.availHeight} px
  Pixel Ratio (DPR): ${telemetry.dpr}x
  Aspect Ratio:      ${telemetry.aspectRatio} (${telemetry.resolutionName})
  Color Depth:       ${telemetry.colorDepth}-bit (${telemetry.hdrSupport ? "HDR Active" : "SDR"})
  Refresh Rate:      ~${telemetry.estimatedRefreshRate} Hz`,
          });
        } else {
          newLogs.push({ id: String(Date.now() + 1), type: "error", text: "Error: Telemetry buffer not ready." });
        }
        break;

      case "gpu":
        if (telemetry) {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "output",
            text: `[GPU 3D ACCELERATOR FORENSICS]
  Renderer:       ${telemetry.gpuRenderer}
  Vendor:         ${telemetry.gpuVendor}
  WebGL Engine:   ${telemetry.webglVersion}
  GLSL Shader:    ${telemetry.shadingLanguage}
  Max Texture:    ${telemetry.maxTextureSize} x ${telemetry.maxTextureSize} px
  MSAA Samples:   ${telemetry.maxSamples}
  WebGPU Support: ${telemetry.webgpuSupport ? "Active" : "Unsupported"}`,
          });
        }
        break;

      case "ip":
        if (telemetry) {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "output",
            text: `[NETWORK & GEOLOCATION]
  Public IP:   ${telemetry.ip}
  Location:    ${telemetry.city}, ${telemetry.region}, ${telemetry.country}
  ISP:         ${telemetry.isp} (${telemetry.asn})
  Coordinates: ${telemetry.latitude}, ${telemetry.longitude}
  Downlink:    ${telemetry.downlinkSpeed} | Latency: ${telemetry.rttLatency}`,
          });
        }
        break;

      case "battery":
      case "bat":
        if (telemetry) {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "output",
            text: `[BATTERY & POWER]
  Charge Level: ${telemetry.batteryLevel !== null ? `${telemetry.batteryLevel}%` : "AC / Desktop Power"}
  Charging:     ${telemetry.batteryCharging === true ? "YES (AC Connected)" : telemetry.batteryCharging === false ? "NO (Discharging)" : "Fixed Power"}
  Time Status:  ${telemetry.batteryDischargingTime || "AC Connected"}`,
          });
        }
        break;

      case "bench":
      case "benchmark": {
        cyberAudio.playScan();
        const start = performance.now();
        let ops = 0;
        for (let i = 0; i < 5_000_000; i++) {
          ops += Math.sqrt(i) * Math.sin(i);
        }
        const duration = (performance.now() - start).toFixed(2);
        const opsPerSec = Math.round((5_000_000 / Number(duration)) * 1000).toLocaleString();

        newLogs.push({
          id: String(Date.now() + 1),
          type: "output",
          text: `[CPU COMPUTE BENCHMARK RESULTS]
  Iterations:     5,000,000 Trig & Sqrt Math ops
  Execution Time: ${duration} ms
  Compute Score:  ${opsPerSec} ops/sec
  CPU Cores:      ${telemetry?.cpuCores || "N/A"}
  Status:         HIGH-PERFORMANCE COMPUTE MATRIX OK`,
        });
        break;
      }

      case "whoami":
        if (telemetry) {
          newLogs.push({
            id: String(Date.now() + 1),
            type: "output",
            text: `[IDENTITY TELEMETRY DOSSIER]
  Fingerprint ID: ${telemetry.hardwareFingerprint}
  Operating Sys:  ${telemetry.osName} (${telemetry.platform})
  Browser Client: ${telemetry.browserName} ${telemetry.browserVersion}
  Timezone:       ${telemetry.timezone} (${telemetry.timezoneOffset})
  Timestamp:      ${telemetry.scanTimestamp}`,
          });
        }
        break;

      case "scan":
      case "rescan":
        cyberAudio.playScan();
        onRescan();
        newLogs.push({
          id: String(Date.now() + 1),
          type: "system",
          text: "Triggered deep telemetry interrogation. Probing hardware buffers...",
        });
        break;

      case "calibrate":
      case "pixel":
        onOpenDeadPixelTest();
        newLogs.push({
          id: String(Date.now() + 1),
          type: "system",
          text: "Launching fullscreen display calibration and dead pixel matrix...",
        });
        break;

      case "export":
      case "dump":
        onExport();
        newLogs.push({
          id: String(Date.now() + 1),
          type: "system",
          text: "Opening telemetry export suite...",
        });
        break;

      case "audio": {
        const nextMuted = cyberAudio.toggleMute();
        newLogs.push({
          id: String(Date.now() + 1),
          type: "system",
          text: `Procedural Web Audio SFX: ${!nextMuted ? "ENABLED [ACTIVE]" : "MUTED"}`,
        });
        break;
      }

      case "clear":
      case "cls":
        setHistory([]);
        setInput("");
        return;

      case "nuke":
        cyberAudio.playAlarm();
        newLogs.push({
          id: String(Date.now() + 1),
          type: "error",
          text: "⚠️ WARNING: UNAUTHORIZED CYBER PROTOCOL DETECTED. SYSTEM COMPROMISE INITIATED...",
        });
        break;

      default:
        cyberAudio.playGlitch();
        newLogs.push({
          id: String(Date.now() + 1),
          type: "error",
          text: `Command not found: '${rawCmd}'. Type 'help' for list of commands.`,
        });
        break;
    }

    setHistory(newLogs);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const available = ["help", "resolution", "gpu", "ip", "battery", "bench", "whoami", "scan", "calibrate", "export", "audio", "clear"];
      const match = available.find((c) => c.startsWith(input.toLowerCase().trim()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div className="w-full cyber-card rounded-xl p-5 relative border border-[#00f0ff]/30">
      {/* Corner Accents */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-[#00ff66]" />
          <span className="text-xs font-bold font-mono text-white tracking-wider uppercase">
            CYBER TERMINAL CLI INTERFACE
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Try typing: <code className="text-[#00f0ff]">bench</code>, <code className="text-[#00ff66]">resolution</code>, <code className="text-[#ffe600]">gpu</code>, or <code className="text-[#bc13fe]">help</code>
        </span>
      </div>

      {/* Terminal Console Output Window */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="bg-[#030712] border border-[#00f0ff]/20 rounded-lg p-3.5 h-64 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5 cursor-text"
      >
        {history.map((log) => {
          if (log.type === "input") {
            return (
              <div key={log.id} className="text-[#00ff66] font-semibold">
                {log.text}
              </div>
            );
          }
          if (log.type === "error") {
            return (
              <div key={log.id} className="text-[#ff0055] whitespace-pre-wrap">
                {log.text}
              </div>
            );
          }
          if (log.type === "system") {
            return (
              <div key={log.id} className="text-[#00f0ff] whitespace-pre-wrap">
                {log.text}
              </div>
            );
          }
          return (
            <div key={log.id} className="text-slate-300 whitespace-pre-wrap leading-relaxed">
              {log.text}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Command Input Form */}
      <form onSubmit={handleCommand} className="mt-3 flex items-center gap-2">
        <span className="text-xs font-mono text-[#00ff66] select-none font-bold">
          root@cyber-node:~#
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g. 'help', 'bench', 'gpu', 'ip')..."
          className="flex-1 bg-[#030712] border border-[#00f0ff]/40 rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
          id="terminal-input"
        />
        <button
          type="submit"
          className="cyber-button text-xs py-1.5 px-3 uppercase"
        >
          EXEC
        </button>
      </form>
    </div>
  );
};
