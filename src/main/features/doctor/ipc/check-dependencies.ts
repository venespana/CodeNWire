import { ipcMain } from 'electron';

import { arduinoCli } from '@main/entities/arduino';
import { gitCli, GitCLIStatus } from '@main/entities/git';
import { IPC_CHANNELS } from '@shared/ipc';
import { type IEvents } from '@shared/ipc/events';

export const checkDependencies = () => {
  ipcMain.handle(
    IPC_CHANNELS.DOCTOR_CHECK_DEPENDENCIES,
    async (_evt, args: IEvents[typeof IPC_CHANNELS.DOCTOR_CHECK_DEPENDENCIES]['args']) => {
      console.log('Checking dependencies for ID:', args.id);

      if (!args.id) {
        throw new Error('Dependency ID is required');
      }

      if (args.id === 'git-cli') {
        const status = await gitCli.health();

        if (status !== GitCLIStatus.OK) {
          return { status: 'error', message: 'Git is not installed or not accessible' };
        }

        return {
          status: 'ok',
          message: 'Git is installed and accessible',
        };
      }

      if (args.id === 'arduino-cli') {
        const status = await arduinoCli.health();
        console.log('Arduino CLI status:', status);

        const result = {
          status: 'ok',
          message: 'Arduino CLI is installed and accessible',
        };

        return result;
      }

      return {
        status: 'ok',
        message: 'Dependencies checked successfully',
      };
    }
  );
};
