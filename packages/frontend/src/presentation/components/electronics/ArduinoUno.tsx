import { useState, useCallback } from 'react';

import { PinState } from 'avr8js';

import useRunAvr8Program from '@/application/usecases/useRunAvrProgram';
import { type ComponentEntityFCProps } from '@/domain/entities/component.entity';
import { type PortListener } from '@/infrastructure/services/arduinoBoard.service';
import programStore from '@/infrastructure/store/program.store';

import ComponentContainer from '../ComponentContainer';

const ArduinoUno: ComponentEntityFCProps = ({ uuid }) => {
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

  return (
    <ComponentContainer componentId={uuid}>
      <wokwi-arduino-uno ledPower={isRunning || undefined} led13={!!builtinLedOn || undefined} />
    </ComponentContainer>
  );
};

export default ArduinoUno;
