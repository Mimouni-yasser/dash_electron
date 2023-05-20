const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('getRPM', {
  get_RPM: () => ipcRenderer.invoke('getRPM:get_RPM');
})
