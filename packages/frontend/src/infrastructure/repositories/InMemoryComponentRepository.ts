import type { ComponentRepository } from '@/application/usecases/ComponentManagement';
import type { ElectronicComponent } from '@/domain/entities/ElectronicComponent';

export class InMemoryComponentRepository implements ComponentRepository {
  private components: Map<string, ElectronicComponent> = new Map();

  async save(component: ElectronicComponent): Promise<void> {
    this.components.set(component.id, component);
  }

  async findById(id: string): Promise<ElectronicComponent | null> {
    return this.components.get(id) || null;
  }

  async findAll(): Promise<ElectronicComponent[]> {
    return Array.from(this.components.values());
  }

  async delete(id: string): Promise<void> {
    this.components.delete(id);
  }

  async update(component: ElectronicComponent): Promise<void> {
    this.components.set(component.id, component);
  }

  clear(): void {
    this.components.clear();
  }
}
