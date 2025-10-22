import { useCallback } from 'react';

import { useShallow } from 'zustand/react/shallow';

import componentsStore from '@/infrastructure/store/components.store';

const useComponentInformation = (componentUUID: string) => {
  const [component, isSelected] = componentsStore(
    useShallow(state => [state.components[componentUUID], state.selectedComponent === componentUUID])
  );

  if (!component) throw new Error(`Component ${componentUUID} not found`);

  const handleSelection = useCallback(() => componentsStore.getState().selectComponent(componentUUID), [componentUUID]);

  return {
    ...component,
    isSelected,
    handleSelection,
  };
};

export default useComponentInformation;
