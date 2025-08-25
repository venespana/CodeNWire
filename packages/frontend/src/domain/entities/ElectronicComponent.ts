import type { Position } from '@/domain/types';

export abstract class ElectronicComponent {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public position: Position,
    public rotation: number = 0,
    public properties: Record<string, any> = {}
  ) {}

  abstract getDisplayName(): string;
  abstract getPins(): Pin[];
  abstract getDefaultProperties(): Record<string, any>;
  
  updatePosition(position: Position): void {
    this.position = position;
  }

  updateRotation(rotation: number): void {
    this.rotation = rotation;
  }

  updateProperty(key: string, value: any): void {
    this.properties[key] = value;
  }
}

export interface Pin {
  id: string;
  label: string;
  position: Position;
  type: 'digital' | 'analog' | 'power' | 'ground';
}

export class LEDComponent extends ElectronicComponent {
  constructor(id: string, position: Position, rotation = 0) {
    super(id, 'led', position, rotation, {
      color: 'red',
      isOn: false,
      brightness: 1,
      rgbColor: '#ff0000'
    });
  }

  getDisplayName(): string {
    return 'LED';
  }

  getPins(): Pin[] {
    return [
      { id: 'anode', label: 'A', position: { x: 0, y: -15 }, type: 'digital' },
      { id: 'cathode', label: 'K', position: { x: 0, y: 15 }, type: 'ground' }
    ];
  }

  getDefaultProperties(): Record<string, any> {
    return {
      color: 'red',
      isOn: false,
      brightness: 1,
      rgbColor: '#ff0000'
    };
  }
}

export class ResistorComponent extends ElectronicComponent {
  constructor(id: string, position: Position, rotation = 0) {
    super(id, 'resistor', position, rotation, {
      value: 1000,
      tolerance: 5,
      wattage: 0.25
    });
  }

  getDisplayName(): string {
    const value = this.properties.value;
    return value >= 1000 ? `${value / 1000}kΩ` : `${value}Ω`;
  }

  getPins(): Pin[] {
    return [
      { id: 'pin1', label: '1', position: { x: -25, y: 0 }, type: 'analog' },
      { id: 'pin2', label: '2', position: { x: 25, y: 0 }, type: 'analog' }
    ];
  }

  getDefaultProperties(): Record<string, any> {
    return {
      value: 1000,
      tolerance: 5,
      wattage: 0.25
    };
  }
}

export class PushButtonComponent extends ElectronicComponent {
  constructor(id: string, position: Position, rotation = 0) {
    super(id, 'pushbutton', position, rotation, {
      isPressed: false,
      buttonColor: '#ff0000',
      size: 'medium'
    });
  }

  getDisplayName(): string {
    return 'Push Button';
  }

  getPins(): Pin[] {
    const size = this.properties.size === 'small' ? 8 : this.properties.size === 'large' ? 15 : 12;
    return [
      { id: 'pin1', label: '1', position: { x: -size - 3, y: -size / 2 }, type: 'digital' },
      { id: 'pin2', label: '2', position: { x: size + 3, y: -size / 2 }, type: 'digital' },
      { id: 'pin3', label: '3', position: { x: -size - 3, y: size / 2 }, type: 'digital' },
      { id: 'pin4', label: '4', position: { x: size + 3, y: size / 2 }, type: 'digital' }
    ];
  }

  getDefaultProperties(): Record<string, any> {
    return {
      isPressed: false,
      buttonColor: '#ff0000',
      size: 'medium'
    };
  }
}

export class PotentiometerComponent extends ElectronicComponent {
  constructor(id: string, position: Position, rotation = 0) {
    super(id, 'potentiometer', position, rotation, {
      value: 0.5,
      maxResistance: 10000,
      type: 'rotary'
    });
  }

  getDisplayName(): string {
    const maxRes = this.properties.maxResistance;
    return `${maxRes >= 1000 ? maxRes / 1000 + 'kΩ' : maxRes + 'Ω'} Pot`;
  }

  getPins(): Pin[] {
    return [
      { id: 'pin1', label: '1', position: { x: -1, y: -20 }, type: 'analog' },
      { id: 'wiper', label: 'W', position: { x: 1, y: -20 }, type: 'analog' },
      { id: 'pin3', label: '3', position: { x: 3, y: -20 }, type: 'analog' }
    ];
  }

  getDefaultProperties(): Record<string, any> {
    return {
      value: 0.5,
      maxResistance: 10000,
      type: 'rotary'
    };
  }
}

export class CapacitorComponent extends ElectronicComponent {
  constructor(id: string, position: Position, rotation = 0) {
    super(id, 'capacitor', position, rotation, {
      value: 100,
      type: 'ceramic',
      voltage: 25,
      polarity: false
    });
  }

  getDisplayName(): string {
    const value = this.properties.value;
    return value >= 1000 ? `${value / 1000}mF` : `${value}µF`;
  }

  getPins(): Pin[] {
    return [
      { id: 'pin1', label: this.properties.polarity ? '+' : '1', position: { x: -20, y: 0 }, type: 'analog' },
      { id: 'pin2', label: this.properties.polarity ? '-' : '2', position: { x: 20, y: 0 }, type: 'analog' }
    ];
  }

  getDefaultProperties(): Record<string, any> {
    return {
      value: 100,
      type: 'ceramic',
      voltage: 25,
      polarity: false
    };
  }
}

export class ToggleSwitchComponent extends ElectronicComponent {
  constructor(id: string, position: Position, rotation = 0) {
    super(id, 'toggleswitch', position, rotation, {
      isOn: false,
      switchType: 'toggle',
      size: 'medium'
    });
  }

  getDisplayName(): string {
    return 'Toggle Switch';
  }

  getPins(): Pin[] {
    const height = this.properties.size === 'small' ? 12 : this.properties.size === 'large' ? 24 : 18;
    return [
      { id: 'common', label: 'C', position: { x: -1, y: -height / 2 - 8 }, type: 'digital' },
      { id: 'no', label: 'NO', position: { x: 1, y: -height / 2 - 8 }, type: 'digital' },
      { id: 'nc', label: 'NC', position: { x: -1, y: height / 2 + 2 }, type: 'digital' }
    ];
  }

  getDefaultProperties(): Record<string, any> {
    return {
      isOn: false,
      switchType: 'toggle',
      size: 'medium'
    };
  }
}
