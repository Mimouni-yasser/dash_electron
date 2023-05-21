const { app, BrowserWindow } = require('electron')
const {ipcMain} = require('electron');
const http = require('http');

hostname = '127.0.0.1';
port = '3000';

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
 ipcMain.on('load-sensors', (event, arg) => {
    win.loadURL(arg);
});

 ipcMain.on('load-main', (event, arg) => {
    win.loadURL(arg);
});

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  openServer();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

function openServer()
{
  const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  });

  server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

}


