import { log } from 'utils';
import { StateCreator } from 'zustand';
import { State } from '../store';

export interface UserSlice {
  userId: number | undefined;
  setUserId: (userId: number | undefined) => void;
  debug: () => void;
}

export const createUserSlice: StateCreator<
  State,
  [['zustand/persist', unknown]],
  [],
  UserSlice
> = (set, get) => ({
  userId: undefined,
  setUserId: (userId) => set({ userId }),
  debug: () => log(get()),
});
