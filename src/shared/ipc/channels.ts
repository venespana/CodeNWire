export const IPC_CHANNELS = {
  PING: 'APP_PING',
  DOCTOR_CHECK_DEPENDENCIES: 'doctorCheckDependencies',
} as const;

export type IpcChannels = keyof typeof IPC_CHANNELS;
