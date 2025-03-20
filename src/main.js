const { app, globalShortcut } = require('electron');
const createMainWindow = require('./windows/mainWindow');
const createTray = require('./windows/tray');
const path = require('path');

let mainWindow;
let tray;

app.whenReady().then(() => {
    mainWindow = createMainWindow();
    tray = createTray(mainWindow);
    
    app.dock.setIcon(path.join(__dirname, './assets/lama-2.png'));

    globalShortcut.register('Shift+Command+Space', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
    globalShortcut.register('Esc', () => {
        mainWindow.hide();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});