import { Cpu, Zap, Radio, Thermometer, Square, Cable } from 'lucide-react';

import { ComponentType } from '@/types';

export const COMPONENT_DEFINITIONS = [
  {
    id: ComponentType.ESP32,
    name: 'ESP32',
    icon: Cpu,
    color: 'bg-blue-600',
    description: 'Microcontrolador ESP32 con WiFi y Bluetooth',
  },
  {
    id: ComponentType.LED,
    name: 'LED',
    icon: Zap,
    color: 'bg-yellow-600',
    description: 'Diodo emisor de luz',
  },
  {
    id: ComponentType.RESISTOR,
    name: 'Resistor',
    icon: Radio,
    color: 'bg-green-600',
    description: 'Resistencia eléctrica',
  },
  {
    id: ComponentType.SENSOR,
    name: 'Sensor',
    icon: Thermometer,
    color: 'bg-purple-600',
    description: 'Sensor de temperatura y humedad',
  },
  {
    id: ComponentType.BUTTON,
    name: 'Button',
    icon: Square,
    color: 'bg-gray-600',
    description: 'Pulsador momentáneo',
  },
  {
    id: ComponentType.WIRE,
    name: 'Wire',
    icon: Cable,
    color: 'bg-orange-600',
    description: 'Cable de conexión',
  },
] as const;

export const GRID_SIZE = 20;
export const PIN_SIZE = 4;
export const PIN_SPACING = 12;
