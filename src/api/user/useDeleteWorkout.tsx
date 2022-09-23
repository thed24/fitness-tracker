import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";

type DeleteWorkoutRequest = {
  userId: number;
  workoutId: number;
};

export function useDeleteWorkout() {
  const { user, setUser } = useStore();

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
        if (user) {
          updateUser(user, setUser);
        }
      },
    }
  );
}
