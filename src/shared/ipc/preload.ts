import { type IPC_CHANNELS } from './channels';
import type { IEvents } from './events';

type TOptionalArgs<T> = T extends void ? [] : [args: T];

type TChannels = typeof IPC_CHANNELS;

export type TElectronAPI = {
  [K in keyof TChannels as TChannels[K]]: (
    ...args: TOptionalArgs<IEvents[TChannels[K]]['args']>
  ) => IEvents[TChannels[K]]['response'];
};
