import { ipcMain } from 'electron';

import { IPC_CHANNELS } from '@shared/ipc/channels';

export const sendPong = () => {
  ipcMain.handle(IPC_CHANNELS.PING, () => {
    console.log('pong');
  });
};
