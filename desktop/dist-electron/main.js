import { app as n, BrowserWindow as u, ipcMain as P, dialog as v, globalShortcut as d, Menu as m } from "electron";
import { fileURLToPath as g } from "node:url";
import o from "node:path";
import R from "os";
import { spawn as _ } from "child_process";
const i = o.dirname(g(import.meta.url));
let s;
const b = [
  {
    label: "Quit",
    accelerator: "Command+Q",
    click: () => {
      n.quit();
    }
  }
];
process.env.APP_ROOT = o.join(i, "..");
const a = process.env.VITE_DEV_SERVER_URL, M = o.join(process.env.APP_ROOT, "dist-electron"), f = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = a ? o.join(process.env.APP_ROOT, "public") : f;
let e;
function h() {
  const t = m.buildFromTemplate(b);
  m.setApplicationMenu(t), e = new u({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(i, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), a ? e.loadURL(a) : e.loadFile(o.join(f, "index.html"));
}
function w() {
  var l, c;
  let t;
  process.env.NODE_ENV === "development" ? t = o.join(i, "..", "Servers", "MyApp", "bin") : t = o.join(process.resourcesPath, "app.asar.unpacked", "Servers", "MyApp", "bin");
  const p = process.platform === "win32" ? "MyApp.exe" : "./MyApp";
  v.showMessageBox({
    type: "info",
    title: "Server Path",
    message: "Attempting to start server from:",
    detail: o.join(t, p)
  }), s = _(o.join(t, p), [], {
    cwd: t,
    detached: !0,
    stdio: "pipe"
    // Changed from 'ignore' to 'pipe' to capture output
  }), (l = s.stdout) == null || l.on("data", (r) => {
    console.log(`Server stdout: ${r}`);
  }), (c = s.stderr) == null || c.on("data", (r) => {
    console.error(`Server stderr: ${r}`);
  }), s.on("error", (r) => {
    console.error("Failed to start server:", r);
  }), s.unref();
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  u.getAllWindows().length === 0 && h();
});
P.handle("get-os", () => R.platform());
n.whenReady().then(() => {
  v.showMessageBox({
    type: "info",
    title: "Server Path",
    message: "Attempting to start server from:",
    detail: process.resourcesPath + "/app.asar.unpacked/Servers/MyApp/bin/MyApp.exe"
  }), w(), h(), d.register("CommandOrControl+Shift+I", () => {
    e == null || e.webContents.openDevTools();
  }), d.register("CommandOrControl+R", () => {
    e == null || e.webContents.reload();
  });
});
export {
  M as MAIN_DIST,
  f as RENDERER_DIST,
  a as VITE_DEV_SERVER_URL
};
