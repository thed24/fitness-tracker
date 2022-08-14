/* eslint-disable consistent-return */
import { useMutation } from "@tanstack/react-query";
import { Workout } from "types";
import { useStore } from "store";
import { AxiosResponse } from "axios";
import { client } from "../client";
import { apiErrorHandler } from "../errors";
import { ApiWorkout, ApiWorkoutToWorkout, WorkoutToApiWorkout } from "../types";

type EditWorkoutRequest = {
  userId: string;
  workout: Workout;
};

type RawEditWorkoutsResponse = {
  workouts: ApiWorkout[];
};

export function useEditWorkout() {
  const { user, setUser } = useStore();

  return useMutation(
    async (rawRequest: EditWorkoutRequest) => {
      try {
        const workout = WorkoutToApiWorkout(rawRequest.workout);
        const request = { workout };

        return (
          await client.put(`/users/${rawRequest.userId}/workouts/${rawRequest.workout.id}`, request)
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
            .then((response: AxiosResponse<RawEditWorkoutsResponse>) => {
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
