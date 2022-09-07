/* eslint-disable consistent-return */
import { useMutation } from "@tanstack/react-query";
import { Workout } from "types";
import { useStore } from "store";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";
import { WorkoutToApiWorkout } from "../types";

type EditWorkoutRequest = {
  userId: string;
  workout: Workout;
};

export function useEditWorkout() {
  const { user, setUser } = useStore();

  return useMutation(
    async (rawRequest: EditWorkoutRequest) => {
      try {
        const workout = WorkoutToApiWorkout(rawRequest.workout);

        return (
          await client.put(`/users/${rawRequest.userId}/workouts/${rawRequest.workout.id}`, workout)
        ).data;
      } catch (error) {
        handleError(error);
      }
    },
    {
      onSuccess() {
        if (user) {
          updateUser(user, setUser);
        }
      },
    }
  );
}
