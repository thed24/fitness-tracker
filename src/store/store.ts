import create, { StateCreator, StoreApi, UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";
import { zustandStorage } from "./utils";
import { createUserSlice, UserSlice } from "./user/slice";

export type State = UserSlice;

function createStore<TState extends Record<string | number | symbol, any>>(
  createState: StateCreator<TState, [["zustand/persist", unknown]], [], TState>,
  storeName: string
): [
  UseBoundStore<StoreApi<TState>>,
  StoreApi<TState & { [key: string]: unknown }>
] {
  const store = create(
    persist(createState, {
      name: storeName,
      getStorage: () => zustandStorage
    })
  );
  store.destroy();
  return [
    store,
    {
      setState: store.setState,
      getState: store.getState,
      subscribe: store.subscribe,
      destroy: store.destroy
    }
  ];
}

export const [useStore] = createStore<State>(
  (...a) => ({
    ...createUserSlice(...a)
  }),
  "useStore"
);
