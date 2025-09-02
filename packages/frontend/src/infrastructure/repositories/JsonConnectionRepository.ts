import { Connection } from '@/domain/entities/Connection';
import type { ConnectionRepository } from '@/application/usecases/ConnectionManagement';

interface SerializedConnection {
  id: string;
  fromComponentId: string;
  fromPinId: string;
  toComponentId: string;
  toPinId: string;
  color: string;
  type: 'wire' | 'jumper';
  points: { x: number; y: number }[];
}

export class JsonConnectionRepository implements ConnectionRepository {
  private connections: Map<string, Connection> = new Map();
  private storageKey = 'circuit-connections';

  constructor() {
    this.loadFromStorage();
  }

  async save(connection: Connection): Promise<void> {
    this.connections.set(connection.id, connection);
    await this.saveToStorage();
  }

  async findById(id: string): Promise<Connection | null> {
    return this.connections.get(id) || null;
  }

  async findAll(): Promise<Connection[]> {
    return Array.from(this.connections.values());
  }

  async findByComponent(componentId: string): Promise<Connection[]> {
    return Array.from(this.connections.values()).filter(conn => 
      conn.isConnectedTo(componentId)
    );
  }

  async delete(id: string): Promise<void> {
    this.connections.delete(id);
    await this.saveToStorage();
  }

  async clear(): Promise<void> {
    this.connections.clear();
    await this.saveToStorage();
  }

  private async saveToStorage(): Promise<void> {
    try {
      const serialized: SerializedConnection[] = Array.from(this.connections.values()).map(connection => ({
        id: connection.id,
        fromComponentId: connection.fromComponentId,
        fromPinId: connection.fromPinId,
        toComponentId: connection.toComponentId,
        toPinId: connection.toPinId,
        color: connection.color,
        type: connection.type,
        points: connection.points
      }));

      localStorage.setItem(this.storageKey, JSON.stringify(serialized));
    } catch (error) {
      console.error('Failed to save connections to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return;

      const serialized: SerializedConnection[] = JSON.parse(stored);
      
      for (const data of serialized) {
        try {
          const connection = new Connection(
            data.id,
            data.fromComponentId,
            data.fromPinId,
            data.toComponentId,
            data.toPinId,
            data.color,
            data.type
          );
          connection.updatePoints(data.points);
          this.connections.set(connection.id, connection);
        } catch (error) {
          console.warn(`Failed to restore connection ${data.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to load connections from storage:', error);
    }
  }

  async exportToJson(): Promise<string> {
    const serialized: SerializedConnection[] = Array.from(this.connections.values()).map(connection => ({
      id: connection.id,
      fromComponentId: connection.fromComponentId,
      fromPinId: connection.fromPinId,
      toComponentId: connection.toComponentId,
      toPinId: connection.toPinId,
      color: connection.color,
      type: connection.type,
      points: connection.points
    }));

    return JSON.stringify({
      version: '1.0',
      timestamp: new Date().toISOString(),
      connections: serialized
    }, null, 2);
  }

  async importFromJson(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      
      if (!data.connections || !Array.isArray(data.connections)) {
        throw new Error('Invalid JSON format: missing connections array');
      }

      this.connections.clear();

      for (const connectionData of data.connections) {
        try {
          const connection = new Connection(
            connectionData.id,
            connectionData.fromComponentId,
            connectionData.fromPinId,
            connectionData.toComponentId,
            connectionData.toPinId,
            connectionData.color,
            connectionData.type
          );
          connection.updatePoints(connectionData.points || []);
          this.connections.set(connection.id, connection);
        } catch (error) {
          console.warn(`Failed to import connection ${connectionData.id}:`, error);
        }
      }

      await this.saveToStorage();
    } catch (error) {
      console.error('Failed to import from JSON:', error);
      throw error;
    }
  }
}
