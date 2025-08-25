import type { Position } from '@/domain/types';
import type { ElectronicComponent } from '@/domain/entities/ElectronicComponent';
import { ComponentFactory } from './ComponentFactory';

export interface ComponentRepository {
  save(component: ElectronicComponent): Promise<void>;
  findById(id: string): Promise<ElectronicComponent | null>;
  findAll(): Promise<ElectronicComponent[]>;
  delete(id: string): Promise<void>;
  update(component: ElectronicComponent): Promise<void>;
}

export class CreateComponentUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(type: string, position: Position, rotation = 0): Promise<ElectronicComponent> {
    const component = ComponentFactory.createComponent(type, position, rotation);
    await this.repository.save(component);
    return component;
  }
}

export class UpdateComponentUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(id: string, updates: Partial<{
    position: Position;
    rotation: number;
    properties: Record<string, any>;
  }>): Promise<ElectronicComponent> {
    const component = await this.repository.findById(id);
    if (!component) {
      throw new Error(`Component with id ${id} not found`);
    }

    if (updates.position) {
      component.updatePosition(updates.position);
    }
    if (updates.rotation !== undefined) {
      component.updateRotation(updates.rotation);
    }
    if (updates.properties) {
      Object.entries(updates.properties).forEach(([key, value]) => {
        component.updateProperty(key, value);
      });
    }

    await this.repository.update(component);
    return component;
  }
}

export class DeleteComponentUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export class GetAllComponentsUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(): Promise<ElectronicComponent[]> {
    return await this.repository.findAll();
  }
}

export class GetComponentUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(id: string): Promise<ElectronicComponent | null> {
    return await this.repository.findById(id);
  }
}
