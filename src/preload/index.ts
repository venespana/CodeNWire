import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

import { IPC_CHANNELS, type TElectronAPI } from '@shared/ipc';

// Custom APIs for renderer
const api: TElectronAPI = {
  [IPC_CHANNELS.PING]: () => ipcRenderer.invoke(IPC_CHANNELS.PING),
  [IPC_CHANNELS.DOCTOR_CHECK_DEPENDENCIES]: id => ipcRenderer.invoke(IPC_CHANNELS.DOCTOR_CHECK_DEPENDENCIES, { id }),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
