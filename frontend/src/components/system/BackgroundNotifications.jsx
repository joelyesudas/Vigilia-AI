import { useEffect } from "react";
import socket from "../../services/socket";

export default function BackgroundNotifications() {

  useEffect(() => {

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    socket.on("scanCompleted", (scan) => {

      console.log("📡 Scan Event Received:", scan);

      if (!("Notification" in window)) return;
      if (Notification.permission !== "granted") return;

      const body =
        scan.threats === 0
          ? "Background scan completed.\nSystem Secure."
          : `${scan.threats} Threat(s) Detected\nRisk Level: ${scan.riskLevel}`;

      new Notification("🛡 Vigilia AI", {
        body,
      });

    });

    return () => {
      socket.off("scanCompleted");
    };

  }, []);

  return null;
}