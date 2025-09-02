import type { Position } from '@/domain/types';

export class Connection {
  public readonly id: string;
  public readonly fromComponentId: string;
  public readonly fromPinId: string;
  public readonly toComponentId: string;
  public readonly toPinId: string;
  public readonly color: string;
  public readonly type: 'wire' | 'jumper';
  public points: Position[];

  constructor(
    id: string,
    fromComponentId: string,
    fromPinId: string,
    toComponentId: string,
    toPinId: string,
    color: string = '#ff6b35',
    type: 'wire' | 'jumper' = 'wire'
  ) {
    this.id = id;
    this.fromComponentId = fromComponentId;
    this.fromPinId = fromPinId;
    this.toComponentId = toComponentId;
    this.toPinId = toPinId;
    this.color = color;
    this.type = type;
    this.points = [];
  }

  updatePoints(points: Position[]): void {
    this.points = points;
  }

  getFromPin(): string {
    return `${this.fromComponentId}.${this.fromPinId}`;
  }

  getToPin(): string {
    return `${this.toComponentId}.${this.toPinId}`;
  }

  isConnectedTo(componentId: string, pinId?: string): boolean {
    if (pinId) {
      return (
        (this.fromComponentId === componentId && this.fromPinId === pinId) ||
        (this.toComponentId === componentId && this.toPinId === pinId)
      );
    }
    return this.fromComponentId === componentId || this.toComponentId === componentId;
  }
}
