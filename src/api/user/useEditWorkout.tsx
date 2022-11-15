import { useMutation } from "@tanstack/react-query";
import { Workout } from "types";
import { client } from "../client";
import { WorkoutToApiWorkout } from "../types";
import { queryClient } from "../apiProvider";

type EditWorkoutRequest = {
  userId: number;
  workout: Workout;
};

type EditWorkoutResponse = {
  id: number;
};

export function useEditWorkout() {
  return useMutation(
    async (rawRequest: EditWorkoutRequest) => {
      const workout = WorkoutToApiWorkout(rawRequest.workout);
      const { data } = await client.put<EditWorkoutResponse>(`/users/${rawRequest.userId}/workouts/${rawRequest.workout.id}`, {workout});
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
