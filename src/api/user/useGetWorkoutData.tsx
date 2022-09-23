import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../client";
import { handleError } from "../utilities";

type GetWorkoutData = {
  userId: number;
  exerciseName: string | null;
  workoutGraphType: "Reps" | "Sets" | "Weight" | "Distance";
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
  reps,
}: GetWorkoutData): UseQueryResult<GetWorkoutDataResponse, unknown> {
  return useQuery(
    ["orders", exerciseName, userId, workoutGraphType, reps],
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
              Reps: reps,
            },
          })
        ).data;
      } catch (error) {
        handleError(error);
      }
    }
  );
}
