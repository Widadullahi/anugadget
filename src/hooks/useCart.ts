import { useCallback, useEffect, useMemo, useState } from "react";
import { products, Product } from "@/data/products";

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  product?: Product;
};

const STORAGE_KEY = "anugadget_cart_v1";

const getProductById = (productId: string) =>
  products.find((p) => p.id === productId);

const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadCart();
    const hydrated = stored.map((item) => ({
      ...item,
      product: getProductById(item.product_id),
    }));
    setItems(hydrated);
    setIsLoading(false);
  }, []);

  const persist = useCallback((nextItems: CartItem[]) => {
    const hydrated = nextItems.map((item) => ({
      ...item,
      product: getProductById(item.product_id),
    }));
    setItems(hydrated);
    saveCart(nextItems);
  }, []);

  const addToCart = useCallback(async (productId: string, quantity: number) => {
    const qty = Math.max(1, quantity);
    const next = [...items];
    const existing = next.find((item) => item.product_id === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      next.push({
        id: `${productId}-${Date.now()}`,
        product_id: productId,
        quantity: qty,
        product: getProductById(productId),
      });
    }
    persist(next);
  }, [items, persist]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    const next = items
      .map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
      .filter((item) => item.quantity > 0);
    persist(next);
  }, [items, persist]);

  const removeFromCart = useCallback((itemId: string) => {
    const next = items.filter((item) => item.id != itemId);
    persist(next);
  }, [items, persist]);

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const subtotal = useMemo(() =>
    items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0),
  [items]);

  const itemCount = useMemo(() =>
    items.reduce((sum, item) => sum + item.quantity, 0),
  [items]);

  return {
    items,
    isLoading,
    itemCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
