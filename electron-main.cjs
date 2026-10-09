
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 900,
    minHeight: 600,
    title: 'DFA Nexus',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    autoHideMenuBar: true,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load the built website
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Show errors in the terminal if the page fails to load
  win.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error('DFA Nexus failed to load:', errorCode, errorDescription);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
