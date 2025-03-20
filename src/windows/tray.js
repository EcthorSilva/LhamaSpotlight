const { Tray, Menu, nativeImage, app } = require('electron');
const path = require('path');
const { dialog } = require('electron');

function createTray(mainWindow) {
    const trayIcon = nativeImage.createFromPath(path.join(__dirname, '../assets/lama.png')).resize({ width: 20, height: 20 });
    let tray = new Tray(trayIcon);

    const trayMenu = Menu.buildFromTemplate([
        {
            label: 'Abrir Spotlight',
            accelerator: 'Shift+Command+Space', // Adicionar atalho
            click: () => {
                if (mainWindow.isVisible()) {
                    mainWindow.hide();
                } else {
                    mainWindow.show();
                    mainWindow.focus();
                }
            }
        },
        { 
            label: 'Configurações', 
            click: () => dialog.showMessageBox({
                type: 'info',
                buttons: ['OK'],
                title: 'Configurações',
                message: 'A opção de configurações ainda não está disponível.'
            })
        },
        { label: 'Sair', click: () => app.quit() }
    ]);

    tray.setContextMenu(trayMenu);

    return tray;
}

module.exports = createTray;
