const { app, BrowserWindow } = require("electron");

// Start up backend nodejs server
let server = require('../server/app');

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1000, height: 800 });

  // and load the index.html of the app.
  //   win.loadFile("index.html");
  win.loadURL("http://localhost:3000/");
}
app.on("ready", createWindow);

