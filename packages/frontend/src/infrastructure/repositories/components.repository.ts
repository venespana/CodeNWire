export interface Component {
  uuid: string;
  code: string;
  coordinates: { x: number; y: number };
}

export interface ComponentsRepository {
  components: Record<string, Component>;
  selectedComponent: string | undefined;
  addComponent: (component: Omit<Component, 'uuid'>) => void;
  removeComponent: (uuid: string) => void;
  updateComponent: (uuid: string, component: Partial<Omit<Component, 'uuid' | 'code'>>) => void;
  getComponent: (uuid: string) => Component | undefined;
  selectComponent: (uuid?: string) => void;
}
