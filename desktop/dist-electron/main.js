import { app as n, BrowserWindow as i, ipcMain as p, globalShortcut as r, Menu as s } from "electron";
import { fileURLToPath as d } from "node:url";
import o from "node:path";
import R from "os";
const l = o.dirname(d(import.meta.url)), _ = [
  {
    label: "Quit",
    accelerator: "Command+Q",
    click: () => {
      n.quit();
    }
  }
];
process.env.APP_ROOT = o.join(l, "..");
const t = process.env.VITE_DEV_SERVER_URL, P = o.join(process.env.APP_ROOT, "dist-electron"), a = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? o.join(process.env.APP_ROOT, "public") : a;
let e;
function c() {
  const m = s.buildFromTemplate(_);
  s.setApplicationMenu(m), e = new i({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(l, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), t ? e.loadURL(t) : e.loadFile(o.join(a, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  i.getAllWindows().length === 0 && c();
});
p.handle("get-os", () => R.platform());
n.whenReady().then(() => {
  c(), r.register("CommandOrControl+Shift+I", () => {
    e == null || e.webContents.openDevTools();
  }), r.register("CommandOrControl+R", () => {
    e == null || e.webContents.reload();
  });
});
export {
  P as MAIN_DIST,
  a as RENDERER_DIST,
  t as VITE_DEV_SERVER_URL
};
