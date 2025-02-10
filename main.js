const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1500,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false, // 禁用 Node.js 集成以提高安全性
            sandbox: true, // 启用沙箱模式
            enableRemoteModule: false, // 禁用远程模块以提高安全性
            devTools: true, // 是否启用开发者工具
            additionalArguments: ['--disable-autofill'], // 禁用自动填充
        },
    });
    // 设置自定义 user-agent
    // mainWindow.webContents.setUserAgent('Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36');
    // 加载调试 VUE 服务
    if (process.env.NODE_ENV === 'dev') {
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
        // mainWindow.loadURL('http://localhost:3333');
    } else {
        mainWindow.setMenuBarVisibility(false); // 隐藏菜单栏
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
        // mainWindow.loadURL('https://www.baidu.com');
    }

}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});
