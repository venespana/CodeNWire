import { useCallback, useEffect, useRef } from 'react';

import {
  type ArduinoCPUInstance,
  type ArduinoBoardType,
  createCPUInstance,
  portListeners,
  runArduinoProgram,
  type PortListener,
  closeArduinoProgram,
} from '@/infrastructure/services/arduinoBoard.service';
import { compileProgram } from '@/infrastructure/services/builder.service';
import programStore from '@/infrastructure/store/program.store';

const useRunAvr8Program = (args: { program: string; board: ArduinoBoardType; portListener: PortListener }) => {
  const { program: programSource, board, portListener } = args;

  const isRunning = programStore.use.isRunning();

  const cpuRef = useRef<ArduinoCPUInstance | null>(null);

  const runProgram = useCallback(async () => {
    const program = await compileProgram({
      program: programSource,
      board,
    });
    const programData = new Uint16Array(program.data.buffer);

    cpuRef.current = createCPUInstance(programData, board);

    portListeners(cpuRef.current, portListener);

    runArduinoProgram(cpuRef.current);
  }, [board, portListener, programSource]);

  useEffect(() => {
    if (!isRunning) {
      if (!cpuRef.current) return;

      cpuRef.current = closeArduinoProgram({
        instance: cpuRef.current!,
        listener: portListener,
      });
      return;
    }

    runProgram();
  }, [isRunning]);
};

export default useRunAvr8Program;
