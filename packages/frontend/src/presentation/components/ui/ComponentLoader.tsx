import useLoadComponents from '@/application/usecases/useLoadComponents';
import { type ComponentEntityFCProps } from '@/domain/entities/component.entity';

import ArduinoUno from '../electronics/ArduinoUno';

const COMPONENTS_RENDER: Record<string, ComponentEntityFCProps> = {
  'arduino:avr:uno': ArduinoUno,
};

const ComponentLoader = () => {
  const components = useLoadComponents();

  return components.map(component => {
    const Render = COMPONENTS_RENDER[component.code];

    if (!Render) return null;

    return <Render key={component.uuid} uuid={component.uuid} />;
  });
};

export default ComponentLoader;
