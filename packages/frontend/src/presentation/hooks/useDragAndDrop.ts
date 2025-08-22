import { useCallback } from 'react';

import type { ComponentType, Position, DragData } from '@/types';

interface UseDragAndDropProps {
  onComponentDrop: (componentType: ComponentType, position: Position) => void;
}

export const useDragAndDrop = ({ onComponentDrop }: UseDragAndDropProps) => {
  const handleDragStart = useCallback((e: React.DragEvent, componentType: ComponentType) => {
    const dragData: DragData = { componentType };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const dragDataString = e.dataTransfer.getData('application/json');
      if (!dragDataString) return;

      const dragData: DragData = JSON.parse(dragDataString);
      const rect = e.currentTarget.getBoundingClientRect();
      const position: Position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      onComponentDrop(dragData.componentType, position);
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  }, [onComponentDrop]);

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};
