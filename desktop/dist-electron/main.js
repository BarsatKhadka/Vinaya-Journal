import { app, BrowserWindow, ipcMain, globalShortcut, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "os";
import { spawn } from "child_process";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let backendProcess = null;
let aiProcess = null;
const menuTemplate = [
  {
    label: "Quit",
    accelerator: "Command+Q",
    click: () => {
      app.quit();
    }
  }
];
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
function serverStart() {
  var _a, _b;
  let binPath;
  if (process.env.NODE_ENV === "development") {
    binPath = path.join(__dirname, "..", "Servers", "MyApp", "bin");
  } else {
    binPath = path.join(process.resourcesPath, "app.asar.unpacked", "Servers", "MyApp", "bin");
  }
  const backendExecutable = process.platform === "win32" ? "MyApp.exe" : "./MyApp";
  const aiExecutable = process.platform === "win32" ? "main.exe" : "./main";
  backendProcess = spawn(path.join(binPath, backendExecutable), [], {
    cwd: binPath,
    detached: true,
    stdio: "pipe"
  });
  aiProcess = spawn(path.join(binPath, aiExecutable), [], {
    cwd: binPath,
    detached: true,
    stdio: "pipe"
  });
  (_a = backendProcess.stdout) == null ? void 0 : _a.on("data", (data) => {
    console.log(`Server stdout: ${data}`);
  });
  (_b = backendProcess.stderr) == null ? void 0 : _b.on("data", (data) => {
    console.error(`Server stderr: ${data}`);
  });
  backendProcess.on("error", (err) => {
    console.error("Failed to start server:", err);
  });
  backendProcess.unref();
  aiProcess.unref();
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (backendProcess) {
      backendProcess.kill();
    }
    if (aiProcess) {
      aiProcess.kill();
    }
    app.quit();
    win = null;
  }
});
app.on("before-quit", () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (aiProcess) {
    aiProcess.kill();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.handle("get-os", () => {
  return os.platform();
});
app.whenReady().then(() => {
  serverStart();
  createWindow();
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win == null ? void 0 : win.webContents.openDevTools();
  });
  globalShortcut.register("CommandOrControl+R", () => {
    win == null ? void 0 : win.webContents.reload();
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
