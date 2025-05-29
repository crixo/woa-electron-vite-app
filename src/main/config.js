//import path from 'node:path';
//import { path } from 'path';
//import { dirname, join } from 'path';
import path from 'node:path';
import fs from 'fs';
import yaml from 'js-yaml';
import { ipcMain } from 'electron';

export function shareSettings(config){
  ipcMain.handle('settings', async () => {
    return config
  })
}

let configPath

export function loadConfig(homeDir) {
    const defaultConfig = {
    dbPath: path.join(homeDir, "/woa/", "./woaX.db"),
    logPath: path.join(homeDir, "/woa/", "./woa.log"),
    formatDate: 'yyyy-MM-dd'
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