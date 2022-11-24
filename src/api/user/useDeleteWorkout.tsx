import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { queryClient } from "../apiProvider";
import { client } from "../client";

type DeleteWorkoutRequest = {
  userId: number;
  workoutId: number;
};

export function useDeleteWorkout() {
  const { userId } = useStore();

  return useMutation(
    async (rawRequest: DeleteWorkoutRequest) => {
      const { data } = await client.delete(`/users/${rawRequest.userId}/workouts/${rawRequest.workoutId}`);
      return data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["user", userId]);
        queryClient.invalidateQueries(["workoutData"]);
        queryClient.invalidateQueries(["workoutNames"]);
        queryClient.invalidateQueries(["userAchievements", userId]);
      },
    }
  );
}
