import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../apiProvider";
import { client } from "../client";

type DeleteWorkoutRequest = {
  userId: number;
  workoutId: number;
};

export function useDeleteWorkout() {
  return useMutation(
    async (rawRequest: DeleteWorkoutRequest) => {
      const { data } = await client.delete(`/users/${rawRequest.userId}/workouts/${rawRequest.workoutId}`);
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
