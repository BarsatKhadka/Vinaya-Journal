import { app as t, BrowserWindow as f, ipcMain as _, globalShortcut as d, Menu as m } from "electron";
import { fileURLToPath as P } from "node:url";
import o from "node:path";
import w from "os";
import { spawn as u } from "child_process";
const a = o.dirname(P(import.meta.url));
let n = null, s = null;
const h = [
  {
    label: "Quit",
    accelerator: "Command+Q",
    click: () => {
      t.quit();
    }
  }
];
process.env.APP_ROOT = o.join(a, "..");
const l = process.env.VITE_DEV_SERVER_URL, g = o.join(process.env.APP_ROOT, "dist-electron"), v = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = l ? o.join(process.env.APP_ROOT, "public") : v;
let e;
function b() {
  const r = m.buildFromTemplate(h);
  m.setApplicationMenu(r), e = new f({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(a, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), l ? e.loadURL(l) : e.loadFile(o.join(v, "index.html"));
}
function T() {
  var c, p;
  let r;
  process.env.NODE_ENV === "development" ? r = o.join(a, "..", "Servers", "MyApp", "bin") : r = o.join(process.resourcesPath, "app.asar.unpacked", "Servers", "MyApp", "bin");
  const E = process.platform === "win32" ? "MyApp.exe" : "./MyApp", R = process.platform === "win32" ? "main.exe" : "./main";
  n = u(o.join(r, E), [], {
    cwd: r,
    detached: !0,
    stdio: "pipe"
  }), s = u(o.join(r, R), [], {
    cwd: r,
    detached: !0,
    stdio: "pipe"
  }), (c = n.stdout) == null || c.on("data", (i) => {
    console.log(`Server stdout: ${i}`);
  }), (p = n.stderr) == null || p.on("data", (i) => {
    console.error(`Server stderr: ${i}`);
  }), n.on("error", (i) => {
    console.error("Failed to start server:", i);
  }), n.unref(), s.unref();
}
t.on("window-all-closed", () => {
  process.platform !== "darwin" && (n && n.kill(), s && s.kill(), t.quit(), e = null);
});
t.on("before-quit", () => {
  n && n.kill(), s && s.kill();
});
t.on("activate", () => {
  f.getAllWindows().length === 0 && b();
});
_.handle("get-os", () => w.platform());
t.whenReady().then(() => {
  T(), b(), d.register("CommandOrControl+Shift+I", () => {
    e == null || e.webContents.openDevTools();
  }), d.register("CommandOrControl+R", () => {
    e == null || e.webContents.reload();
  });
});
export {
  g as MAIN_DIST,
  v as RENDERER_DIST,
  l as VITE_DEV_SERVER_URL
};
