import { User } from "types";
import { StateCreator } from "zustand";
import { State } from "../store";

export interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserSlice: StateCreator<
  State,
  [["zustand/persist", unknown]],
  [],
  UserSlice
> = (set, get) =>
  ({
    user: null,
    setUser: (user: User | null) => set(() => ({ user }))
  } as UserSlice);
