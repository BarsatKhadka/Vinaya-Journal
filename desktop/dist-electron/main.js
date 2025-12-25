import { app as t, BrowserWindow as u, ipcMain as R, globalShortcut as p, Menu as d } from "electron";
import { fileURLToPath as _ } from "node:url";
import o from "node:path";
import w from "os";
import { spawn as m } from "child_process";
const f = o.dirname(_(import.meta.url));
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
process.env.APP_ROOT = o.join(f, "..");
const l = process.env.VITE_DEV_SERVER_URL, S = o.join(process.env.APP_ROOT, "dist-electron"), v = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = l ? o.join(process.env.APP_ROOT, "public") : v;
let e;
function b() {
  const r = d.buildFromTemplate(h);
  d.setApplicationMenu(r), e = new u({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(f, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), l ? e.loadURL(l) : e.loadFile(o.join(v, "index.html"));
}
function T() {
  var a, c;
  if (process.env.NODE_ENV === "development") {
    console.log("In development mode, skipping automatic server start. Please ensure backend servers are running manually.");
    return;
  }
  let r;
  r = o.join(process.resourcesPath, "app.asar.unpacked", "Servers", "MyApp", "bin");
  const E = process.platform === "win32" ? "MyApp.exe" : "./MyApp", P = process.platform === "win32" ? "main.exe" : "./main";
  n = m(o.join(r, E), [], {
    cwd: r,
    detached: !0,
    stdio: "pipe"
  }), s = m(o.join(r, P), [], {
    cwd: r,
    detached: !0,
    stdio: "pipe"
  }), (a = n.stdout) == null || a.on("data", (i) => {
    console.log(`Server stdout: ${i}`);
  }), (c = n.stderr) == null || c.on("data", (i) => {
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
  u.getAllWindows().length === 0 && b();
});
R.handle("get-os", () => w.platform());
t.whenReady().then(() => {
  T(), b(), p.register("CommandOrControl+Shift+I", () => {
    e == null || e.webContents.openDevTools();
  }), p.register("CommandOrControl+R", () => {
    e == null || e.webContents.reload();
  });
});
export {
  S as MAIN_DIST,
  v as RENDERER_DIST,
  l as VITE_DEV_SERVER_URL
};
