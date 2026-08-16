"use client";

import React, { useState } from "react";
import { TelemetryData } from "@/lib/telemetry";
import {
  MonitorIcon,
  GpuIcon,
  CpuIcon,
  WifiIcon,
  BatteryIcon,
  ShieldIcon,
  CopyIcon,
  CheckIcon,
  SparklesIcon,
} from "./Icons";
import { cyberAudio } from "@/lib/cyberAudio";

interface TelemetryGridProps {
  telemetry: TelemetryData;
}

interface TelemetryItem {
  key: string;
  label: string;
  value: string | number;
  highlight?: boolean;
  tag?: string;
}

interface TelemetrySection {
  id: string;
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  items: TelemetryItem[];
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({ telemetry }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyItem = (label: string, value: string | number, itemKey: string) => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(`${label}: ${value}`);
    setCopiedKey(itemKey);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const sections: TelemetrySection[] = [
    // 1. Display & Screen
    {
      id: "display",
      title: "Display & Viewport Telemetry",
      icon: MonitorIcon,
      color: "border-[#00f0ff] text-[#00f0ff]",
      items: [
        { key: "phys_res", label: "Physical Hardware Resolution", value: `${telemetry.physicalWidth} × ${telemetry.physicalHeight} px`, highlight: true },
        { key: "logic_res", label: "Logical Screen Resolution", value: `${telemetry.screenWidth} × ${telemetry.screenHeight} px` },
        { key: "avail_res", label: "Available Work Area", value: `${telemetry.availWidth} × ${telemetry.availHeight} px` },
        { key: "viewport_in", label: "Viewport (Inner Dimensions)", value: `${telemetry.viewportWidth} × ${telemetry.viewportHeight} px`, highlight: true },
        { key: "viewport_out", label: "Browser Window (Outer)", value: `${telemetry.outerWidth} × ${telemetry.outerHeight} px` },
        { key: "dpr", label: "Device Pixel Ratio (DPR)", value: `${telemetry.dpr}x`, tag: telemetry.dpr > 1 ? "HiDPI" : "1x Scale" },
        { key: "aspect", label: "Aspect Ratio", value: telemetry.aspectRatio, highlight: true },
        { key: "color_depth", label: "Color Depth / BPP", value: `${telemetry.colorDepth}-bit (${Math.pow(2, telemetry.colorDepth).toLocaleString()} Colors)` },
        { key: "pixel_depth", label: "Pixel Depth", value: `${telemetry.pixelDepth}-bit` },
        { key: "orientation", label: "Screen Orientation", value: `${telemetry.orientationType} (${telemetry.orientationAngle}°)` },
        { key: "refresh", label: "Display Refresh Rate", value: `~${telemetry.estimatedRefreshRate} Hz`, tag: "Live" },
        { key: "hdr", label: "HDR (Dynamic Range)", value: telemetry.hdrSupport ? "High Dynamic Range (HDR)" : "Standard (SDR)" },
        { key: "gamut", label: "Color Gamut", value: telemetry.colorGamut },
        { key: "touch", label: "Touch Capabilities", value: telemetry.touchSupport ? `Touchscreen (${telemetry.maxTouchPoints} touch points)` : "No Touch Input" },
        { key: "pointer", label: "Primary Pointer", value: telemetry.pointerType },
        { key: "window_pos", label: "Window Desktop Coordinates", value: `X: ${telemetry.windowPositionX}, Y: ${telemetry.windowPositionY}` },
      ],
    },

    // 2. GPU & WebGL Forensics
    {
      id: "gpu",
      title: "GPU & WebGL 3D Forensics",
      icon: GpuIcon,
      color: "border-[#bc13fe] text-[#bc13fe]",
      items: [
        { key: "gpu_ren", label: "Direct 3D Renderer", value: telemetry.gpuRenderer, highlight: true },
        { key: "gpu_ven", label: "Unmasked GPU Vendor", value: telemetry.gpuVendor },
        { key: "webgl_ver", label: "WebGL Version", value: telemetry.webglVersion, tag: "Graphics" },
        { key: "shading_lang", label: "Shading Language (GLSL)", value: telemetry.shadingLanguage },
        { key: "max_tex", label: "Max 2D Texture Size", value: `${telemetry.maxTextureSize} × ${telemetry.maxTextureSize} px` },
        { key: "max_view", label: "Max WebGL Viewport Dims", value: telemetry.maxViewportDims },
        { key: "max_samples", label: "Max Antialiasing MSAA Samples", value: telemetry.maxSamples },
        { key: "webgpu", label: "Next-Gen WebGPU API", value: telemetry.webgpuSupport ? "Supported & Active" : "Unsupported / Flag Disabled" },
      ],
    },

    // 3. CPU & Hardware Core
    {
      id: "hardware",
      title: "CPU & System Hardware Core",
      icon: CpuIcon,
      color: "border-[#00ff66] text-[#00ff66]",
      items: [
        { key: "cpu_cores", label: "Logical CPU Processors", value: `${telemetry.cpuCores} Threads / Cores`, highlight: true },
        { key: "device_mem", label: "Device RAM Estimate", value: typeof telemetry.deviceMemoryGB === "number" ? `~${telemetry.deviceMemoryGB} GB` : String(telemetry.deviceMemoryGB), tag: "Memory" },
        { key: "fingerprint", label: "Hardware Telemetry Hash", value: telemetry.hardwareFingerprint, highlight: true },
        { key: "gamepads", label: "Connected Gamepads", value: `${telemetry.gamepadsConnected} Controller(s)` },
        { key: "storage_quota", label: "Origin Storage Quota", value: telemetry.storageQuotaMB ? `${(telemetry.storageQuotaMB / 1024).toFixed(1)} GB (${telemetry.storageQuotaMB} MB)` : "Not Reported" },
        { key: "storage_usage", label: "Storage Consumed", value: telemetry.storageUsageMB !== null ? `${telemetry.storageUsageMB} MB` : "0 MB" },
      ],
    },

    // 4. Network & Geolocation
    {
      id: "network",
      title: "Network & Location Telemetry",
      icon: WifiIcon,
      color: "border-[#ffe600] text-[#ffe600]",
      items: [
        { key: "ip", label: "Public IP Address", value: telemetry.ip, highlight: true },
        { key: "location", label: "Geo Location", value: `${telemetry.city}, ${telemetry.region}, ${telemetry.country} (${telemetry.countryCode})` },
        { key: "isp", label: "Internet Service Provider (ISP)", value: telemetry.isp },
        { key: "asn", label: "Autonomous System (ASN)", value: telemetry.asn },
        { key: "coordinates", label: "Geo Coordinates", value: telemetry.latitude && telemetry.longitude ? `${telemetry.latitude.toFixed(4)}°, ${telemetry.longitude.toFixed(4)}°` : "Cloaked / Unavailable" },
        { key: "conn_status", label: "Connection State", value: telemetry.isOnline ? "Online (Connected)" : "Offline", tag: "Net" },
        { key: "conn_type", label: "Effective Network Profile", value: telemetry.connectionType },
        { key: "downlink", label: "Estimated Downlink Speed", value: telemetry.downlinkSpeed },
        { key: "rtt", label: "Round-Trip Latency (RTT)", value: telemetry.rttLatency },
        { key: "data_saver", label: "Data Saver Mode", value: telemetry.dataSaver ? "Enabled" : "Disabled" },
      ],
    },

    // 5. Battery & Power Subsystem
    {
      id: "power",
      title: "Battery & Power Subsystem",
      icon: BatteryIcon,
      color: "border-[#00ff66] text-[#00ff66]",
      items: [
        { key: "bat_level", label: "Battery Level", value: telemetry.batteryLevel !== null ? `${telemetry.batteryLevel}%` : "AC / Desktop (No Battery)", highlight: true },
        { key: "bat_charge", label: "Power Source", value: telemetry.batteryCharging === true ? "AC Adapter Connected (Charging)" : telemetry.batteryCharging === false ? "Discharging on Battery" : "Desktop / Fixed Power" },
        { key: "bat_time", label: "Power Status Estimate", value: telemetry.batteryDischargingTime || "AC Connected / Desktop" },
      ],
    },

    // 6. OS, Browser & Security
    {
      id: "browser_os",
      title: "Browser Engine & Security Vectors",
      icon: ShieldIcon,
      color: "border-[#00f0ff] text-[#00f0ff]",
      items: [
        { key: "browser", label: "Browser Client", value: `${telemetry.browserName} ${telemetry.browserVersion}`, highlight: true },
        { key: "os", label: "Operating System", value: `${telemetry.osName} (${telemetry.platform})`, highlight: true },
        { key: "timezone", label: "System Timezone", value: `${telemetry.timezone} (${telemetry.timezoneOffset})` },
        { key: "languages", label: "Accepted Languages", value: telemetry.languages.join(", ") },
        { key: "cookies", label: "Cookie Support", value: telemetry.cookiesEnabled ? "Enabled" : "Disabled" },
        { key: "dnt", label: "Do Not Track (DNT)", value: telemetry.doNotTrack },
        { key: "pdf", label: "Native PDF Viewer", value: telemetry.pdfViewerEnabled ? "Enabled" : "Disabled" },
        { key: "audio_sr", label: "Audio Context Sample Rate", value: `${telemetry.audioSampleRate} Hz (${telemetry.audioMaxChannels} Channels)` },
        { key: "speech", label: "Speech Synthesis Voices", value: `${telemetry.speechVoicesCount} Available Voices` },
        { key: "user_agent", label: "Full User Agent String", value: telemetry.userAgent },
      ],
    },
  ];

  // Filter sections and items based on search query
  const filteredSections = sections
    .map((section) => {
      const matchingItems = section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(item.value).toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...section, items: matchingItems };
    })
    .filter((section) => section.items.length > 0);

  return (
    <div className="w-full space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#070d1e] p-4 rounded-lg border border-[#00f0ff]/30">
        <div className="flex items-center gap-2">
          <SparklesIcon size={18} className="text-[#00ff66]" />
          <span className="text-xs sm:text-sm font-mono text-white font-bold uppercase tracking-wider">
            DEEP BROWSER TELEMETRY DOSSIER ({sections.reduce((acc, s) => acc + s.items.length, 0)} PARAMETERS)
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Filter parameters (e.g. GPU, WebGL, IP, Audio)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#030712] border border-[#00f0ff]/40 rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1.5 text-xs text-slate-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSections.map((section) => {
          const IconComp = section.icon;
          return (
            <div
              key={section.id}
              className="cyber-card rounded-xl p-5 relative flex flex-col justify-between border border-[#00f0ff]/25 hover:border-[#00f0ff]/50"
            >
              {/* Corner Accents */}
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />

              <div>
                {/* Section Title */}
                <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <IconComp size={18} className={section.color.split(" ")[1]} />
                    <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {section.items.length} Props
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  {section.items.map((item) => {
                    const isCopied = copiedKey === item.key;
                    return (
                      <div
                        key={item.key}
                        onClick={() => handleCopyItem(item.label, item.value, item.key)}
                        className={`group p-2 rounded transition-all cursor-pointer flex items-start justify-between gap-3 border ${
                          item.highlight
                            ? "bg-[#070d1e] border-[#00f0ff]/30 hover:border-[#00f0ff]"
                            : "bg-[#030712]/60 border-slate-800/80 hover:border-slate-700 hover:bg-[#070d1e]/80"
                        }`}
                        title="Click to copy parameter value"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                            <span>{item.label}</span>
                            {item.tag && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-xs font-mono font-semibold mt-0.5 break-all ${
                              item.highlight ? "text-[#00f0ff]" : "text-slate-200"
                            }`}
                          >
                            {item.value}
                          </div>
                        </div>

                        <button
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-[#00f0ff] transition-opacity"
                          title="Copy to clipboard"
                        >
                          {isCopied ? <CheckIcon size={14} className="text-[#00ff66]" /> : <CopyIcon size={14} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
