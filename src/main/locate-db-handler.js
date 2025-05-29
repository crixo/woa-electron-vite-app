const { ipcMain, dialog } = require("electron");

ipcMain.handle("open-file-dialog", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "SQLite Database", extensions: ["db"] }]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0]; // Return full file path
    }
});