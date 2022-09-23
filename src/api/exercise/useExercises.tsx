import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Exercise } from "types";
import { client } from "../client";
import { handleError } from "../utilities";

type GetExercisesResponse = {
  exercises: Exercise[];
};

export function useExercises(): UseQueryResult<GetExercisesResponse, unknown> {
  return useQuery(["exercises"], async () => {
    try {
      return await (await client.get("/exercises")).data;
    } catch (error) {
      handleError(error);
    }
  });
}
