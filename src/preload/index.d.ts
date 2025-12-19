import { type ElectronAPI } from '@electron-toolkit/preload';

import { type TElectronAPI } from '@shared/ipc';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: TElectronAPI;
  }
}
