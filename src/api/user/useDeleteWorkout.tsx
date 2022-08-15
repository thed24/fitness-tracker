/* eslint-disable consistent-return */
import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { AxiosResponse } from "axios";
import { client } from "../client";
import { apiErrorHandler } from "../errors";
import { ApiWorkout, ApiWorkoutToWorkout } from "../types";

type DeleteWorkoutRequest = {
  userId: string;
  workoutId: string;
};

type RawGetWorkoutsResponse = {
  workouts: ApiWorkout[];
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
        apiErrorHandler(error);
      }
    },
    {
      onSuccess() {
        if (user) {
          client
            .get(`/users/${user.id}/workouts`)
            .then((response: AxiosResponse<RawGetWorkoutsResponse>) => {
              setUser({
                ...user,
                workouts: response.data.workouts.map((workout) =>
                  ApiWorkoutToWorkout(workout)
                ),
              });
            })
            .catch((error) => {
              apiErrorHandler(error);
            });
        }
      },
    }
  );
}
