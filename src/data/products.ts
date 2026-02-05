import iphone15ProMax from "@/assets/iphone-15-pro-max.jpg";
import macbookProM3 from "@/assets/macbook-pro-m3.jpg";
import appleWatchUltra2 from "@/assets/apple-watch-ultra-2.jpg";
import airpodsPro2 from "@/assets/airpods-pro-2.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  image_url?: string;
  images?: string[];
  category: string;
  brand?: string;
  description?: string;
  specifications?: Record<string, string>;
  features?: string[];
  created_at: string;
  is_featured?: boolean;
};

export const products: Product[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max 256GB",
    price: 1200000,
    original_price: 1450000,
    image_url: iphone15ProMax,
    images: [iphone15ProMax, iphone15ProMax, iphone15ProMax, iphone15ProMax],
    category: "Phones",
    brand: "Apple",
    description: "A17 Pro performance, 48MP camera system, and a stunning 6.7-inch ProMotion display.",
    specifications: {
      Display: "6.7-inch Super Retina XDR",
      Processor: "A17 Pro chip",
      Storage: "256GB",
      RAM: "8GB",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      Battery: "4422 mAh",
      Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
    },
    features: [
      "A17 Pro chip with 6-core GPU",
      "Action button for quick access",
      "USB-C with USB 3 speeds",
      "ProRes video recording",
      "Ceramic Shield front",
    ],
    created_at: "2025-01-10",
    is_featured: true,
  },
  {
    id: "macbook-pro-m3",
    name: "MacBook Pro M3 14-inch",
    price: 2500000,
    original_price: 2850000,
    image_url: macbookProM3,
    images: [macbookProM3, macbookProM3, macbookProM3, macbookProM3],
    category: "Laptops",
    brand: "Apple",
    description: "Pro performance with M3 chip, Liquid Retina XDR display, and all-day battery life.",
    specifications: {
      Display: "14.2-inch Liquid Retina XDR",
      Processor: "Apple M3 chip",
      Storage: "512GB SSD",
      RAM: "18GB Unified Memory",
      Graphics: "10-core GPU",
      Battery: "Up to 17 hours",
    },
    features: [
      "M3 chip with 8-core CPU",
      "ProMotion technology",
      "1600 nits peak brightness",
      "Six-speaker sound system",
    ],
    created_at: "2025-01-08",
    is_featured: true,
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    price: 800000,
    original_price: 950000,
    image_url: appleWatchUltra2,
    images: [appleWatchUltra2, appleWatchUltra2, appleWatchUltra2, appleWatchUltra2],
    category: "Watches",
    brand: "Apple",
    description: "Rugged, bright, and packed with outdoor features for athletes and adventurers.",
    specifications: {
      Display: "49mm Always-On Retina",
      Processor: "S9 SiP",
      Storage: "64GB",
      WaterResistance: "100m",
      Battery: "Up to 36 hours",
    },
    features: [
      "3000 nits brightness",
      "Double tap gesture",
      "Precision GPS",
      "Depth gauge & water temp",
    ],
    created_at: "2025-01-12",
    is_featured: false,
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2nd Gen",
    price: 250000,
    original_price: 320000,
    image_url: airpodsPro2,
    images: [airpodsPro2, airpodsPro2, airpodsPro2, airpodsPro2],
    category: "Audio",
    brand: "Apple",
    description: "Powerful noise cancellation, spatial audio, and USB-C charging.",
    specifications: {
      Chip: "Apple H2",
      ANC: "Active Noise Cancellation",
      Battery: "6 hours (30 hours with case)",
      Charging: "USB-C, MagSafe, Qi",
    },
    features: [
      "2x Active Noise Cancellation",
      "Adaptive Transparency",
      "Personalized Spatial Audio",
      "Find My integration",
    ],
    created_at: "2025-01-05",
    is_featured: false,
  },
  {
    id: "smart-4k-tv",
    name: "Ultra HD 4K Smart TV 55\"",
    price: 520000,
    original_price: 650000,
    image_url: heroBanner,
    images: [heroBanner],
    category: "Accessories",
    brand: "Astra",
    description: "Cinematic 4K clarity with HDR support and smart streaming apps.",
    created_at: "2025-01-03",
    is_featured: false,
  },
  {
    id: "gaming-console-pro",
    name: "GameBox Pro Console",
    price: 680000,
    original_price: 750000,
    image_url: heroBanner,
    images: [heroBanner],
    category: "Gaming",
    brand: "GameBox",
    description: "Next-gen gaming performance with ultra-fast SSD and 4K support.",
    created_at: "2024-12-28",
    is_featured: true,
  },
];
