export enum ArduioCLIStatus {
  OK = 200,
  NOT_FOUND = 400,
  ERROR = 500,
}

export interface IArduinoCLI {
  health(): Promise<ArduioCLIStatus>;
}
