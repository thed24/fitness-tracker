import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { client } from '../client';

type GetWorkoutData = {
  userId: number;
  order: 'Ascending' | 'Descending';
};

type GetWorkoutDataResponse = {
  workoutNames: string[];
};

export function useGetWorkoutNames({
  userId,
  order,
}: GetWorkoutData): UseQueryResult<GetWorkoutDataResponse, unknown> {
  return useQuery(['workoutNames', userId, order], async () => {
    const { data } = await client.get<GetWorkoutDataResponse>(`/users/${userId}/WorkoutNames`, {
      params: {
        order,
      },
    });

    return data;
  });
}
