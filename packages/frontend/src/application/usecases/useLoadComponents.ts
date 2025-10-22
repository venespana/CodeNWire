import { useShallow } from 'zustand/react/shallow';

import componentsStore from '@/infrastructure/store/components.store';

const useLoadComponents = () => {
  const components = componentsStore(useShallow(state => Object.values(state.components)));

  return components;
};

export default useLoadComponents;
