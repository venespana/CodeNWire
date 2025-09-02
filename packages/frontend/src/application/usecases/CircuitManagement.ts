import type { ElectronicComponent } from '@/domain/entities/ElectronicComponent';
import type { ComponentRepository } from './ComponentManagement';
import { ComponentFactory } from './ComponentFactory';
import type { Position } from '@/domain/types';

export class AddComponentToCircuitUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(type: string, position: Position): Promise<ElectronicComponent> {
    const component = ComponentFactory.createComponent(type, position);
    await this.repository.save(component);
    return component;
  }
}

export class SaveCircuitUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(): Promise<string> {
    if ('exportToJson' in this.repository) {
      return await (this.repository as any).exportToJson();
    }
    throw new Error('Repository does not support JSON export');
  }
}

export class LoadCircuitUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(jsonData: string): Promise<void> {
    if ('importFromJson' in this.repository) {
      await (this.repository as any).importFromJson(jsonData);
    } else {
      throw new Error('Repository does not support JSON import');
    }
  }
}

export class ClearCircuitUseCase {
  constructor(private repository: ComponentRepository) {}

  async execute(): Promise<void> {
    if ('clear' in this.repository) {
      await (this.repository as any).clear();
    } else {
      const components = await this.repository.findAll();
      for (const component of components) {
        await this.repository.delete(component.id);
      }
    }
  }
}
