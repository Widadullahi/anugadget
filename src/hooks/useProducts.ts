import { useEffect, useState } from "react";
import { products as productData, Product } from "@/data/products";

type AdminProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  imageUrl?: string;
  images?: string[];
  specifications?: Record<string, string>;
  features?: string[];
  status?: string;
  oldPrice?: number;
};

const ADMIN_STORAGE_KEY = "anugadget_admin_products_v1";

const loadAdminProducts = (): AdminProduct[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const mapAdminToProduct = (item: AdminProduct): Product => ({
  id: String(item.id),
  name: item.name,
  price: item.price,
  original_price: item.oldPrice ?? null,
  image_url: item.imageUrl || item.image || item.images?.[0] || "/placeholder.svg",
  images: item.images && item.images.length > 0 ? item.images : (item.imageUrl ? [item.imageUrl] : item.image ? [item.image] : undefined),
  category: item.category,
  description: "",
  specifications: item.specifications,
  features: item.features,
  created_at: new Date().toISOString(),
  is_featured: false,
});

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch for loading states
    const timer = setTimeout(() => {
      const adminProducts = loadAdminProducts().map(mapAdminToProduct);
      setProducts([...adminProducts, ...productData]);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { products, isLoading };
};
