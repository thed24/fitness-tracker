import { CompletedWorkout, ScheduledWorkout, User } from "types";
import { StateCreator } from "zustand";
import { State } from "../store";

export interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
  scheduledWorkouts: () => ScheduledWorkout[];
  pastWorkouts: () => CompletedWorkout[];
}

export const createUserSlice: StateCreator<State, [["zustand/persist", unknown]], [], UserSlice> = (
  set,
  get
) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
  scheduledWorkouts: () => {
    const user = get().user;
    return (user ? user.workouts.filter(user => user.completed) : []) as ScheduledWorkout[];
  },
  pastWorkouts: () => {
    const user = get().user;
    return (user ? user.workouts.filter(user => !user.completed) : []) as CompletedWorkout[];
  }
} as UserSlice);
