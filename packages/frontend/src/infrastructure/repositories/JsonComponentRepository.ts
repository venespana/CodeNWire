import { ComponentFactory } from '@/application/usecases/ComponentFactory';
import type { ComponentRepository } from '@/application/usecases/ComponentManagement';
import type { ElectronicComponent } from '@/domain/entities/ElectronicComponent';

interface SerializedComponent {
  id: string;
  type: string;
  position: { x: number; y: number };
  rotation: number;
  properties: Record<string, any>;
}

export class JsonComponentRepository implements ComponentRepository {
  private components: Map<string, ElectronicComponent> = new Map();
  private storageKey = 'circuit-components';

  constructor() {
    this.loadFromStorage();
  }

  async save(component: ElectronicComponent): Promise<void> {
    this.components.set(component.id, component);
    await this.saveToStorage();
  }

  async findById(id: string): Promise<ElectronicComponent | null> {
    return this.components.get(id) || null;
  }

  async findAll(): Promise<ElectronicComponent[]> {
    return Array.from(this.components.values());
  }

  async delete(id: string): Promise<void> {
    this.components.delete(id);
    await this.saveToStorage();
  }

  async update(component: ElectronicComponent): Promise<void> {
    this.components.set(component.id, component);
    await this.saveToStorage();
  }

  async clear(): Promise<void> {
    this.components.clear();
    await this.saveToStorage();
  }

  private async saveToStorage(): Promise<void> {
    try {
      const serialized: SerializedComponent[] = Array.from(this.components.values()).map(component => ({
        id: component.id,
        type: component.type,
        position: component.position,
        rotation: component.rotation,
        properties: component.properties,
      }));

      localStorage.setItem(this.storageKey, JSON.stringify(serialized));
    } catch (error) {
      console.error('Failed to save components to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return;

      const serialized: SerializedComponent[] = JSON.parse(stored);

      for (const data of serialized) {
        try {
          const component = ComponentFactory.createComponent(data.type, data.position, data.rotation);
          // Restore properties
          Object.entries(data.properties).forEach(([key, value]) => {
            component.updateProperty(key, value);
          });
          this.components.set(component.id, component);
        } catch (error) {
          console.warn(`Failed to restore component ${data.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to load components from storage:', error);
    }
  }

  async exportToJson(): Promise<string> {
    const serialized: SerializedComponent[] = Array.from(this.components.values()).map(component => ({
      id: component.id,
      type: component.type,
      position: component.position,
      rotation: component.rotation,
      properties: component.properties,
    }));

    return JSON.stringify(
      {
        version: '1.0',
        timestamp: new Date().toISOString(),
        components: serialized,
      },
      null,
      2
    );
  }

  async importFromJson(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);

      if (!data.components || !Array.isArray(data.components)) {
        throw new Error('Invalid JSON format: missing components array');
      }

      this.components.clear();

      for (const componentData of data.components) {
        try {
          const component = ComponentFactory.createComponent(
            componentData.type,
            componentData.position,
            componentData.rotation
          );

          // Restore properties
          Object.entries(componentData.properties || {}).forEach(([key, value]) => {
            component.updateProperty(key, value);
          });

          this.components.set(component.id, component);
        } catch (error) {
          console.warn(`Failed to import component ${componentData.id}:`, error);
        }
      }

      await this.saveToStorage();
    } catch (error) {
      console.error('Failed to import from JSON:', error);
      throw error;
    }
  }
}
