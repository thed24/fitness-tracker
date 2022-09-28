import { CompletedWorkout, ScheduledWorkout, User } from "types";
import {
  createDistanceFormatter,
  createMeasurementFormatter,
  createWeightFormatter,
  log
} from "utils";
import { StateCreator } from "zustand";
import { State } from "../store";

export interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
  getWeightFormatter: () => (word: string, addBrackets?: boolean) => string;
  getDistanceFormatter: () => (word: string, addBrackets?: boolean) => string;
  getWeasurementFormatter: () => (
    word: string,
    addBrackets?: boolean
  ) => string;
  getScheduledWorkouts: () => ScheduledWorkout[];
  getPastWorkouts: () => CompletedWorkout[];
  debug: () => void;
}

export const createUserSlice: StateCreator<
  State,
  [["zustand/persist", unknown]],
  [],
  UserSlice
> = (set, get) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
  getWeightFormatter: () =>
    createWeightFormatter(get()?.user?.userSettings?.weightUnit || "kilograms"),
  getDistanceFormatter: () =>
    createDistanceFormatter(
      get()?.user?.userSettings?.measurementUnit || "metric"
    ),
  getWeasurementFormatter: () =>
    createMeasurementFormatter(
      get()?.user?.userSettings?.measurementUnit || "metric"
    ),
  getScheduledWorkouts: () => {
    const { user } = get();
    return (
      user
        ? user.workouts.filter((workout) => !workout.past && !workout.completed)
        : []
    ) as ScheduledWorkout[];
  },
  getPastWorkouts: () => {
    const { user } = get();
    return (
      user
        ? user.workouts
            .filter((workout) => workout.past || workout.completed)
            .sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            )
        : []
    ) as CompletedWorkout[];
  },
  debug: () => log(get())
});
