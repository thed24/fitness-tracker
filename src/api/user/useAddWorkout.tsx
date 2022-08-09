/* eslint-disable consistent-return */
import { useMutation } from "@tanstack/react-query";
import { ScheduledWorkout } from "types";
import { useStore } from "store";
import { AxiosResponse } from "axios";
import { client } from "../client";
import { apiErrorHandler } from "../errors";
import { ApiWorkout, ApiWorkoutToWorkout, WorkoutToApiWorkout } from "../types";

type AddWorkoutRequest = {
  userId: string;
  workout: ScheduledWorkout;
};

type RawGetWorkoutsResponse = {
  workouts: ApiWorkout[];
};

export function useAddWorkout() {
  const { user, setUser } = useStore();

  return useMutation(
    async (rawRequest: AddWorkoutRequest) => {
      try {
        const workout = WorkoutToApiWorkout(rawRequest.workout);
        const request = { workout };

        return (
          await client.post(`/users/${rawRequest.userId}/workouts`, request)
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
