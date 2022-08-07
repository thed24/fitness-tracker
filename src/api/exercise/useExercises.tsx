/* eslint-disable consistent-return */
import { useQuery, UseQueryResult } from "react-query";
import { Exercise } from "types";
import { client } from "../client";
import { apiErrorHandler } from "../errors";

type GetExercisesResponse = {
  exercises: Exercise[];
};

export function useExercises(): UseQueryResult<GetExercisesResponse, unknown> {
  return useQuery(["exercises"], async () => {
    try {
      return await (await client.get("/exercises")).data;
    } catch (error) {
      apiErrorHandler(error);
    }
  });
}
