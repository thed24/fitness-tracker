/* eslint-disable consistent-return */
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client } from "../client";
import { handleError } from "../utilities";

type GetWorkoutData = {
  userId: string;
  exerciseName: string;
  workoutGraphType: "reps" | "sets" | "weight" | "distance";
};

type GetWorkoutDataResponse = {
  data: Record<number, number>;
};

export function useGetWorkoutData({
  exerciseName,
  userId,
  workoutGraphType,
}: GetWorkoutData): UseQueryResult<GetWorkoutDataResponse, unknown> {
  return useQuery(
    ["orders", exerciseName, userId, workoutGraphType],
    async () => {
      try {
        return (
          await client.get(`/users/${userId}/workoutGraphData`, {
            params: {
              ExerciseName: exerciseName,
              WorkoutGraphType: workoutGraphType,
            },
          })
        ).data;
      } catch (error) {
        handleError(error);
      }
    }
  );
}
