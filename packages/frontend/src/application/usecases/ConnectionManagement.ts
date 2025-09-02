import { Connection } from '@/domain/entities/Connection';
import type { Position } from '@/domain/types';

export interface ConnectionRepository {
  save(connection: Connection): Promise<void>;
  findById(id: string): Promise<Connection | null>;
  findAll(): Promise<Connection[]>;
  findByComponent(componentId: string): Promise<Connection[]>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}

export class CreateConnectionUseCase {
  constructor(private repository: ConnectionRepository) {}

  async execute(
    fromComponentId: string,
    fromPinId: string,
    toComponentId: string,
    toPinId: string,
    color?: string
  ): Promise<Connection> {
    const id = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const connection = new Connection(id, fromComponentId, fromPinId, toComponentId, toPinId, color);

    await this.repository.save(connection);
    return connection;
  }
}

export class DeleteConnectionUseCase {
  constructor(private repository: ConnectionRepository) {}

  async execute(connectionId: string): Promise<void> {
    await this.repository.delete(connectionId);
  }
}

export class GetAllConnectionsUseCase {
  constructor(private repository: ConnectionRepository) {}

  async execute(): Promise<Connection[]> {
    return await this.repository.findAll();
  }
}

export class GetConnectionsByComponentUseCase {
  constructor(private repository: ConnectionRepository) {}

  async execute(componentId: string): Promise<Connection[]> {
    return await this.repository.findByComponent(componentId);
  }
}

export class UpdateConnectionPointsUseCase {
  constructor(private repository: ConnectionRepository) {}

  async execute(connectionId: string, points: Position[]): Promise<void> {
    const connection = await this.repository.findById(connectionId);
    if (connection) {
      connection.updatePoints(points);
      await this.repository.save(connection);
    }
  }
}
