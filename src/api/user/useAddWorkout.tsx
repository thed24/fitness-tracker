import { useMutation } from "@tanstack/react-query";
import { ScheduledWorkout } from "types";
import { client } from "../client";
import { WorkoutToApiWorkout } from "../types";
import { queryClient } from "../apiProvider";

type AddWorkoutRequest = {
  userId: number;
  workout: ScheduledWorkout;
};

export function useAddWorkout() {
  return useMutation(
    async (rawRequest: AddWorkoutRequest) => {
      const workout = WorkoutToApiWorkout(rawRequest.workout);
      const { data } = await client.post(`/users/${rawRequest.userId}/workouts`, workout);
      return data;
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
