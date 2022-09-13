/* eslint-disable consistent-return */
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../client";
import { handleError } from "../utilities";

type GetWorkoutData = {
  userId: string;
  exerciseName: string | null;
  workoutGraphType: "reps" | "sets" | "weight" | "distance";
  reps: number;
};

type GetWorkoutDataResponse = {
  graphData: {
    xAxis: number;
    timeOfExercise: string;
    exerciseMetaData: number;
  }[]
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
        if (!exerciseName) {
          return { data: {} };
        }

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
