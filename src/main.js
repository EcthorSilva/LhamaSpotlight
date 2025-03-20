const { app, globalShortcut } = require('electron');
const createMainWindow = require('./windows/mainWindow');
const createTray = require('./windows/tray');
const path = require('path');

let mainWindow;
let tray;

app.whenReady().then(() => {
    mainWindow = createMainWindow();
    tray = createTray(mainWindow);

    app.dock.hide();

    globalShortcut.register('Shift+Command+Space', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
            app.dock.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
            app.dock.show();
        }
    });

    globalShortcut.register('Esc', () => {
        mainWindow.hide();
        app.dock.hide();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});