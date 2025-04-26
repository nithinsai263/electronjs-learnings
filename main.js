// main.js
const { app, BrowserWindow, globalShortcut, screen } = require('electron');
const path = require('path');

let mainWindow; // Keep a reference to the window object

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: false,
    alwaysOnTop: true,
    frame: false, // Set frame to false for transparency to work correctly
    transparent: true, // Enable transparency
    webPreferences: {
       // preload: path.join(__dirname, 'preload.js'), // Optional
       nodeIntegration: false,
       contextIsolation: true
    }
  });

  // Load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Optional: Open DevTools (useful for debugging transparency/CSS)
  // mainWindow.webContents.openDevTools({ mode: 'detach' });

  // Clean up when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Function to move the window (same as before)
function moveWindow(direction) {
    if (!mainWindow) return;
    const moveIncrement = 20;
    const currentPosition = mainWindow.getPosition();
    let [x, y] = currentPosition;
    switch (direction) {
        case 'up': y -= moveIncrement; break;
        case 'down': y += moveIncrement; break;
        case 'left': x -= moveIncrement; break;
        case 'right': x += moveIncrement; break;
    }
    mainWindow.setPosition(x, y, true);
}

// --- App Lifecycle ---
app.whenReady().then(() => {
  createWindow();

  // --- Register Global Shortcuts ---

  // Movement shortcuts (same as before)
  const retUp = globalShortcut.register('CommandOrControl+Up', () => {
    console.log('Ctrl+Up is pressed');
    moveWindow('up');
  });
  if (!retUp) { console.log('Registration failed: Ctrl+Up'); }

  const retDown = globalShortcut.register('CommandOrControl+Down', () => {
    console.log('Ctrl+Down is pressed');
    moveWindow('down');
  });
  if (!retDown) { console.log('Registration failed: Ctrl+Down'); }

  const retLeft = globalShortcut.register('CommandOrControl+Left', () => {
    console.log('Ctrl+Left is pressed');
    moveWindow('left');
  });
  if (!retLeft) { console.log('Registration failed: Ctrl+Left'); }

  const retRight = globalShortcut.register('CommandOrControl+Right', () => {
    console.log('Ctrl+Right is pressed');
    moveWindow('right');
  });
  if (!retRight) { console.log('Registration failed: Ctrl+Right'); }

  // *** NEW: Register Alt+F4 for closing globally ***
  const retQuit = globalShortcut.register('Alt+F4', () => {
    console.log('Alt+F4 is pressed globally, quitting app.');
    app.quit(); // Quit the application
  });
  if (!retQuit) { console.log('Registration failed: Alt+F4'); }
  else { console.log('Global Alt+F4 registered successfully.'); }


  console.log('Movement shortcuts registered:', globalShortcut.isRegistered('CommandOrControl+Up'));

  // Handle activation (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// --- Unregister Shortcuts on Quit ---
// (This existing handler already unregisters ALL shortcuts, including Alt+F4)
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  console.log('All global shortcuts unregistered.');
});