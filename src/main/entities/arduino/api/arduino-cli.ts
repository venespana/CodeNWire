import { ArduioCLIStatus, type IArduinoCLI } from '../model/arduino-cli';

class ArduinoCLI implements IArduinoCLI {
  async health(): Promise<ArduioCLIStatus> {
    // TODO: Implement actual Arduino CLI health check
    return ArduioCLIStatus.OK;
  }
}

export default new ArduinoCLI();
