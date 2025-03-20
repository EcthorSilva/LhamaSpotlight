const { app, globalShortcut } = require('electron');
const createMainWindow = require('./windows/mainWindow');
const createTray = require('./windows/tray');

let mainWindow;
let tray;

app.whenReady().then(() => {
    mainWindow = createMainWindow();
    tray = createTray(mainWindow);

    globalShortcut.register('Shift+Command+Space', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});
