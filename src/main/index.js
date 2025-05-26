import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { dirname, join } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset';
import { configureLogging } from './log';
import os from 'os';
import { setupPazienteDAL } from './pazienteDAL';
import { loadConfig, shareSettings } from './config';
import log from 'electron-log';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const homeDir = os.homedir();
//This will print the absolute path to the application's root directory where your package.json file is located. 
//If you're looking for the directory where the app is running from (which may differ in a packaged app), you can use process.cwd() as well.console.log.silly(`__dirname:${__dirname}`);console.log(`app.getAppPath():${app.getAppPath()}`);
log.silly(`process.cwd(():${process.cwd()}`);
log.silly("App Path:", path.join(__dirname, "../dist/index.html"));
log.silly("Resolved Path:", path.resolve(__dirname, "../dist/index.html"));
log.silly("Electron Load URL:", `file://${path.join(__dirname, "../dist/index.html")}`);

// Configuration
const config = loadConfig(homeDir)
shareSettings(config)

// Logging
configureLogging(config)

// Database
setupPazienteDAL(config);


///////////////////////////////////////////////////
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
