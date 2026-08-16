export interface DevicePreset {
  id: string;
  name: string;
  category: "mobile" | "tablet" | "laptop" | "desktop" | "ultrawide" | "tv";
  width: number;
  height: number;
  dpr: number;
  diagonalInches: number;
  label: string;
  aspectRatio: string;
  description: string;
}

export const DEVICE_PRESETS: DevicePreset[] = [
  // Mobile Presets
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    category: "mobile",
    width: 440,
    height: 956,
    dpr: 3.0,
    diagonalInches: 6.9,
    label: "1320 × 2868 (Physical)",
    aspectRatio: "19.5:9",
    description: "Super Retina XDR OLED, 120Hz ProMotion",
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro / 16 Pro",
    category: "mobile",
    width: 393,
    height: 852,
    dpr: 3.0,
    diagonalInches: 6.1,
    label: "1179 × 2556 (Physical)",
    aspectRatio: "19.5:9",
    description: "Dynamic Island Super Retina XDR",
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    category: "mobile",
    width: 412,
    height: 915,
    dpr: 3.5,
    diagonalInches: 6.8,
    label: "1440 × 3120 (Physical QHD+)",
    aspectRatio: "19.5:9",
    description: "Dynamic AMOLED 2X, 120Hz LTPO",
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro / 9 Pro XL",
    category: "mobile",
    width: 412,
    height: 923,
    dpr: 3.25,
    diagonalInches: 6.7,
    label: "1344 × 2992 (Physical)",
    aspectRatio: "20:9",
    description: "Super Actua display, 1-120Hz",
  },

  // Tablet Presets
  {
    id: "ipad-pro-13-m4",
    name: "iPad Pro 13\" (M4 OLED)",
    category: "tablet",
    width: 1032,
    height: 1376,
    dpr: 2.0,
    diagonalInches: 13.0,
    label: "2064 × 2752 (Physical)",
    aspectRatio: "4:3",
    description: "Tandem OLED Ultra Retina XDR",
  },
  {
    id: "ipad-air-11",
    name: "iPad Air 11\" (M2)",
    category: "tablet",
    width: 820,
    height: 1180,
    dpr: 2.0,
    diagonalInches: 10.9,
    label: "1640 × 2360 (Physical)",
    aspectRatio: "4.3:3",
    description: "Liquid Retina display",
  },
  {
    id: "samsung-tab-s9-ultra",
    name: "Samsung Galaxy Tab S9 Ultra",
    category: "tablet",
    width: 920,
    height: 1472,
    dpr: 2.0,
    diagonalInches: 14.6,
    label: "1848 × 2960 (Physical)",
    aspectRatio: "16:10",
    description: "Dynamic AMOLED 2X 120Hz",
  },

  // Laptop Presets
  {
    id: "macbook-pro-16",
    name: "MacBook Pro 16\" (Liquid Retina XDR)",
    category: "laptop",
    width: 1728,
    height: 1117,
    dpr: 2.0,
    diagonalInches: 16.2,
    label: "3456 × 2234 (Physical)",
    aspectRatio: "16:10",
    description: "Mini-LED, 120Hz ProMotion 1600 nits HDR",
  },
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14\" / MacBook Air 15\"",
    category: "laptop",
    width: 1512,
    height: 982,
    dpr: 2.0,
    diagonalInches: 14.2,
    label: "3024 × 1964 (Physical)",
    aspectRatio: "16:10",
    description: "Liquid Retina XDR Mini-LED",
  },
  {
    id: "macbook-air-13",
    name: "MacBook Air 13.6\" (M2/M3)",
    category: "laptop",
    width: 1280,
    height: 832,
    dpr: 2.0,
    diagonalInches: 13.6,
    label: "2560 × 1664 (Physical)",
    aspectRatio: "16:10",
    description: "Liquid Retina 500 nits",
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 / Precision 4K OLED",
    category: "laptop",
    width: 1920,
    height: 1200,
    dpr: 2.0,
    diagonalInches: 15.6,
    label: "3840 × 2400 (Physical 4K+)",
    aspectRatio: "16:10",
    description: "InfinityEdge 4K UHD+ Touch",
  },
  {
    id: "thinkpad-x1-carbon",
    name: "Lenovo ThinkPad X1 Carbon (WUXGA)",
    category: "laptop",
    width: 1920,
    height: 1200,
    dpr: 1.25,
    diagonalInches: 14.0,
    label: "1920 × 1200 (FHD+)",
    aspectRatio: "16:10",
    description: "Anti-glare IPS Business Display",
  },

  // Desktop Presets
  {
    id: "desktop-1080p",
    name: "1080p Full HD (FHD)",
    category: "desktop",
    width: 1920,
    height: 1080,
    dpr: 1.0,
    diagonalInches: 24.0,
    label: "1920 × 1080 (1080p)",
    aspectRatio: "16:9",
    description: "Standard Competitive Gaming & Office Standard",
  },
  {
    id: "desktop-1440p",
    name: "1440p Quad HD (2K QHD)",
    category: "desktop",
    width: 2560,
    height: 1440,
    dpr: 1.0,
    diagonalInches: 27.0,
    label: "2560 × 1440 (1440p 2K)",
    aspectRatio: "16:9",
    description: "High-Performance Gaming & Productivity Sweet Spot",
  },
  {
    id: "desktop-4k",
    name: "4K Ultra HD (UHD)",
    category: "desktop",
    width: 3840,
    height: 2160,
    dpr: 1.5,
    diagonalInches: 32.0,
    label: "3840 × 2160 (4K 2160p)",
    aspectRatio: "16:9",
    description: "Ultra-Crisp Creative & High-Fidelity Display",
  },
  {
    id: "desktop-5k-studio",
    name: "Apple Studio Display 5K",
    category: "desktop",
    width: 2560,
    height: 1440,
    dpr: 2.0,
    diagonalInches: 27.0,
    label: "5120 × 2880 (5K Retina)",
    aspectRatio: "16:9",
    description: "5K Retina Studio Monitor (218 PPI)",
  },
  {
    id: "desktop-8k",
    name: "8K Ultra HD (FUHD)",
    category: "desktop",
    width: 7680,
    height: 4320,
    dpr: 2.0,
    diagonalInches: 65.0,
    label: "7680 × 4320 (8K)",
    aspectRatio: "16:9",
    description: "33.2 Million Pixels Next-Gen Standard",
  },

  // Ultrawide & Super Ultrawide Presets
  {
    id: "ultrawide-3440-1440",
    name: "34\" UWQHD Ultrawide",
    category: "ultrawide",
    width: 3440,
    height: 1440,
    dpr: 1.0,
    diagonalInches: 34.0,
    label: "3440 × 1440 (21:9 UWQHD)",
    aspectRatio: "21:9",
    description: "Curved Immersion Gaming & Multi-Window Workflow",
  },
  {
    id: "ultrawide-3840-1600",
    name: "38\" WQHD+ Ultrawide",
    category: "ultrawide",
    width: 3840,
    height: 1600,
    dpr: 1.0,
    diagonalInches: 37.5,
    label: "3840 × 1600 (24:10 WQHD+)",
    aspectRatio: "24:10",
    description: "Large Format Curved Ultrawide Workstation",
  },
  {
    id: "super-ultrawide-49",
    name: "49\" Dual QHD (Samsung Odyssey G9)",
    category: "ultrawide",
    width: 5120,
    height: 1440,
    dpr: 1.0,
    diagonalInches: 49.0,
    label: "5120 × 1440 (32:9 DQHD)",
    aspectRatio: "32:9",
    description: "Dual 27\" Seamless Curved OLED Panoramic Display",
  },
  {
    id: "super-ultrawide-57",
    name: "57\" Dual 4K (Odyssey Neo G9 57\")",
    category: "ultrawide",
    width: 7680,
    height: 2160,
    dpr: 1.5,
    diagonalInches: 57.0,
    label: "7680 × 2160 (32:9 DUHD)",
    aspectRatio: "32:9",
    description: "Dual 32\" 4K Mini-LED 240Hz Mega Display",
  },
];

// Helper to compute GCD for aspect ratios
export function calculateAspectRatio(width: number, height: number): string {
  if (!width || !height) return "N/A";
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(Math.round(width), Math.round(height));
  const wRatio = Math.round(width) / divisor;
  const hRatio = Math.round(height) / divisor;

  // Check against common standardized aspect ratios for nice clean display
  const dec = width / height;
  if (Math.abs(dec - 16 / 9) < 0.02) return "16:9";
  if (Math.abs(dec - 16 / 10) < 0.02) return "16:10";
  if (Math.abs(dec - 21 / 9) < 0.03 || Math.abs(dec - 3440 / 1440) < 0.02) return "21:9";
  if (Math.abs(dec - 32 / 9) < 0.03) return "32:9";
  if (Math.abs(dec - 4 / 3) < 0.02) return "4:3";
  if (Math.abs(dec - 3 / 2) < 0.02) return "3:2";
  if (Math.abs(dec - 19.5 / 9) < 0.03) return "19.5:9";
  if (Math.abs(dec - 20 / 9) < 0.03) return "20:9";
  if (Math.abs(dec - 18 / 9) < 0.02) return "18:9 (2:1)";

  return `${wRatio}:${hRatio}`;
}

// Compute PPI, Dot Pitch, Physical Dimensions
export function computeDisplayMetrics(widthPx: number, heightPx: number, diagonalInches: number) {
  if (!widthPx || !heightPx || !diagonalInches || diagonalInches <= 0) {
    return null;
  }

  const diagonalPx = Math.sqrt(widthPx * widthPx + heightPx * heightPx);
  const ppi = Math.round((diagonalPx / diagonalInches) * 10) / 10;
  const dotPitchMm = Math.round((25.4 / ppi) * 1000) / 1000;
  const megapixels = Math.round(((widthPx * heightPx) / 1_000_000) * 100) / 100;

  // Physical width and height
  const angle = Math.atan(heightPx / widthPx);
  const physicalWidthInches = Math.round(diagonalInches * Math.cos(angle) * 10) / 10;
  const physicalHeightInches = Math.round(diagonalInches * Math.sin(angle) * 10) / 10;

  const physicalWidthCm = Math.round(physicalWidthInches * 2.54 * 10) / 10;
  const physicalHeightCm = Math.round(physicalHeightInches * 2.54 * 10) / 10;

  return {
    ppi,
    dotPitchMm,
    megapixels,
    physicalWidthInches,
    physicalHeightInches,
    physicalWidthCm,
    physicalHeightCm,
    totalPixels: widthPx * heightPx,
  };
}
