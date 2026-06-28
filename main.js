const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

let mainWindow;
let fileToOpen = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#f3f4f6',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (fileToOpen) sendFileToRenderer(fileToOpen);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

function sendFileToRenderer(filePath) {
  if (!mainWindow || !filePath) return;
  mainWindow.webContents.send('open-file', filePath);
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow && mainWindow.webContents.send('menu-new')
        },
        {
          label: 'Open .swscript / .txt / .fountain',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              title: 'Open screenplay file',
              filters: [
                { name: 'Screenwriter / Fountain / Text', extensions: ['swscript', 'json', 'fountain', 'txt'] },
                { name: 'All Files', extensions: ['*'] }
              ],
              properties: ['openFile']
            });
            if (!result.canceled && result.filePaths[0]) sendFileToRenderer(result.filePaths[0]);
          }
        },
        { type: 'separator' },
        {
          label: 'Save PDF',
          accelerator: 'CmdOrCtrl+P',
          click: () => mainWindow && mainWindow.webContents.send('menu-save-pdf')
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'togglefullscreen' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Screenwriter',
          click: () => dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Screenwriter',
            message: 'Screenwriter',
            detail: 'Clean screenplay editor for Windows.\nFiles save locally in your browser storage unless you export them.'
          })
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  createMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('open-file', (event, filePath) => {
  event.preventDefault();
  fileToOpen = filePath;
  sendFileToRenderer(filePath);
});

app.on('second-instance', (event, commandLine) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
  const possibleFile = commandLine.find(arg => /\.(swscript|json|fountain|txt)$/i.test(arg));
  if (possibleFile) sendFileToRenderer(possibleFile);
});

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
