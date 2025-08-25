import type { Position } from '@/domain/types';
import {
  ElectronicComponent,
  LEDComponent,
  ResistorComponent,
  PushButtonComponent,
  PotentiometerComponent,
  CapacitorComponent,
  ToggleSwitchComponent
} from '@/domain/entities/ElectronicComponent';

export class ComponentFactory {
  private static idCounter = 0;

  private static generateId(type: string): string {
    return `${type}_${++this.idCounter}_${Date.now()}`;
  }

  static createComponent(type: string, position: Position, rotation = 0): ElectronicComponent {
    const id = this.generateId(type);

    switch (type) {
      case 'led':
        return new LEDComponent(id, position, rotation);
      case 'resistor':
        return new ResistorComponent(id, position, rotation);
      case 'pushbutton':
        return new PushButtonComponent(id, position, rotation);
      case 'potentiometer':
        return new PotentiometerComponent(id, position, rotation);
      case 'capacitor':
        return new CapacitorComponent(id, position, rotation);
      case 'toggleswitch':
        return new ToggleSwitchComponent(id, position, rotation);
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  }

  static getAvailableTypes(): string[] {
    return [
      'led',
      'resistor',
      'pushbutton',
      'potentiometer',
      'capacitor',
      'toggleswitch'
    ];
  }

  static getComponentDisplayName(type: string): string {
    switch (type) {
      case 'led': return 'LED';
      case 'resistor': return 'Resistor';
      case 'pushbutton': return 'Push Button';
      case 'potentiometer': return 'Potentiometer';
      case 'capacitor': return 'Capacitor';
      case 'toggleswitch': return 'Toggle Switch';
      default: return type;
    }
  }
}
