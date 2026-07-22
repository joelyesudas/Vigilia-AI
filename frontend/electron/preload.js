import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  notify: (title, body) => {
    ipcRenderer.send("show-notification", { title, body });
  },
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("⚡ Electron Preload Loaded");
});