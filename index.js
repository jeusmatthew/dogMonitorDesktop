const { app, BrowserWindow } = require('electron')


const createWindow = () => {
    const win = new BrowserWindow({
      width: 900,
      height: 900,
      autoHideMenuBar: true,
      // resizable: false
    })
  
    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        console.log("Close window");
        app.quit()

    }
  })