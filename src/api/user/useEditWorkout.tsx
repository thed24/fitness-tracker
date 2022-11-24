import { useMutation } from "@tanstack/react-query";
import { Workout } from "types";
import { client } from "../client";
import { ApiData, ApiWorkout, ApiWorkoutToWorkout, WorkoutToApiWorkout } from "../types";
import { queryClient } from "../apiProvider";
import { useGetUser } from "./useGetUser";

type EditWorkoutRequest = {
  userId: number;
  workout: Workout;
};

type EditWorkoutPayload = {
  newData: Record<number, ApiData>;
  completed: boolean;
};

type EditWorkoutResponse = {
  workout: ApiWorkout;
};

export function useEditWorkout() {
  const { data: user } = useGetUser();

  return useMutation(
    async (rawRequest: EditWorkoutRequest) => {
      const workout = WorkoutToApiWorkout(rawRequest.workout, true);
      const payload: EditWorkoutPayload = {
        newData: workout.activities.reduce((acc, activity) => {
          acc[+activity.data.id] = activity.data;
          return acc;
        }, {} as Record<number, ApiData>),
        completed: workout.completed
      };

      const { data } = await client.put<EditWorkoutResponse>(`/users/${rawRequest.userId}/workouts/${rawRequest.workout.id}`, payload);
      return ApiWorkoutToWorkout(data.workout);
    },
    {
      onSuccess(response) {
        if (user && response) {
          queryClient.setQueryData(["user", user.id], { 
            ...user,
            workouts: user.workouts.map((workout) => {
              if (workout.id === response.id) {
                return response;
              }
              return workout;
            })
          });
          queryClient.invalidateQueries(["workoutData"]);
          queryClient.invalidateQueries(["userAchievements"]);
        }
      },
    }
  );
}
