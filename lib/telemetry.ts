"use client";

import { calculateAspectRatio } from "./presets";

export interface TelemetryData {
  // Screen & Display
  screenWidth: number;
  screenHeight: number;
  physicalWidth: number;
  physicalHeight: number;
  availWidth: number;
  availHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  outerWidth: number;
  outerHeight: number;
  dpr: number;
  colorDepth: number;
  pixelDepth: number;
  orientationType: string;
  orientationAngle: number;
  aspectRatio: string;
  resolutionName: string;
  estimatedRefreshRate: number;
  hdrSupport: boolean;
  colorGamut: string;
  maxTouchPoints: number;
  touchSupport: boolean;
  pointerType: string;
  hoverSupport: boolean;
  colorScheme: "dark" | "light" | "unknown";
  reducedMotion: boolean;
  windowPositionX: number;
  windowPositionY: number;

  // Hardware & WebGL
  cpuCores: number | string;
  deviceMemoryGB: number | string;
  gpuVendor: string;
  gpuRenderer: string;
  webglVersion: string;
  shadingLanguage: string;
  maxTextureSize: number | string;
  maxViewportDims: string;
  maxSamples: number | string;
  webgpuSupport: boolean;
  batteryLevel: number | null;
  batteryCharging: boolean | null;
  batteryDischargingTime: string | null;
  gamepadsConnected: number;
  storageQuotaMB: number | null;
  storageUsageMB: number | null;

  // Network & Geo
  isOnline: boolean;
  connectionType: string;
  downlinkSpeed: string;
  rttLatency: string;
  dataSaver: boolean;
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
  asn: string;
  latitude: number | null;
  longitude: number | null;

  // Browser & Environment
  userAgent: string;
  browserName: string;
  browserVersion: string;
  osName: string;
  platform: string;
  language: string;
  languages: string[];
  timezone: string;
  timezoneOffset: string;
  cookiesEnabled: boolean;
  doNotTrack: string;
  pdfViewerEnabled: boolean;
  audioSampleRate: number | string;
  audioMaxChannels: number | string;
  speechVoicesCount: number;
  hardwareFingerprint: string;
  scanTimestamp: string;
}

// Generate simple deterministic fingerprint hash
function generateFingerprint(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
  return `CYBER-ID-${hex}`;
}

// Classify standard resolution name
function getResolutionClassification(width: number, height: number): string {
  const max = Math.max(width, height);
  const min = Math.min(width, height);

  if (max >= 7680 && min >= 4320) return "8K Ultra HD (FUHD)";
  if (max >= 5120 && min >= 2880) return "5K Retina Studio";
  if (max >= 5120 && min >= 1440) return "Super Ultrawide (DQHD 32:9)";
  if (max >= 3840 && min >= 2160) return "4K Ultra HD (UHD 2160p)";
  if (max >= 3440 && min >= 1440) return "Ultrawide QHD (UWQHD 21:9)";
  if (max >= 2560 && min >= 1440) return "Quad HD (1440p 2K QHD)";
  if (max >= 1920 && min >= 1200) return "WUXGA (1200p 16:10)";
  if (max >= 1920 && min >= 1080) return "Full HD (1080p FHD)";
  if (max >= 1600 && min >= 900) return "HD+ (900p)";
  if (max >= 1366 && min >= 768) return "WXGA (768p HD)";
  if (max >= 1280 && min >= 720) return "Standard HD (720p)";
  if (max <= 960 && min <= 540) return "qHD Mobile Display";
  return "Custom Display Resolution";
}

// Parse Browser & OS cleanly
function parseClientEnvironment(ua: string) {
  let browserName = "Unknown Browser";
  let browserVersion = "Unknown";
  let osName = "Unknown OS";

  // OS Detection
  if (/windows phone/i.test(ua)) osName = "Windows Phone";
  else if (/win(dows )?nt 10\.0/i.test(ua)) osName = "Windows 10 / 11";
  else if (/win(dows )?nt 6\.3/i.test(ua)) osName = "Windows 8.1";
  else if (/win(dows )?nt 6\.2/i.test(ua)) osName = "Windows 8";
  else if (/win(dows )?nt 6\.1/i.test(ua)) osName = "Windows 7";
  else if (/windows/i.test(ua)) osName = "Windows";
  else if (/android/i.test(ua)) osName = "Android OS";
  else if (/iphone|ipad|ipod/i.test(ua)) osName = "Apple iOS";
  else if (/macintosh|mac os x/i.test(ua)) osName = "macOS";
  else if (/linux/i.test(ua)) osName = "Linux OS";
  else if (/cros/i.test(ua)) osName = "Chrome OS";

  // Browser Detection
  if (/edg\//i.test(ua)) {
    browserName = "Microsoft Edge";
    const m = ua.match(/edg\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/opr\//i.test(ua) || /opera/i.test(ua)) {
    browserName = "Opera";
    const m = ua.match(/(?:opr|opera)\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/brave/i.test(ua) || ((navigator as unknown as { brave?: unknown }).brave !== undefined)) {
    browserName = "Brave Browser";
    const m = ua.match(/chrome\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/chrome|crios/i.test(ua)) {
    browserName = "Google Chrome";
    const m = ua.match(/(?:chrome|crios)\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/firefox|fxios/i.test(ua)) {
    browserName = "Mozilla Firefox";
    const m = ua.match(/(?:firefox|fxios)\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browserName = "Apple Safari";
    const m = ua.match(/version\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  }

  return { browserName, browserVersion, osName };
}

// Probe WebGL GPU hardware specs
function extractWebGLTelemetry() {
  let gpuVendor = "Unknown GPU Vendor";
  let gpuRenderer = "Generic WebGL Accelerator";
  let webglVersion = "Unsupported";
  let shadingLanguage = "N/A";
  let maxTextureSize: number | string = "N/A";
  let maxViewportDims = "N/A";
  let maxSamples: number | string = "N/A";

  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (gl) {
      webglVersion = gl instanceof WebGL2RenderingContext ? "WebGL 2.0" : "WebGL 1.0";
      shadingLanguage = gl.getParameter(gl.SHADING_LANGUAGE_VERSION) || "N/A";
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || "N/A";

      const dims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
      if (dims && Array.isArray(dims)) {
        maxViewportDims = `${dims[0]} × ${dims[1]}`;
      } else if (dims && typeof dims === "object" && 0 in dims && 1 in dims) {
        maxViewportDims = `${dims[0]} × ${dims[1]}`;
      }

      if (gl instanceof WebGL2RenderingContext) {
        maxSamples = gl.getParameter(gl.MAX_SAMPLES) || "N/A";
      }

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (vendor) gpuVendor = String(vendor);
        if (renderer) gpuRenderer = String(renderer);
      }
    }
  } catch {
    // WebGL disabled or sandboxed
  }

  return {
    gpuVendor,
    gpuRenderer,
    webglVersion,
    shadingLanguage,
    maxTextureSize,
    maxViewportDims,
    maxSamples,
  };
}

// Measure screen refresh rate via requestAnimationFrame
export function measureRefreshRate(callback: (fps: number) => void) {
  if (typeof window === "undefined") return;

  let frames = 0;
  let startTime = performance.now();
  const sampleCount = 60;

  function loop(now: number) {
    frames++;
    if (frames >= sampleCount) {
      const elapsed = now - startTime;
      const calculatedFps = Math.round((frames / elapsed) * 1000);
      // Standardize to common monitor refresh steps: 60, 75, 90, 120, 144, 165, 240, 360
      let rounded = calculatedFps;
      const targets = [60, 75, 90, 120, 144, 165, 240, 360];
      for (const t of targets) {
        if (Math.abs(calculatedFps - t) <= 4) {
          rounded = t;
          break;
        }
      }
      callback(rounded);
      return;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame((time) => {
    startTime = time;
    requestAnimationFrame(loop);
  });
}

// Extract full system telemetry
export async function extractFullTelemetry(): Promise<TelemetryData> {
  if (typeof window === "undefined") {
    throw new Error("Telemetry must run client-side");
  }

  const dpr = window.devicePixelRatio || 1;
  const screenW = window.screen.width || window.innerWidth;
  const screenH = window.screen.height || window.innerHeight;
  const physicalW = Math.round(screenW * dpr);
  const physicalH = Math.round(screenH * dpr);

  const { browserName, browserVersion, osName } = parseClientEnvironment(navigator.userAgent);
  const webglData = extractWebGLTelemetry();

  // Color Gamut detection
  let colorGamut = "sRGB";
  if (window.matchMedia("(color-gamut: rec2020)").matches) {
    colorGamut = "Rec. 2020 (Ultra Wide Gamut)";
  } else if (window.matchMedia("(color-gamut: p3)").matches) {
    colorGamut = "Display P3 (Wide Color)";
  }

  const hdrSupport = window.matchMedia("(dynamic-range: high)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "unknown";

  const pointerType = window.matchMedia("(pointer: fine)").matches
    ? "Fine Mouse/Trackpad"
    : window.matchMedia("(pointer: coarse)").matches
    ? "Coarse Touch Screen"
    : "None / Unknown";

  const hoverSupport = window.matchMedia("(hover: hover)").matches;

  // Audio Context Probe
  let audioSampleRate: number | string = "N/A";
  let audioMaxChannels: number | string = "N/A";
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      const actx = new AudioCtx();
      audioSampleRate = actx.sampleRate;
      audioMaxChannels = actx.destination.maxChannelCount;
      actx.close().catch(() => {});
    }
  } catch {}

  // Battery Probe
  let batteryLevel: number | null = null;
  let batteryCharging: boolean | null = null;
  let batteryDischargingTime: string | null = null;
  try {
    const nav = navigator as unknown as { getBattery?: () => Promise<{ level: number; charging: boolean; dischargingTime: number }> };
    if (nav.getBattery) {
      const battery = await nav.getBattery();
      batteryLevel = Math.round(battery.level * 100);
      batteryCharging = battery.charging;
      batteryDischargingTime =
        battery.dischargingTime === Infinity ? "AC Connected" : `${Math.round(battery.dischargingTime / 60)} min remaining`;
    }
  } catch {}

  // Storage Quota Probe
  let storageQuotaMB: number | null = null;
  let storageUsageMB: number | null = null;
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      if (estimate.quota) {
        storageQuotaMB = Math.round(estimate.quota / (1024 * 1024));
      }
      if (estimate.usage !== undefined) {
        storageUsageMB = Math.round((estimate.usage / (1024 * 1024)) * 100) / 100;
      }
    }
  } catch {}

  // Network info
  const conn = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean } }).connection;
  const connectionType = conn?.effectiveType ? conn.effectiveType.toUpperCase() : navigator.onLine ? "Active Broadband / WiFi" : "Offline";
  const downlinkSpeed = conn?.downlink ? `${conn.downlink} Mbps` : "N/A";
  const rttLatency = conn?.rtt ? `${conn.rtt} ms` : "N/A";
  const dataSaver = !!conn?.saveData;

  // Speech Voices
  let speechVoicesCount = 0;
  try {
    if (typeof window.speechSynthesis !== "undefined") {
      speechVoicesCount = window.speechSynthesis.getVoices().length;
    }
  } catch {}

  // Timezone Offset
  const offsetMinutes = -new Date().getTimezoneOffset();
  const offsetHours = offsetMinutes / 60;
  const timezoneOffset = `UTC${offsetHours >= 0 ? `+${offsetHours}` : offsetHours}`;

  // Public IP & Geo Lookup (with safe offline fallback)
  let ip = "127.0.0.1 (Localhost / Cloaked)";
  let city = "Cyber Node";
  let region = "Matrix Sector";
  let country = "Encrypted Grid";
  let countryCode = "CY";
  let isp = "Direct Neural Link";
  let asn = "AS00000";
  let latitude: number | null = null;
  let longitude: number | null = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch("https://ipwho.is/", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false) {
        ip = data.ip || ip;
        city = data.city || city;
        region = data.region || region;
        country = data.country || country;
        countryCode = data.country_code || countryCode;
        isp = data.connection?.isp || data.isp || isp;
        asn = data.connection?.asn ? `AS${data.connection.asn}` : asn;
        latitude = data.latitude || null;
        longitude = data.longitude || null;
      }
    }
  } catch {
    // Graceful offline / adblocked fallback
  }

  // Fingerprint string
  const rawFingerprint = `${screenW}x${screenH}x${dpr}_${navigator.hardwareConcurrency}_${navigator.language}_${webglData.gpuRenderer}`;
  const hardwareFingerprint = generateFingerprint(rawFingerprint);

  return {
    screenWidth: screenW,
    screenHeight: screenH,
    physicalWidth: physicalW,
    physicalHeight: physicalH,
    availWidth: window.screen.availWidth || screenW,
    availHeight: window.screen.availHeight || screenH,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    dpr,
    colorDepth: window.screen.colorDepth || 24,
    pixelDepth: window.screen.pixelDepth || 24,
    orientationType: window.screen.orientation?.type || "landscape-primary",
    orientationAngle: window.screen.orientation?.angle || 0,
    aspectRatio: calculateAspectRatio(physicalW, physicalH),
    resolutionName: getResolutionClassification(physicalW, physicalH),
    estimatedRefreshRate: 60, // Refined by measureRefreshRate
    hdrSupport,
    colorGamut,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    touchSupport: ("ontouchstart" in window) || navigator.maxTouchPoints > 0,
    pointerType,
    hoverSupport,
    colorScheme,
    reducedMotion,
    windowPositionX: window.screenX ?? window.screenLeft ?? 0,
    windowPositionY: window.screenY ?? window.screenTop ?? 0,

    cpuCores: navigator.hardwareConcurrency || "Unavailable",
    deviceMemoryGB: (navigator as unknown as { deviceMemory?: number }).deviceMemory || "N/A (Non-Chromium)",
    ...webglData,
    webgpuSupport: "gpu" in navigator,
    batteryLevel,
    batteryCharging,
    batteryDischargingTime,
    gamepadsConnected: typeof navigator.getGamepads === "function" ? Array.from(navigator.getGamepads() || []).filter(Boolean).length : 0,
    storageQuotaMB,
    storageUsageMB,

    isOnline: navigator.onLine,
    connectionType,
    downlinkSpeed,
    rttLatency,
    dataSaver,
    ip,
    city,
    region,
    country,
    countryCode,
    isp,
    asn,
    latitude,
    longitude,

    userAgent: navigator.userAgent,
    browserName,
    browserVersion,
    osName,
    platform: navigator.platform || "Web",
    language: navigator.language || "en",
    languages: [...(navigator.languages || [navigator.language || "en"])],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    timezoneOffset,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack === "1" ? "Enabled (Tracking Blocked)" : "Disabled / Default",
    pdfViewerEnabled: (navigator as unknown as { pdfViewerEnabled?: boolean }).pdfViewerEnabled ?? true,
    audioSampleRate,
    audioMaxChannels,
    speechVoicesCount,
    hardwareFingerprint,
    scanTimestamp: new Date().toISOString(),
  };
}
