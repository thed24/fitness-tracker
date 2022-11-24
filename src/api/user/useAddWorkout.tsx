import { useMutation } from "@tanstack/react-query";
import { ScheduledWorkout } from "types";
import { client } from "../client";
import { ApiData, ApiWorkout, ApiWorkoutToWorkout, WorkoutToApiWorkout } from "../types";
import { queryClient } from "../apiProvider";
import { useGetUser } from "./useGetUser";

type AddWorkoutRequest = {
  userId: number;
  workout: ScheduledWorkout;
};

type AddWorkoutResponse = {
  workout: ApiWorkout;
}

type AddWorkoutPayload = {
  name: string;
  activities: {
    exerciseId: number;
    data: ApiData;
  }[];
  completed: boolean;
  past: boolean;
  time: string;
};

export function useAddWorkout() {
  const { data: user } = useGetUser();
  
  return useMutation(
    async (rawRequest: AddWorkoutRequest) => {
      const workout = WorkoutToApiWorkout(rawRequest.workout, true);
      const payload: AddWorkoutPayload = {
        name: workout.name,
        activities: workout.activities.map((activity) => ({
          exerciseId: activity.exercise.id,
          data: activity.data,
        })),
        completed: workout.completed,
        past: workout.past,
        time: workout.time,
      };

      const { data } = await client.post<AddWorkoutResponse>(`/users/${rawRequest.userId}/workouts`, payload);
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
          queryClient.invalidateQueries(["workoutData", user.id]);
          queryClient.invalidateQueries(["userAchievements"]);
        }
      },
    }
  );
}
