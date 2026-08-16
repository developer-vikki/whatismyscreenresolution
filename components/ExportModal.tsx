"use client";

import React, { useState } from "react";
import { TelemetryData } from "@/lib/telemetry";
import { DownloadIcon, CopyIcon, CheckIcon } from "./Icons";
import { cyberAudio } from "@/lib/cyberAudio";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: TelemetryData | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, telemetry }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !telemetry) return null;

  // Generate ASCII Cyber Report
  const generateAsciiReport = () => {
    return `
========================================================================
             CYBER-RESOLUTION // TELEMETRY EXTRACTION DOSSIER
========================================================================
[FINGERPRINT ID]  : ${telemetry.hardwareFingerprint}
[TIMESTAMP]       : ${telemetry.scanTimestamp}
[SECURITY STATUS] : LOW-LEVEL HARDWARE INTERROGATION COMPLETED
========================================================================

>> PRIMARY DISPLAY MATRIX:
------------------------------------------------------------------------
Physical Hardware Resolution : ${telemetry.physicalWidth} x ${telemetry.physicalHeight} px
Logical (CSS) Resolution     : ${telemetry.screenWidth} x ${telemetry.screenHeight} px
Browser Viewport (Inner)     : ${telemetry.viewportWidth} x ${telemetry.viewportHeight} px
Usable Available Area        : ${telemetry.availWidth} x ${telemetry.availHeight} px
Device Pixel Ratio (DPR)     : ${telemetry.dpr}x
Aspect Ratio                 : ${telemetry.aspectRatio} (${telemetry.resolutionName})
Color Depth                  : ${telemetry.colorDepth}-bit (${Math.pow(2, telemetry.colorDepth).toLocaleString()} Colors)
Color Gamut                  : ${telemetry.colorGamut}
High Dynamic Range (HDR)     : ${telemetry.hdrSupport ? "ENABLED" : "STANDARD SDR"}
Screen Orientation           : ${telemetry.orientationType} (${telemetry.orientationAngle} deg)
Refresh Rate (Estimated)     : ~${telemetry.estimatedRefreshRate} Hz
Touchscreen Support          : ${telemetry.touchSupport ? `YES (${telemetry.maxTouchPoints} touch points)` : "NO"}
Pointer Type                 : ${telemetry.pointerType}

>> GPU & 3D HARDWARE ACCELERATION:
------------------------------------------------------------------------
GPU Renderer                 : ${telemetry.gpuRenderer}
GPU Vendor                   : ${telemetry.gpuVendor}
WebGL Version                : ${telemetry.webglVersion}
GLSL Shader Language         : ${telemetry.shadingLanguage}
Max 2D Texture Size          : ${telemetry.maxTextureSize} x ${telemetry.maxTextureSize} px
Max Viewport Dimensions      : ${telemetry.maxViewportDims}
Max MSAA Samples             : ${telemetry.maxSamples}
Next-Gen WebGPU API          : ${telemetry.webgpuSupport ? "AVAILABLE" : "UNSUPPORTED"}

>> CPU & PROCESSING SUBSYSTEM:
------------------------------------------------------------------------
Logical CPU Cores            : ${telemetry.cpuCores} Threads
Estimated System RAM         : ${telemetry.deviceMemoryGB} GB
Connected Gamepads           : ${telemetry.gamepadsConnected} Controller(s)
Origin Storage Quota         : ${telemetry.storageQuotaMB || "N/A"} MB
Storage Consumed             : ${telemetry.storageUsageMB || "0"} MB

>> POWER & BATTERY TELEMETRY:
------------------------------------------------------------------------
Battery Charge Level         : ${telemetry.batteryLevel !== null ? `${telemetry.batteryLevel}%` : "AC / Desktop Power"}
Charging State               : ${telemetry.batteryCharging === true ? "CHARGING (AC CONNECTED)" : telemetry.batteryCharging === false ? "DISCHARGING ON BATTERY" : "DESKTOP / FIXED"}
Time Remaining               : ${telemetry.batteryDischargingTime || "AC CONNECTED"}

>> NETWORK & GEOLOCATION:
------------------------------------------------------------------------
Public IP Address            : ${telemetry.ip}
Geo Location                 : ${telemetry.city}, ${telemetry.region}, ${telemetry.country} (${telemetry.countryCode})
ISP / ASN                    : ${telemetry.isp} (${telemetry.asn})
Coordinates                  : Lat ${telemetry.latitude}, Lon ${telemetry.longitude}
Connection Status            : ${telemetry.isOnline ? "ONLINE" : "OFFLINE"}
Effective Network Profile    : ${telemetry.connectionType}
Downlink Bandwidth           : ${telemetry.downlinkSpeed}
Round-Trip Latency (RTT)     : ${telemetry.rttLatency}

>> BROWSER ENGINE & ENVIRONMENT:
------------------------------------------------------------------------
Browser Client               : ${telemetry.browserName} ${telemetry.browserVersion}
Operating System             : ${telemetry.osName} (${telemetry.platform})
Timezone                     : ${telemetry.timezone} (${telemetry.timezoneOffset})
Accepted Languages           : ${telemetry.languages.join(", ")}
Do Not Track (DNT)           : ${telemetry.doNotTrack}
Cookie Support               : ${telemetry.cookiesEnabled ? "ENABLED" : "DISABLED"}
Audio Context Sample Rate    : ${telemetry.audioSampleRate} Hz (${telemetry.audioMaxChannels} Channels)
Speech Synthesis Voices      : ${telemetry.speechVoicesCount}
User Agent String            : ${telemetry.userAgent}

========================================================================
              [END OF CYBER TELEMETRY TRANSMISSION]
========================================================================
`.trim();
  };

  const handleDownloadTxt = () => {
    cyberAudio.playScan();
    const text = generateAsciiReport();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cyber_telemetry_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    cyberAudio.playScan();
    const jsonStr = JSON.stringify(telemetry, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cyber_telemetry_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyClipboard = () => {
    cyberAudio.playClick();
    const text = generateAsciiReport();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl cyber-card rounded-xl p-6 border border-[#00f0ff] shadow-2xl bg-[#070d1e]">
        {/* Corner accents */}
        <div className="corner-tl" />
        <div className="corner-tr" />
        <div className="corner-bl" />
        <div className="corner-br" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <DownloadIcon size={18} className="text-[#00f0ff]" />
            <h3 className="text-sm font-bold font-mono text-white tracking-wider uppercase">
              EXPORT CYBER TELEMETRY DOSSIER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300 hover:text-white"
          >
            CLOSE [ESC]
          </button>
        </div>

        {/* Preview Area */}
        <div className="bg-[#030712] border border-[#00f0ff]/20 rounded p-3 h-64 overflow-y-auto font-mono text-[11px] text-slate-300 whitespace-pre scrollbar-thin">
          {generateAsciiReport()}
        </div>

        {/* Export Buttons */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleDownloadTxt}
            className="cyber-button text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
            id="download-txt-btn"
          >
            <DownloadIcon size={14} />
            <span>DOWNLOAD .TXT REPORT</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="cyber-button cyber-button-green text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
            id="download-json-btn"
          >
            <DownloadIcon size={14} />
            <span>DOWNLOAD .JSON</span>
          </button>

          <button
            onClick={handleCopyClipboard}
            className="cyber-button cyber-button-magenta text-xs py-2.5 px-3 flex items-center justify-center gap-1.5"
            id="copy-report-btn"
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            <span>{copied ? "COPIED DOSSIER!" : "COPY TO CLIPBOARD"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
