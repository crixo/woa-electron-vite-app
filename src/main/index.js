import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { dirname, join } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset';
import log from 'electron-log';
import Database from "better-sqlite3";
import os from 'os';
import { setupPazienteDAL, shareSettings } from './pazienteDAL';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const homeDir = os.homedir();

// Configure electron-log https://www.npmjs.com/package/electron-log
//~/Library/Logs/{app name}/main.log
// log.transports.file.resolvePathFn = () => {
//     const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
//     return path.join(app.getAppPath(), 'logs', `${today}.log`);
//     //return path.join("~", 'logs', `${today}.log`);
// };
log.transports.file.maxSize = 1024 * 1024; // Limit file size if needed (1MB)
log.transports.console.level = 'info'; // Set log level for console
log.transports.file.level = 'info'; // Logs only warnings, errors, and higher severity messages
log.transports.console.level = 'info'; // Console logs at 'info' level and above

//console.log = log.log;

// Sample usage
log.info('Application started');

//This will print the absolute path to the application's root directory where your package.json file is located. 
//If you're looking for the directory where the app is running from (which may differ in a packaged app), you can use process.cwd() as well.
console.log(`__dirname:${__dirname}`);
console.log(`app.getAppPath():${app.getAppPath()}`);
console.log(`process.cwd(():${process.cwd()}`);
console.log("App Path:", path.join(__dirname, "../dist/index.html"));
console.log("Resolved Path:", path.resolve(__dirname, "../dist/index.html"));
console.log("Electron Load URL:", `file://${path.join(__dirname, "../dist/index.html")}`);

const defaultConfig = {
  dbPath: path.join(homeDir, "/woa/", "./woa.db"),
  logPath: path.join(homeDir, "/woa/", "./woa.log"),
  formatDate: 'yyyy-MM-dd'
};

function loadConfig() {
  try {
    const configPath = path.join(homeDir, "/woa/", "./config.yaml")

    if (!fs.existsSync(configPath)) {
      console.warn("Config file not found, using default configuration.")
      return defaultConfig;
    }

    const fileContents = fs.readFileSync(configPath, "utf8");
    const config = yaml.load(fileContents) || {}

    return { ...defaultConfig, ...config }; // Merge defaults with existing config
  } catch (e) {
    console.error("Error loading config:", e)
    return defaultConfig;
  }
}

const config = loadConfig()

log.transports.file.resolvePathFn = () => {
    return config.logPath;
};

// Initialize the database
function initDatabase() {
  const dbPath = config.dbPath;
  log.info('dbPAth:'+dbPath)
  let db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  // const query = `SELECT count(*) AS count FROM paziente`
  // const stmt = db.prepare(query)
  // console.log("count paziente:" + stmt.get());
  return db;
}
const db = initDatabase();
setupPazienteDAL(db);

shareSettings(config);


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])

    // Default open or close DevTools by F12 in development
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

process.on('uncaughtException', (error) => {
    log.error('Uncaught Exception:', error);
    // Log the error or display an alert
});

process.on('unhandledRejection', (reason, promise) => {
    log.error('Unhandled Promise Rejection:', reason);
});
