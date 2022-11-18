import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { client } from '../client';

type GetWorkoutData = {
  userId: number;
  exerciseName: string | null;
  workoutGraphType: 'Reps' | 'Sets' | 'Weight' | 'Distance';
  reps: number;
};

type GetWorkoutDataResponse = {
  graphData: {
    xAxis: number;
    timeOfExercise: string;
    exerciseMetaData: number;
  }[];
};

export function useGetWorkoutData({
  exerciseName,
  userId,
  workoutGraphType,
  reps,
}: GetWorkoutData): UseQueryResult<GetWorkoutDataResponse, unknown> {
  return useQuery(
    ['workoutData', exerciseName, userId, workoutGraphType, reps], async () => {
      if (!exerciseName) {
        return { data: {} };
      }

      const { data } = await client.get(`/users/${userId}/workoutGraphData`, {
        params: {
          ExerciseName: exerciseName,
          WorkoutGraphType: workoutGraphType,
          Reps: reps,
        },
      });

      return data;
    }
  );
}
