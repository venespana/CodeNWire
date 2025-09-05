import {
  avrInstruction,
  AVRIOPort,
  AVRTimer,
  type AVRTimerConfig,
  CPU,
  PinState,
  portBConfig,
  portCConfig,
  portDConfig,
  timer0Config,
  timer1Config,
  timer2Config,
} from 'avr8js';

export type ArduinoBoardType = 'arduino:avr:uno' | 'arduino:avr:nano' | 'arduino:avr:mega2560';

export interface PinMapping {
  ledBuildIn: number;
  portB: (number | string)[];
  portC: (number | string)[];
  portD: (number | string)[];
  portE?: (number | string)[];
  portF?: (number | string)[];
  portG?: (number | string)[];
  portH?: (number | string)[];
  portJ?: (number | string)[];
  portK?: (number | string)[];
  portL?: (number | string)[];
}

export type PortsMapping = Omit<PinMapping, 'ledBuildIn'>;

export interface ArduinoBoardConfig {
  id: ArduinoBoardType;
  name: string;
  pinMapping: PinMapping;
  timers: AVRTimerConfig[];
}

export interface ArduinoCPUInstance {
  isRunning: boolean;
  board: ArduinoBoardType;
  cpu: CPU;
  ports: {
    portB: AVRIOPort;
    portC: AVRIOPort;
    portD: AVRIOPort;
    portE?: AVRIOPort;
    portF?: AVRIOPort;
    portG?: AVRIOPort;
    portH?: AVRIOPort;
    portJ?: AVRIOPort;
    portK?: AVRIOPort;
    portL?: AVRIOPort;
  };
  timers: AVRTimer[];
}

export type PortListener = (data: {
  pin: number | string;
  state: PinState;
  pinIndex: number;
  isLedBuiltIn: boolean;
}) => void;

const ARDUINO_BOARDS: Record<ArduinoBoardType, ArduinoBoardConfig> = {
  'arduino:avr:uno': {
    id: 'arduino:avr:uno',
    name: 'Arduino Uno',
    pinMapping: {
      ledBuildIn: 13,
      portB: [8, 9, 10, 11, 12, 13],
      portC: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'],
      portD: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    timers: [timer0Config],
  },
  'arduino:avr:nano': {
    id: 'arduino:avr:nano',
    name: 'Arduino Nano',
    pinMapping: {
      ledBuildIn: 13,
      portB: [8, 9, 10, 11, 12, 13],
      portC: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'],
      portD: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    timers: [timer0Config],
  },
  'arduino:avr:mega2560': {
    id: 'arduino:avr:mega2560',
    name: 'Arduino Mega 2560',
    pinMapping: {
      ledBuildIn: 13,
      portB: [53, 52, 51, 50, 10, 11, 12, 13],
      portC: [37, 36, 35, 34, 33, 32, 31, 30],
      portD: [21, 20, 19, 18, 38, 39, 40, 41],
      portE: [0, 1, 5, 3, 2, 6, 7, 8],
      portF: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
      portG: [4, 42, 43, 44, 45, 46, 47, 48],
      portH: [17, 16, 'H2', 'H3', 'H4', 'H5', 9, 'H7'],
      portJ: [15, 14, 'J2', 'J3', 'J4', 'J5', 'J6', 'J7'],
      portK: ['A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15'],
      portL: [49, 48, 47, 46, 45, 44, 43, 42],
    },
    timers: [timer0Config, timer1Config, timer2Config],
  },
};

const getBoardConfig = (boardType: ArduinoBoardType): ArduinoBoardConfig => {
  return ARDUINO_BOARDS[boardType];
};

export const createCPUInstance = (program: Uint16Array, boardType: ArduinoBoardType): ArduinoCPUInstance => {
  const config = getBoardConfig(boardType);
  const cpu = new CPU(program);

  const ports: ArduinoCPUInstance['ports'] = {
    portB: new AVRIOPort(cpu, portBConfig),
    portC: new AVRIOPort(cpu, portCConfig),
    portD: new AVRIOPort(cpu, portDConfig),
  };

  if (boardType === 'arduino:avr:mega2560') {
    ports.portE = new AVRIOPort(cpu, portBConfig);
    ports.portF = new AVRIOPort(cpu, portCConfig);
    ports.portG = new AVRIOPort(cpu, portDConfig);
    ports.portH = new AVRIOPort(cpu, portBConfig);
    ports.portJ = new AVRIOPort(cpu, portCConfig);
    ports.portK = new AVRIOPort(cpu, portDConfig);
    ports.portL = new AVRIOPort(cpu, portBConfig);
  }

  const timers: AVRTimer[] = [];
  config.timers.forEach(timer => timers.push(new AVRTimer(cpu, timer)));

  return {
    isRunning: false,
    board: boardType,
    cpu,
    ports,
    timers,
  };
};

export const getPinMapping = (boardType: ArduinoBoardType): PinMapping => {
  return getBoardConfig(boardType).pinMapping;
};

export const closeArduinoProgram = (args: { instance: ArduinoCPUInstance; listener: PortListener }) => {
  const { instance, listener } = args;

  if (!instance || !instance.cpu) return null;

  instance.isRunning = false;

  const { ledBuildIn, ...ports } = getPinMapping(instance.board);
  Object.keys(ports).forEach(portName => {
    const pins = ports[portName as keyof PortsMapping]!;
    pins.forEach((pin, pinIndex) => listener({ pin, state: PinState.Low, pinIndex, isLedBuiltIn: ledBuildIn === pin }));
  });
  instance.cpu.reset();

  return null;
};

export const portListeners = (instance: ArduinoCPUInstance, listener: PortListener) => {
  Object.entries(instance.ports).forEach(([portName, port]) => {
    const { ledBuildIn, ...ports } = getPinMapping(instance.board);
    const pins = ports[portName as keyof PortsMapping]!;

    port.addListener(() => {
      pins.forEach((pin, pinIndex) =>
        listener({ pin, state: port.pinState(pinIndex), pinIndex, isLedBuiltIn: ledBuildIn === pin })
      );
    });
  });
};

export const runArduinoProgram = async (instance: ArduinoCPUInstance) => {
  instance.isRunning = true;

  while (instance.isRunning) {
    for (let i = 0; i < 500000; i++) {
      avrInstruction(instance.cpu);
      instance.cpu.tick();
    }

    await new Promise(resolve => setTimeout(resolve));
  }
};
