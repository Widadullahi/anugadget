import { useEffect, useState } from "react";

const SETTINGS_KEY = "anugadget_admin_settings_v1";

export type AdminSettings = {
  storeName: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
};

const defaults: AdminSettings = {
  storeName: "Anu Gadget",
  contactEmail: "Gbadamosia21@gmail.com",
  phoneNumber: "+234 812 770 4308",
  address: "3/9 Olukoleosho Ikeja Mokland Plaza",
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState<AdminSettings>(defaults);

  useEffect(() => {
    const applySettings = () => {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) {
        setSettings(defaults);
        return;
      }
      try {
        const parsed = JSON.parse(stored);
        setSettings({
          storeName: parsed.storeName || defaults.storeName,
          contactEmail: parsed.contactEmail || defaults.contactEmail,
          phoneNumber: parsed.phoneNumber || defaults.phoneNumber,
          address: parsed.address || defaults.address,
        });
      } catch {
        setSettings(defaults);
      }
    };

    applySettings();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === SETTINGS_KEY) {
        applySettings();
      }
    };

    const handleCustom = () => applySettings();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("anugadget-settings-updated", handleCustom as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("anugadget-settings-updated", handleCustom as EventListener);
    };
  }, []);

  return settings;
};
