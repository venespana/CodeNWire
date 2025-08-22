import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UIState {
  canvasSize: { width: number; height: number };
  zoom: number;
  panOffset: { x: number; y: number };
  gridVisible: boolean;
  snapToGrid: boolean;
  toolbarCollapsed: boolean;
  propertiesPanelVisible: boolean;
  isDragging: boolean;
  draggedComponentType: string | null;
}

export interface UIActions {
  setCanvasSize: (size: { width: number; height: number }) => void;
  setZoom: (zoom: number) => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  toggleToolbar: () => void;
  togglePropertiesPanel: () => void;
  setDragging: (isDragging: boolean, componentType?: string | null) => void;
  resetView: () => void;
}

type UIStore = UIState & UIActions;

const initialState: UIState = {
  canvasSize: { width: 800, height: 600 },
  zoom: 1,
  panOffset: { x: 0, y: 0 },
  gridVisible: true,
  snapToGrid: true,
  toolbarCollapsed: false,
  propertiesPanelVisible: true,
  isDragging: false,
  draggedComponentType: null,
};

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      // State
      ...initialState,

      // Actions
      setCanvasSize: (size) => {
        set({ canvasSize: size });
      },

      setZoom: (zoom) => {
        const clampedZoom = Math.max(0.1, Math.min(5, zoom));
        set({ zoom: clampedZoom });
      },

      setPanOffset: (offset) => {
        set({ panOffset: offset });
      },

      toggleGrid: () => {
        set((state) => ({ gridVisible: !state.gridVisible }));
      },

      toggleSnapToGrid: () => {
        set((state) => ({ snapToGrid: !state.snapToGrid }));
      },

      toggleToolbar: () => {
        set((state) => ({ toolbarCollapsed: !state.toolbarCollapsed }));
      },

      togglePropertiesPanel: () => {
        set((state) => ({ 
          propertiesPanelVisible: !state.propertiesPanelVisible 
        }));
      },

      setDragging: (isDragging, componentType = null) => {
        set({ 
          isDragging, 
          draggedComponentType: isDragging ? componentType : null 
        });
      },

      resetView: () => {
        set({
          zoom: 1,
          panOffset: { x: 0, y: 0 },
        });
      },
    }),
    {
      name: 'ui-store',
    }
  )
);
