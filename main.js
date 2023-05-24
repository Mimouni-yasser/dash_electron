const { app, BrowserWindow } = require('electron')
const {ipcMain} = require('electron');
const http = require('http');

hostname = '127.0.0.1';
port = '3000';

let win;
let ip;
function createWindow() {
 win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
 ipcMain.on('load-sensors', (event, arg) => {
    win.loadURL(arg);
});

 ipcMain.on('load-main', (event, arg) => {
    win.loadURL(arg);
});

ipcMain.on('IP_config', (event, arg) => {
  ip = arg;
  win.loadFile('main.html');
});

ipcMain.on('get_IP', (event) => {
  console.log(ip);
  event.sender.send('IP', ip);
});
win.loadFile('config.html');
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






