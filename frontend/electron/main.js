import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  Notification,
} from "electron";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let tray;
let isQuiting = false;

// =============================
// ICON PATH
// =============================
const iconPath = path.join(
  __dirname,
  "..",
  "..",
  "assests",
  "logo.ico"
);

console.log("📂 __dirname:", __dirname);
console.log("🖼 Icon Path:", iconPath);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1000,
    minWidth: 1500,
    minHeight: 900,

    icon: iconPath,

    autoHideMenuBar: true,
    show: false,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:5173");

  mainWindow.maximize();

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Hide instead of closing
  mainWindow.on("close", (event) => {
    if (!isQuiting) {
      event.preventDefault();

      mainWindow.hide();

      new Notification({
        title: "🛡 Vigilia AI",
        body:
          "Vigilia AI is still running in the background.\nAutomatic protection remains active.",
        icon: iconPath,
      }).show();
    }
  });
}

function createTray() {
  const trayIcon = nativeImage.createFromPath(iconPath);

  console.log("✅ Icon Exists:", !trayIcon.isEmpty());

  tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "🛡 Open Vigilia AI",
      click() {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      },
    },
    {
      label: "🔄 Run Scan Now",
      click() {
        fetch("http://localhost:5000/api/scans/manual", {
          method: "POST",
        }).catch(console.error);
      },
    },
    {
      type: "separator",
    },
    {
      label: "❌ Quit",
      click() {
        isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Vigilia AI");
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", () => {
  isQuiting = true;
});

app.on("window-all-closed", (event) => {
  event.preventDefault();
});