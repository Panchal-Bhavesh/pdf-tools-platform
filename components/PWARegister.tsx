"use client";
import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        // Unregister any existing service workers to ensure a clean install
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));

        const reg = await navigator.serviceWorker.register("/sw.js");
        console.log("Service worker registered:", reg);
      } catch (err) {
        console.warn("Service worker registration failed:", err);
      }
    };

    // Only attempt registration in production
    if (process.env.NODE_ENV === "production") register();
  }, []);

  return null;
}
