import '@wokwi/elements';

// import CircuitCanvas from './components/CircuitCanvas';
// import { ComponentToolbar } from './presentation/components/ui/ComponentToolbar';

import { type KeyboardEvent, useCallback } from 'react';

import { DndContext } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import useAddComponent from './application/usecases/useAddComponent';
import useDragComponent from './application/usecases/useDragComponent';
import InoEditor from './presentation/components/inoEditor';
import ComponentLoader from './presentation/components/ui/ComponentLoader';
import TopBar from './presentation/components/ui/TopBar';

function App() {
  const { handleDragEnd, handleClearSelection, handleDeleteSelectedElement } = useDragComponent();
  const handleAddComponent = useAddComponent('arduino:avr:uno');

  const handleDelKey = useCallback(
    (evt: KeyboardEvent<HTMLDivElement>) => {
      if (!['Delete', 'Backspace'].includes(evt.code)) return;

      handleDeleteSelectedElement();
    },
    [handleDeleteSelectedElement]
  );

  return (
    <div className='h-screen bg-gray-800 flex flex-col'>
      <TopBar />
      <div className='flex-1 grid grid-cols-12'>
        <div className='col-span-3 flex h-full'>
          <InoEditor />
        </div>
        <div className='relative h-full col-span-7' onPointerDown={handleClearSelection} onKeyDown={handleDelKey}>
          <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
            <ComponentLoader />
          </DndContext>
        </div>
        <div className='col-span-2 bg-gray-900'>
          <button onClick={handleAddComponent}>Arduino uno</button>
        </div>
      </div>
    </div>
  );
}

export default App;
