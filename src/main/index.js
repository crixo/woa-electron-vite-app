import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { dirname, join } from 'path';
// import path from 'node:path';

import { electronApp, optimizer, is } from '@electron-toolkit/utils'
//import icon from '../../resources/icon.png?asset';
//import path from 'path'
import { configureLogging } from './log';
import { setupPazienteDAL } from './paziente-dal/index';
import { dumpConfig, shareSettings, getConfig } from './config';
import log from 'electron-log';
import './electron-updater'
// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
let config
let isDBConfigured = false;
let locateDBWindow;
let mainWindow;
//const iconPath = path.join(__dirname, '../resources/icon.png')
///////////////////////////////////////////////////

// Configuration
config = await getConfig()
//console.log(config)
shareSettings(config)
configureLogging(config)
const dbStatus = setupPazienteDAL(config)
console.log('dbStatus:',dbStatus)


function createMainWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: config.mainWindow.width,
    height: config.mainWindow.height,
    show: false,
    autoHideMenuBar: true,
    //icon: process.cwd() + '/build/woa.icns',
    //...(process.platform === 'linux' ? { icon: iconPath } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),//.mjs is creating during build due to type: module in package.json
      sandbox: false,
      //devTools: true,
    }
  })

  // Retrieve product name dynamically and append the version
  const productName = app.getName();
  const productVersion = app.getVersion();
  // Ensure the title is set after the page loads
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.setTitle(`${productName} v${productVersion}`);
  });
  
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.on('close', (event) => {
    console.log('Main Window is closing');
    // You can prevent the window from closing if needed
    // event.preventDefault();
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])

    // Default open or close DevTools by F12 in development
    //mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))//.mjs is creating during build due to type: module in package.json
  }
}

function createLocateDBWindow() {
  locateDBWindow = new BrowserWindow({
      width: 500,
      height: 350,
      webPreferences: {
          preload: join(__dirname, "../preload/locate-db.mjs"),
          sandbox: false,
      },
  });


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    locateDBWindow.loadURL(process.env['ELECTRON_RENDERER_URL']+'/locate-db.html')
  } else {
    locateDBWindow.loadFile(join(__dirname, '../renderer/locate-db.html'))
  }

  ipcMain.on("db-selected", (event, dbPath) => {
    console.log('on-db-selected -- new dbPath:'+dbPath)
    config.dbPath = dbPath;
    //saveConfig(config);//TODO implement config persistency

    // Re-execute DB setup
    const dbStatus = setupPazienteDAL(config);
    
    if (!dbStatus.success) {
      console.error("Database initialization failed:", dbStatus.error);

      // Send error message to secondary window
      event.reply("db-error", "Database initialization failed. Please select a valid database.");
      return;
    }

    dumpConfig(config);
    isDBConfigured = true; // Set state after successful DB setup
    locateDBWindow.close();
    //locateDBWindow.close();
    createMainWindow();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // installExtension(REACT_DEVELOPER_TOOLS)
  //   //.then((name) => console.log(`Added Extension:  ${name}`))
  //   .then((name) => console.log('Added Extension',name))
  //   .catch((err) => console.log('An error occurred: ', err));  

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })


 
  if (!dbStatus.success) {
      createLocateDBWindow(); // Forces user to select a DB
  } else {
      isDBConfigured = true
      createMainWindow(); // Launch the main window
  }
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (BrowserWindow.getAllWindows().length === 0) {
    console.log(`on-activate - isDBConfigured:${isDBConfigured} -- wins:${BrowserWindow.getAllWindows().length}`)
    if (BrowserWindow.getAllWindows().length === 0) {
        if (isDBConfigured){
          createMainWindow();
        }else{
          createLocateDBWindow();
        }
    }else{
        // BrowserWindow.getAllWindows().forEach(win => {
        //     console.log( win.isDestroyed()? 'distroyed:'+win.id : win.getTitle()+'-'+win.width);
        // });
        BrowserWindow.getAllWindows()[0].show()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('window-all-closed - ' + process.platform )
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

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('error-to-file', (_, error, stackTrace) => {
  log.error('Error From React:', error, stackTrace)
});

