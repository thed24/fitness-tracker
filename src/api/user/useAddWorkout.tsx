import { useMutation } from "@tanstack/react-query";
import { ScheduledWorkout } from "types";
import { client } from "../client";
import { handleError } from "../utilities";
import { WorkoutToApiWorkout } from "../types";
import { queryClient } from "../apiProvider";

type AddWorkoutRequest = {
  userId: number;
  workout: ScheduledWorkout;
};

export function useAddWorkout() {
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
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["workoutData"]);
        queryClient.invalidateQueries(["workoutNames"]);
        queryClient.invalidateQueries(["userAchievements"]);
      },
    }
  );
}
