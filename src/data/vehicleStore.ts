import { useEffect, useState } from "react";
import {
  vehicleBrands,
  vehicleCategories,
  vehicleDrives,
  vehicleFuels,
  vehicleTransmissions,
  vehicleYears,
  vehicles as seed,
} from "./vehicles";
import type { Vehicle } from "./vehicles";

const STORAGE_KEY = "anugadget_admin_vehicles_v1";
const UPDATE_EVENT = "anugadget-vehicles-updated";

export const getVehicles = (): Vehicle[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as Vehicle[];
      }
    }
  } catch {
    // ignore invalid storage
  }
  return seed;
};

export const saveVehicles = (list: Vehicle[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const clearStoredVehicles = () => {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const useVehicles = (): [Vehicle[], (list: Vehicle[]) => void] => {
  const [list, setList] = useState<Vehicle[]>(() => getVehicles());

  useEffect(() => {
    const refresh = () => setList(getVehicles());
    window.addEventListener(UPDATE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(UPDATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return [list, saveVehicles];
};

export interface VehicleOptions {
  brands: string[];
  categories: string[];
  fuels: string[];
  transmissions: string[];
  drives: string[];
  years: number[];
}

export const getVehicleOptions = (cars: Vehicle[]): VehicleOptions => ({
  brands: Array.from(new Set(cars.map((x) => x.brand))).sort(),
  categories: ["All", ...Array.from(new Set(cars.map((x) => x.category)))],
  fuels: Array.from(new Set(cars.map((x) => x.fuel))).sort(),
  transmissions: Array.from(new Set(cars.map((x) => x.transmission))).sort(),
  drives: Array.from(new Set(cars.map((x) => x.drive))).sort(),
  years: Array.from(new Set(cars.map((x) => x.year))).sort((a, b) => b - a),
});

export { seed as seedVehicles, UPDATE_EVENT as VEHICLES_UPDATE_EVENT };

export { vehicleBrands, vehicleCategories, vehicleDrives, vehicleFuels, vehicleTransmissions, vehicleYears };