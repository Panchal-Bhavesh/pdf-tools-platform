"use client";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onBeforeInstallPrompt(e: any) {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    }

    window.addEventListener(
      "beforeinstallprompt",
      onBeforeInstallPrompt as EventListener,
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        onBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setVisible(false);
    setDeferredPrompt(null);
    // optional: log the outcome
    console.log("PWA install choice:", choice);
  };

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", right: 16, bottom: 24, zIndex: 9999 }}>
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
