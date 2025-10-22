import { useCallback } from 'react';

import componentsStore from '@/infrastructure/store/components.store';

const useAddComponent = (componentCode: string) => {
  const handleAddComponent = useCallback(() => {
    componentsStore.getState().addComponent({
      code: componentCode,
      coordinates: { x: 0, y: 0 },
    });
  }, [componentCode]);

  return handleAddComponent;
};

export default useAddComponent;
