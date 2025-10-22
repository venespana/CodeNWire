import type React from 'react';
import { useCallback } from 'react';

import { useDraggable } from '@dnd-kit/core';
import { cn } from '@nextui-org/react';

import useComponentInformation from '@/application/usecases/useComponentInformatin';

export type ComponentContainerProps = React.PropsWithChildren<{
  componentId: string;
}>;

const ComponentContainer: React.FC<ComponentContainerProps> = props => {
  const { children, componentId } = props;
  const { coordinates, isSelected, handleSelection } = useComponentInformation(componentId);

  const { setNodeRef, transform, attributes, listeners } = useDraggable({
    id: componentId,
  });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  const handleOnPointerDown = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      evt.stopPropagation();
      handleSelection();
      listeners?.onPointerDown(evt);
    },
    [handleSelection, listeners]
  );

  return (
    <div
      className={cn('absolute border-medium border-transparent border-dashed', {
        'border-green-600': isSelected,
        'hover:border-gray-600': !isSelected,
      })}
      ref={setNodeRef}
      style={{ ...style, top: coordinates.y, left: coordinates.x }}
      {...attributes}
      {...listeners}
      onPointerDown={handleOnPointerDown}
    >
      <div>{children}</div>
    </div>
  );
};

export default ComponentContainer;
