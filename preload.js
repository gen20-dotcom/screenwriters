const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('desktopApp', {
  onOpenFile(callback) {
    ipcRenderer.on('open-file', (_event, filePath) => {
      try {
        const text = fs.readFileSync(filePath, 'utf8');
        callback({ filePath, text });
      } catch (error) {
        callback({ filePath, error: error.message });
      }
    });
  },
  onMenuNew(callback) {
    ipcRenderer.on('menu-new', callback);
  },
  onMenuSavePdf(callback) {
    ipcRenderer.on('menu-save-pdf', callback);
  }
});
