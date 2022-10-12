import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Exercise } from "types";
import { client } from "../client";
import { handleError } from "../utilities";

type RawGetExercisesResponse = {
  exercises: Exercise[];
};

type GetExercisesResponse = Exercise[];

export function useExercises(): UseQueryResult<GetExercisesResponse, unknown> {
  return useQuery(["exercises"], async () => {
    try {
      const data = (await (await client.get("/exercises")).data) as RawGetExercisesResponse;

      return data.exercises.reduce((acc, curr) => {
        if (!acc.find((item) => item.name.toLowerCase() === curr.name.toLowerCase())) {
          acc.push(curr);
        }
        return acc;
      }, [] as Exercise[]);
    } catch (error) {
      handleError(error);
    }
  });
}
