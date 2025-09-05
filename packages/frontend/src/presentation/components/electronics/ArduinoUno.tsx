import { useState, useCallback } from 'react';

import { PinState } from 'avr8js';

import useRunAvr8Program from '@/application/usecases/useRunAvrProgram';
import { type PortListener } from '@/infrastructure/services/arduinoBoard.service';
import programStore from '@/infrastructure/store/program.store';

const ArduinoUno: React.FC = () => {
  const [builtinLedOn, setBuiltinLedOn] = useState(false);
  const isRunning = programStore.use.isRunning();

  const handlePortsListener = useCallback<PortListener>(data => {
    if (data.isLedBuiltIn) setBuiltinLedOn(data.state === PinState.High);
  }, []);

  useRunAvr8Program({
    program: programStore.getState().sourceCode,
    board: 'arduino:avr:uno',
    portListener: handlePortsListener,
  });

  return <wokwi-arduino-uno ledPower={isRunning || undefined} led13={!!builtinLedOn || undefined} />;
};

export default ArduinoUno;
