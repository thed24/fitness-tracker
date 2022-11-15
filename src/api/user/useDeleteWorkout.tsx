import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../apiProvider";
import { client } from "../client";
import { handleError } from "../utilities";

type DeleteWorkoutRequest = {
  userId: number;
  workoutId: number;
};

export function useDeleteWorkout() {
  return useMutation(
    async (rawRequest: DeleteWorkoutRequest) => {
      try {
        return (
          await client.delete(`/users/${rawRequest.userId}/workouts/${rawRequest.workoutId}`)
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
