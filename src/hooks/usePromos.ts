import { useEffect, useState } from "react";

export type PromoBanner = {
  id: number;
  title: string;
  description: string;
  buttonLabel: string;
  link: string;
  enabled: boolean;
};

const PROMOS_KEY = "anugadget_admin_promos_v1";
const PROMOS_EVENT = "anugadget-promos-updated";

export const defaultPromos: PromoBanner[] = [
  {
    id: 1,
    title: "Power Deals",
    description: "Never Go Dark Again | Power Stations Promo Up to 40% Discount",
    buttonLabel: "Hurry Now!",
    link: "/shop?category=power",
    enabled: true,
  },
];

export const getPromos = (): PromoBanner[] => {
  const stored = localStorage.getItem(PROMOS_KEY);
  if (!stored) return defaultPromos;
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed as PromoBanner[];
  } catch {
    // ignore invalid storage
  }
  return defaultPromos;
};

export const savePromos = (list: PromoBanner[]) => {
  localStorage.setItem(PROMOS_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(PROMOS_EVENT));
};

export const usePromos = (): [PromoBanner[], (list: PromoBanner[]) => void] => {
  const [promos, setPromos] = useState<PromoBanner[]>(() => getPromos());

  useEffect(() => {
    const refresh = () => setPromos(getPromos());
    window.addEventListener(PROMOS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PROMOS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return [promos, savePromos];
};