const { BrowserWindow } = require('electron');
const path = require('path');

function createMainWindow() {
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 80,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, '../preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    mainWindow.hide();

    return mainWindow;
}

module.exports = createMainWindow;
