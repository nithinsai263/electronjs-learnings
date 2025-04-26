// preload.js
// All Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    // You could potentially add DOM manipulation here if needed
    // or use contextBridge to expose specific functions to the renderer.
    console.log('Preload script loaded.');
  });
  
  // Example if you needed to expose something (not required for this specific app):
  // const { contextBridge, ipcRenderer } = require('electron');
  // contextBridge.exposeInMainWorld('myAPI', {
  //   doSomething: () => ipcRenderer.send('do-something'),
  // });