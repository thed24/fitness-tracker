/* eslint-disable consistent-return */
import { useMutation } from "@tanstack/react-query";
import { ScheduledWorkout } from "types";
import { useStore } from "store";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";
import { WorkoutToApiWorkout } from "../types";

type AddWorkoutRequest = {
  userId: string;
  workout: ScheduledWorkout;
};

export function useAddWorkout() {
  const { user, setUser } = useStore();

  return useMutation(
    async (rawRequest: AddWorkoutRequest) => {
      try {
        const workout = WorkoutToApiWorkout(rawRequest.workout);

        return (
          await client.post(`/users/${rawRequest.userId}/workouts`, workout)
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
