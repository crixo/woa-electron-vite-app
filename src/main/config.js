
const { ipcMain, dialog } = require("electron");
import path from 'node:path';
import fs from 'fs';
import yaml from 'js-yaml';
import log from 'electron-log';

export function shareSettings(config){
  ipcMain.handle('settings', async () => {
    return config
  })
}

let configPath

export function loadConfig(homeDir, __dirname) {
    //This will print the absolute path to the application's root directory where your package.json file is located. 
    //If you're looking for the directory where the app is running from (which may differ in a packaged app), you can use process.cwd() as well.console.log.silly(`__dirname:${__dirname}`);console.log(`app.getAppPath():${app.getAppPath()}`);
    log.silly(`process.cwd(():${process.cwd()}`);
    log.silly("App Path:", path.join(__dirname, "../dist/index.html"));
    log.silly("Resolved Path:", path.resolve(__dirname, "../dist/index.html"));
    log.silly("Electron Load URL:", `file://${path.join(__dirname, "../dist/index.html")}`);

    const defaultConfig = {
      dbPath: path.join(homeDir, "/woa/", "./woa.db"),
      logPath: path.join(homeDir, "/woa/", "./woa.log"),
      formatDate: 'dd/MM/yyyy',
      mainWindow:{
        width:900,
        height:670
      }
    };

    try {
 
        configPath = path.join(homeDir, "/woa/", "./config.yaml")

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

export function dumpConfig(config) {
  const yamlStr = yaml.dump(config);

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