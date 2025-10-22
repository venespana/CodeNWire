import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createSelectorForStore } from '@/shared/utils/createSelectorForStore';

import { type ComponentsRepository } from '../repositories/components.repository';

const componentsStoreName = 'components';

const componentsStore = create<ComponentsRepository>()(
  devtools(
    persist(
      immer((set, get) => ({
        selectedComponent: undefined,
        components: {},
        getComponent: id => get().components[id],
        addComponent: component => {
          const componentUuid = uuid();

          set(
            state => {
              state.components[componentUuid] = { ...component, uuid: componentUuid };
            },
            undefined,
            `${componentsStoreName}/addComponent`
          );
        },
        removeComponent: id => {
          set(
            state => {
              delete state.components[id];
            },
            undefined,
            `${componentsStoreName}/removeComponent`
          );
        },
        updateComponent: (id, component) => {
          if (!get().components[id]) {
            console.error('Component not found');
            return;
          }

          set(
            state => {
              state.components[id] = { ...state.components[id], ...component };
            },
            undefined,
            `${componentsStoreName}/updateComponent`
          );
        },
        selectComponent: id => {
          set(
            state => {
              state.selectedComponent = id;
            },
            undefined,
            `${componentsStoreName}/selectComponent`
          );
        },
      })),
      {
        name: componentsStoreName,
      }
    ),
    {
      name: componentsStoreName,
    }
  )
);

export default createSelectorForStore(componentsStore);
