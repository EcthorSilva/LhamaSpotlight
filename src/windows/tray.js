const { Tray, Menu, nativeImage, app } = require('electron');
const path = require('path');

function createTray(mainWindow) {
    const trayIcon = nativeImage.createFromPath(path.join(__dirname, '../assets/llama.png')).resize({ width: 20, height: 20 });
    let tray = new Tray(trayIcon);

    const trayMenu = Menu.buildFromTemplate([
        {
            label: 'Abrir Spotlight',
            click: () => {
                if (mainWindow.isVisible()) {
                    mainWindow.hide();
                } else {
                    mainWindow.show();
                    mainWindow.focus();
                }
            }
        },
        { label: 'Configurações', click: () => console.log('Abrir configurações') },
        { label: 'Sair', click: () => app.quit() }
    ]);

    tray.setContextMenu(trayMenu);

    return tray;
}

module.exports = createTray;
