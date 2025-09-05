import { type StoreApi, type UseBoundStore, useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export const createSelectorForStore = <S extends UseBoundStore<StoreApi<object>>>(store: S) => {
  const storeIn = store as WithSelectors<typeof store>;
  storeIn.use = {};

  Object.keys(storeIn.getState()).forEach(key => {
    const selector = (state: S) => state[key as keyof S];

    (storeIn.use as any)[key] =
      typeof storeIn === 'function'
        ? () => storeIn(useShallow(selector as any))
        : () => useStore(storeIn, useShallow(selector as any));
  });

  return storeIn;
};
