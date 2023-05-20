const { app, BrowserWindow } = require('electron')
const {ipcMain} = require('electron')

let win;

function createWindow() {
 win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
 ipcMain.on('load-page', (event, arg) => {
    win.loadURL(arg);
});

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});


