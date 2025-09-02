import { useCallback } from 'react';

import { Button } from '@nextui-org/react';
import { Grid, Play, Plus, Square } from 'lucide-react';

const TopBar: React.FC = () => {
  const { isSimulating, gridVisible, resetCircuit, toggleGrid, toggleSnapToGrid, snapToGrid } = {
    isSimulating: false,
    gridVisible: false,
    resetCircuit: () => {},
    toggleGrid: () => {},
    toggleSnapToGrid: () => {},
    snapToGrid: false,
  };

  const handleSimulationToggle = useCallback(() => {}, [isSimulating]);

  return (
    <div className='bg-gray-900 border-b border-gray-700 p-2 flex items-center gap-2'>
      <Button
        isIconOnly
        className={`${isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
        size='sm'
        onPress={handleSimulationToggle}
      >
        <Play size={16} />
      </Button>
      <Button isIconOnly className='bg-blue-600 hover:bg-blue-700 text-white' size='sm' onClick={resetCircuit}>
        <Plus size={16} />
      </Button>
      <Button
        isIconOnly
        className={`${gridVisible ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
        size='sm'
        onClick={toggleGrid}
      >
        <Grid size={16} />
      </Button>
      <Button
        isIconOnly
        className={`${snapToGrid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
        size='sm'
        onClick={toggleSnapToGrid}
      >
        <Square size={16} />
      </Button>
    </div>
  );
};

export default TopBar;
