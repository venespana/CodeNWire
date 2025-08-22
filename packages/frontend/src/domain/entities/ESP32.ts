import { Pin, PinType } from '@/types';

export class ESP32Entity {
  public readonly id: string;
  public readonly name: string;
  public readonly pins: Pin[];
  public readonly boardWidth = 200;
  public readonly boardHeight = 300;

  constructor(id: string) {
    this.id = id;
    this.name = 'ESP32-DEVKIT-V1';
    this.pins = this.createPins();
  }

  private createPins(): Pin[] {
    const leftPins = [
      'EN', '36', '39', '34', '35', '32', '33', '25', '26', '27',
      '14', '12', 'GND', '13', '9', '10', '11', 'VIN'
    ];
    
    const rightPins = [
      '3V3', 'GND', '15', '2', '0', '4', '16', '17', '5', '18',
      '19', '21', 'RX0', 'TX0', '22', '23', 'GND', 'CLK'
    ];

    const pins: Pin[] = [];
    const pinSpacing = 12;

    // Left pins
    leftPins.forEach((label, index) => {
      pins.push({
        id: `${this.id}-left-${index}`,
        label,
        position: { x: -5, y: 40 + index * pinSpacing },
        type: this.getPinType(label),
      });
    });

    // Right pins
    rightPins.forEach((label, index) => {
      pins.push({
        id: `${this.id}-right-${index}`,
        label,
        position: { x: this.boardWidth + 5, y: 40 + index * pinSpacing },
        type: this.getPinType(label),
      });
    });

    return pins;
  }

  private getPinType(label: string): PinType {
    if (label === 'GND') return PinType.GROUND;
    if (label === '3V3' || label === 'VIN') return PinType.POWER;
    if (label.match(/^\d+$/)) return PinType.DIGITAL;
    if (['36', '39', '34', '35', '32', '33'].includes(label)) return PinType.ANALOG;
    return PinType.DIGITAL;
  }

  public getPinById(pinId: string): Pin | undefined {
    return this.pins.find(pin => pin.id === pinId);
  }

  public getPinsByType(type: PinType): Pin[] {
    return this.pins.filter(pin => pin.type === type);
  }
}
