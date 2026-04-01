"use client";
import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        // eslint-disable-next-line no-console
        console.log("Service worker registered:", reg);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Service worker registration failed:", err);
      }
    };

    // Only attempt registration in production
    if (process.env.NODE_ENV === "production") register();
  }, []);

  return null;
}
