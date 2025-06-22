import { app, dialog, ipcMain } from 'electron'
//import path from 'node:path';
import fs from 'fs';
import yaml from 'js-yaml';
import log from 'electron-log';
import os from 'os';
import path from 'path';
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)

export function shareSettings(config){
  ipcMain.handle('settings', async () => {
    return config
  })
}

const __dirname = path.dirname(__filename);
const homeDir = os.homedir();
// console.log('__dirname:'+__dirname)


let configPath
let finalConfig
let configPromise = null

const defaultConfig = {
  dbPath: path.join(homeDir, "/woa/", "./woa.db"),
  logPath: path.join(homeDir, "/woa/", "./woa.log"),
  formatDate: 'dd/MM/yyyy',
  mainWindow:{
    width:900,
    height:670
  },
  validations:{
    paziente: {
      nome: 'mandatory',
      cognome: 'mandatory',
      data_nascita: 'mandatory',
    },
    'anamnesi-remota': {
      data: 'mandatory',
      tipo: 'mandatory',
    },
    consulto: {
      data: 'mandatory',
      problema_iniziale: 'mandatory',
    },
    'anamnesi-prossima': null,
    esame: {
      data: 'mandatory',
      tipo: 'mandatory',
    },
    trattamento:{
      data: 'mandatory',
    },
    valutazione: null
  }
}

export function getConfig() {
  if (!configPromise) {
    configPromise = Promise.resolve(loadConfig(homeDir, __dirname)); // Ensuring single call & promise wrapping
  }
  return configPromise;
}

function loadConfig(homeDir, __dirname) {
  //This will print the absolute path to the application's root directory where your package.json file is located. 
  //If you're looking for the directory where the app is running from (which may differ in a packaged app), you can use process.cwd() as well.console.log.silly(`__dirname:${__dirname}`);console.log(`app.getAppPath():${app.getAppPath()}`);
  log.silly(`process.cwd(():${process.cwd()}`);
  log.silly(`__filename:${__filename}`);
  log.silly(`__dirname():${__dirname}`);
  log.silly("App Path:", path.join(__dirname, "../dist/index.html"));
  log.silly("Resolved Path:", path.resolve(__dirname, "../dist/index.html"));
  log.silly("Electron Load URL:", `file://${path.join(__dirname, "../dist/index.html")}`);
  log.silly("app.getAppPath():", app.getAppPath())

  try {
    configPath = path.join(homeDir, "/woa/", "./config.yaml")
    if (!fs.existsSync(configPath)) {
      console.warn("Config file not found, using default configuration.")
      return defaultConfig;
    }
    const fileContents = fs.readFileSync(configPath, "utf8");
    const config = yaml.load(fileContents) || {}
    finalConfig = { ...defaultConfig, ...config }; // Merge defaults with existing config
    return finalConfig
  } catch (e) {
    console.error("Error loading config:", e)
    return defaultConfig;
  }
}

export function dumpConfig(config) {
  const yamlStr = yaml.dump(config, {lineWidth: -1});
  // Save to a file
  fs.writeFileSync(configPath, yamlStr, 'utf8');
}

ipcMain.handle("open-file-dialog", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "SQLite Database", extensions: ["db"] }]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0]; // Return full file path
  }
});

