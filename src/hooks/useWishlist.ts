import { useCallback, useEffect, useMemo, useState } from "react";
import { products, Product } from "@/data/products";

export type WishlistItem = {
  id: string;
  product_id: string;
  product?: Product;
};

const STORAGE_KEY = "anugadget_wishlist_v1";

const getProductById = (productId: string) =>
  products.find((p) => p.id === productId);

const loadWishlist = (): WishlistItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items: WishlistItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadWishlist();
    const hydrated = stored.map((item) => ({
      ...item,
      product: getProductById(item.product_id),
    }));
    setItems(hydrated);
    setIsLoading(false);
  }, []);

  const persist = useCallback((nextItems: WishlistItem[]) => {
    const hydrated = nextItems.map((item) => ({
      ...item,
      product: getProductById(item.product_id),
    }));
    setItems(hydrated);
    saveWishlist(nextItems);
  }, []);

  const addToWishlist = useCallback(async (productId: string) => {
    if (items.some((item) => item.product_id === productId)) return;
    const next = [
      ...items,
      {
        id: `${productId}-${Date.now()}`,
        product_id: productId,
        product: getProductById(productId),
      },
    ];
    persist(next);
  }, [items, persist]);

  const removeFromWishlist = useCallback(async (itemId: string) => {
    const next = items.filter((item) => item.id != itemId);
    persist(next);
  }, [items, persist]);

  const isInWishlist = useCallback((productId: string) =>
    items.some((item) => item.product_id === productId), [items]);

  const itemCount = useMemo(() => items.length, [items]);

  return {
    items,
    isLoading,
    itemCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};
