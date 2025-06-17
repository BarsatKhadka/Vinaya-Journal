import { app, BrowserWindow , Menu, globalShortcut, ipcMain } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'os'
import { spawn, ChildProcess } from 'child_process'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
let backendProcess: ChildProcess | null = null;
let aiProcess: ChildProcess | null = null;

const menuTemplate = [
  {
    label: 'Quit',
    accelerator: 'Command+Q',
    click: () => {
      app.quit()
    },
  }
]

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

function serverStart(){
  let binPath;
  if (process.env.NODE_ENV === 'development') {
    binPath = path.join(__dirname, '..', 'Servers', 'MyApp', 'bin');
  } else {
    binPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'Servers', 'MyApp', 'bin');
  }
  
  const backendExecutable = process.platform === 'win32' ? 'MyApp.exe' : './MyApp';
  const aiExecutable = process.platform === 'win32' ? 'main.exe' : './main';
  

  backendProcess = spawn(path.join(binPath, backendExecutable), [], {
    cwd: binPath,
    detached: true,
    stdio: 'pipe', 
  });

  aiProcess = spawn(path.join(binPath, aiExecutable), [], {
    cwd: binPath,
    detached: true,
    stdio: 'pipe', 
  });

  // Log process output
  backendProcess.stdout?.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  backendProcess.stderr?.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  backendProcess.on('error', (err) => {
    console.error('Failed to start server:', err);
  });

  backendProcess.unref();
  aiProcess.unref();
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) {
      backendProcess.kill();
    }
    if (aiProcess) {
      aiProcess.kill();
    }
    app.quit()
    win = null
  }
})

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (aiProcess) {
    aiProcess.kill();
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('get-os', () => {
  return os.platform()
})

app.whenReady().then(() => {
  serverStart();
  createWindow()
  
  // For dev tools (console)
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    win?.webContents.openDevTools();
  });

  // Add refresh shortcut
  globalShortcut.register('CommandOrControl+R', () => {
    win?.webContents.reload();
  });
})
