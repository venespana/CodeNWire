import { Button } from '@nextui-org/react';
import { Play, Plus, Grid, Square } from 'lucide-react';
import { useCallback } from 'react';

import CircuitCanvas from './components/CircuitCanvas';
import ComponentToolbar from './components/ComponentToolbar';
import { useCircuitStore, useUIStore } from './presentation/stores';
import type { ComponentType, Position } from '@/types';

function App() {
  const { addComponent, startSimulation, stopSimulation, isSimulating, resetCircuit } = useCircuitStore();
  const { toggleGrid, toggleSnapToGrid, gridVisible, snapToGrid } = useUIStore();

  const handleComponentDrop = useCallback((componentType: ComponentType, position: Position) => {
    addComponent({
      type: componentType,
      position,
      rotation: 0,
      properties: {},
    });
  }, [addComponent]);

  const handleSimulationToggle = useCallback(() => {
    if (isSimulating) {
      stopSimulation();
    } else {
      startSimulation();
    }
  }, [isSimulating, startSimulation, stopSimulation]);

  return (
    <div className="h-screen bg-gray-800 flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-gray-900 border-b border-gray-700 p-2 flex items-center gap-2">
        <Button
          isIconOnly
          className={`${isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
          size="sm"
          onPress={handleSimulationToggle}
        >
          <Play size={16} />
        </Button>
        <Button
          isIconOnly
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
          onClick={resetCircuit}
        >
          <Plus size={16} />
        </Button>
        <Button
          isIconOnly
          className={`${gridVisible ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
          size="sm"
          onClick={toggleGrid}
        >
          <Grid size={16} />
        </Button>
        <Button
          isIconOnly
          className={`${snapToGrid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
          size="sm"
          onClick={toggleSnapToGrid}
        >
          <Square size={16} />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Component Toolbar */}
        <ComponentToolbar onComponentDrop={handleComponentDrop} />

        {/* Circuit Canvas */}
        <CircuitCanvas />
      </div>
    </div>
  );
}

export default App;
