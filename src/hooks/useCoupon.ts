import { useCallback, useEffect, useState } from "react";

export type Coupon = {
  id: string;
  code: string;
  discount_type: "percentage" | "flat";
  discount_value: number;
  discountAmount?: number;
};

const STORAGE_KEY = "anugadget_coupon_v1";

const COUPONS: Coupon[] = [
  { id: "welcome10", code: "WELCOME10", discount_type: "percentage", discount_value: 10 },
  { id: "flat5000", code: "FLAT5000", discount_type: "flat", discount_value: 5000 },
];

const loadCoupon = (): Coupon | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Coupon;
  } catch {
    return null;
  }
};

const saveCoupon = (coupon: Coupon | null) => {
  if (typeof window === "undefined") return;
  if (!coupon) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(coupon));
};

const computeDiscount = (coupon: Coupon, subtotal: number) => {
  if (coupon.discount_type === "percentage") {
    return Math.round((coupon.discount_value / 100) * subtotal);
  }
  return coupon.discount_value;
};

export const useCoupon = () => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const stored = loadCoupon();
    if (stored) {
      setAppliedCoupon(stored);
    }
  }, []);

  const validateAndApplyCoupon = useCallback(async (code: string, subtotal: number) => {
    const normalized = code.trim().toUpperCase();
    setIsValidating(true);

    const coupon = COUPONS.find((c) => c.code === normalized);
    if (!coupon) {
      setIsValidating(false);
      return false;
    }

    const discountAmount = computeDiscount(coupon, subtotal);
    const applied = { ...coupon, discountAmount };
    setAppliedCoupon(applied);
    saveCoupon(applied);

    setIsValidating(false);
    return true;
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    saveCoupon(null);
  }, []);

  const recalculateDiscount = useCallback((subtotal: number) => {
    if (!appliedCoupon) return;
    const discountAmount = computeDiscount(appliedCoupon, subtotal);
    const updated = { ...appliedCoupon, discountAmount };
    setAppliedCoupon(updated);
    saveCoupon(updated);
  }, [appliedCoupon]);

  return {
    appliedCoupon,
    isValidating,
    validateAndApplyCoupon,
    removeCoupon,
    recalculateDiscount,
  };
};
