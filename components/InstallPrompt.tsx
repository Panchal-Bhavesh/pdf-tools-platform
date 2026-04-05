"use client";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setVisible(false);
    setDeferredPrompt(null);
    console.log("PWA install choice:", choice.outcome);
  };

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", left: 16, bottom: 24, zIndex: 999 }}>
      <button
        onClick={handleInstallClick}
        style={{
          background: "#1e3a8a",
          color: "white",
          padding: "10px 14px",
          borderRadius: 12,
          border: "none",
          fontWeight: 600,
        }}
      >
        Install PagelyPDF
      </button>
    </div>
  );
}
