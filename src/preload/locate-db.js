const { contextBridge, ipcRenderer  } = require('electron')

contextBridge.exposeInMainWorld("electron", {
    // Send the selected database path to the main process
    selectDatabase: (dbPath) => ipcRenderer.send("db-selected", dbPath),

    openFileDialog: async () => ipcRenderer.invoke("open-file-dialog"),
    
    // Listen for database setup errors from the main process
    onDatabaseError: (callback) => ipcRenderer.on("db-error", (event, errorMessage) => callback(errorMessage))
});