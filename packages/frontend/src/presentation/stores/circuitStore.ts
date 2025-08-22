import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Circuit, Component, Connection } from '@/types';
import { generateId } from '@/shared/utils/canvas';

export interface CircuitState {
  circuit: Circuit;
  selectedComponent: Component | null;
  selectedConnection: Connection | null;
  isSimulating: boolean;
}

export interface CircuitActions {
  addComponent: (component: Omit<Component, 'id'>) => void;
  removeComponent: (componentId: string) => void;
  updateComponent: (componentId: string, updates: Partial<Component>) => void;
  selectComponent: (component: Component | null) => void;
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  removeConnection: (connectionId: string) => void;
  selectConnection: (connection: Connection | null) => void;
  clearSelection: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  resetCircuit: () => void;
}

type CircuitStore = CircuitState & CircuitActions;

const initialCircuit: Circuit = {
  id: generateId(),
  name: 'New Circuit',
  components: [],
  connections: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useCircuitStore = create<CircuitStore>()(
  devtools(
    (set) => ({
      // State
      circuit: initialCircuit,
      selectedComponent: null,
      selectedConnection: null,
      isSimulating: false,

      // Actions
      addComponent: (componentData) => {
        const component: Component = {
          ...componentData,
          id: generateId(),
        };

        set((state) => ({
          circuit: {
            ...state.circuit,
            components: [...state.circuit.components, component],
            updatedAt: new Date(),
          },
        }));
      },

      removeComponent: (componentId) => {
        set((state) => ({
          circuit: {
            ...state.circuit,
            components: state.circuit.components.filter(
              (comp) => comp.id !== componentId
            ),
            connections: state.circuit.connections.filter(
              (conn) => 
                conn.fromComponentId !== componentId && 
                conn.toComponentId !== componentId
            ),
            updatedAt: new Date(),
          },
          selectedComponent: 
            state.selectedComponent?.id === componentId 
              ? null 
              : state.selectedComponent,
        }));
      },

      updateComponent: (componentId, updates) => {
        set((state) => ({
          circuit: {
            ...state.circuit,
            components: state.circuit.components.map((comp) =>
              comp.id === componentId ? { ...comp, ...updates } : comp
            ),
            updatedAt: new Date(),
          },
        }));
      },

      selectComponent: (component) => {
        set({ selectedComponent: component, selectedConnection: null });
      },

      addConnection: (connectionData) => {
        const connection: Connection = {
          ...connectionData,
          id: generateId(),
        };

        set((state) => ({
          circuit: {
            ...state.circuit,
            connections: [...state.circuit.connections, connection],
            updatedAt: new Date(),
          },
        }));
      },

      removeConnection: (connectionId) => {
        set((state) => ({
          circuit: {
            ...state.circuit,
            connections: state.circuit.connections.filter(
              (conn) => conn.id !== connectionId
            ),
            updatedAt: new Date(),
          },
          selectedConnection: 
            state.selectedConnection?.id === connectionId 
              ? null 
              : state.selectedConnection,
        }));
      },

      selectConnection: (connection) => {
        set({ selectedConnection: connection, selectedComponent: null });
      },

      clearSelection: () => {
        set({ selectedComponent: null, selectedConnection: null });
      },

      startSimulation: () => {
        set({ isSimulating: true });
      },

      stopSimulation: () => {
        set({ isSimulating: false });
      },

      resetCircuit: () => {
        set({
          circuit: { ...initialCircuit, id: generateId() },
          selectedComponent: null,
          selectedConnection: null,
          isSimulating: false,
        });
      },
    }),
    {
      name: 'circuit-store',
    }
  )
);
