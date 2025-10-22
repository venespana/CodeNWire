import { useCallback } from 'react';

import { type DragEndEvent } from '@dnd-kit/core';

import componentsStore from '@/infrastructure/store/components.store';

const useDragComponent = () => {
  const handleClearSelection = useCallback(() => {
    componentsStore.getState().selectComponent(undefined);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    const component = componentsStore.getState().getComponent(active.id as string);

    if (!component) {
      console.error(`Component ${active.id} not found`);
      return;
    }

    componentsStore.getState().updateComponent(active.id as string, {
      coordinates: {
        x: component.coordinates.x + delta.x,
        y: component.coordinates.y + delta.y,
      },
    });
  };

  const handleDeleteSelectedElement = useCallback(() => {
    const selected = componentsStore.getState().selectedComponent;

    if (!selected) return;

    componentsStore.getState().removeComponent(selected);
    componentsStore.getState().selectComponent(undefined);
  }, []);

  return {
    handleDragEnd,
    handleClearSelection,
    handleDeleteSelectedElement,
  };
};

export default useDragComponent;
