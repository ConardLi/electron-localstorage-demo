const { app, BrowserWindow } = require('electron')
const storage = require('electron-localStorage');
// const storage = require('./localStorage');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  const indexPage = storage.getItem('indexPage');
  const isDev = storage.getItem('isDev');

  if (indexPage) {
    console.log(`读取到主页：${indexPage}`);
    mainWindow.loadFile(indexPage)
  } else {
    mainWindow.loadFile('index.html')
  }

  if (isDev === '1') {
    console.log(`开启调试窗口`);
    mainWindow.toggleDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})