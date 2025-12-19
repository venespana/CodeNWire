import { type IPC_CHANNELS } from './channels';

export interface IEvents {
  [IPC_CHANNELS.PING]: {
    args: void;
    response: void;
  };
  [IPC_CHANNELS.DOCTOR_CHECK_DEPENDENCIES]: {
    args: { id: string };
    response?: Promise<{ status: 'ok' | 'error'; message: string }>;
  };
}
