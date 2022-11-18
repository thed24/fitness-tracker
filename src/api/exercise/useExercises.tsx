import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Exercise } from 'types';
import { client } from '../client';
import { ApiExercise, ApiExerciseToExercise } from '../types';

type RawGetExercisesResponse = {
  exercises: ApiExercise[];
};

type GetExercisesResponse = Exercise[];

export function useExercises(): UseQueryResult<GetExercisesResponse, unknown> {
  return useQuery(['exercises'], async () => {
    const { data } = await client.get<RawGetExercisesResponse>('/exercises');
    return data.exercises.map(ApiExerciseToExercise);
  });
}
