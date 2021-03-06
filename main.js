// Modules to control application life and create native browser window
const { app, BrowserWindow, nativeImage } = require('electron')
const { Notification } = require('electron')

const path = require('path')

function createWindow () {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: false,
    }
  });

  // and load the index.html of the app.
  // mainWindow.loadURL('https://facebook.com/');
  // window.loadFile(__dirname + '/dist_electron/index.html');
  window.loadURL(__dirname + '/dist_electron/index.html');

  // Open the DevTools.
  // window.webContents.openDevTools()

  window.setIcon(__dirname + '/dist_electron/assets/icon64.png');
  // Hide menu bar
  window.setMenu(null);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
