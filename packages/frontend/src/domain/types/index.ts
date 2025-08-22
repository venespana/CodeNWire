export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Component {
  id: string;
  type: ComponentType;
  position: Position;
  rotation?: number;
  properties?: Record<string, any>;
}

export interface Pin {
  id: string;
  label: string;
  position: Position;
  type: PinType;
  voltage?: number;
  current?: number;
}

export interface Connection {
  id: string;
  fromPin: string;
  toPin: string;
  fromComponentId: string;
  toComponentId: string;
  color?: string;
}

export interface Circuit {
  id: string;
  name: string;
  components: Component[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ComponentType {
  ESP32 = 'esp32',
  LED = 'led',
  RESISTOR = 'resistor',
  SENSOR = 'sensor',
  BUTTON = 'button',
  WIRE = 'wire',
}

export enum PinType {
  DIGITAL = 'digital',
  ANALOG = 'analog',
  POWER = 'power',
  GROUND = 'ground',
  VCC = 'vcc',
}

export interface DragData {
  componentType: ComponentType;
  offset?: Position;
}
