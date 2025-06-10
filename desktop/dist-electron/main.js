import { app, BrowserWindow, ipcMain, globalShortcut, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "os";
import { spawn } from "child_process";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
let myAppProcess = null;
let mainProcess = null;
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
function spawnChildProcesses() {
  const binPath = path.join(process.env.APP_ROOT, "resources", "MyApp", "bin");
  myAppProcess = spawn(path.join(binPath, "MyApp"), [], {
    stdio: "pipe"
  });
  myAppProcess.stdout.on("data", (data) => {
    console.log(`MyApp stdout: ${data}`);
  });
  myAppProcess.stderr.on("data", (data) => {
    console.error(`MyApp stderr: ${data}`);
  });
  mainProcess = spawn(path.join(binPath, "main"), [], {
    stdio: "pipe"
  });
  mainProcess.stdout.on("data", (data) => {
    console.log(`Main process stdout: ${data}`);
  });
  mainProcess.stderr.on("data", (data) => {
    console.error(`Main process stderr: ${data}`);
  });
}
function cleanupChildProcesses() {
  if (myAppProcess) {
    myAppProcess.kill();
  }
  if (mainProcess) {
    mainProcess.kill();
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
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
  createWindow();
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win == null ? void 0 : win.webContents.openDevTools();
  });
  globalShortcut.register("CommandOrControl+R", () => {
    win == null ? void 0 : win.webContents.reload();
  });
  setTimeout(() => {
    spawnChildProcesses();
  }, 10);
});
app.on("before-quit", () => {
  cleanupChildProcesses();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
