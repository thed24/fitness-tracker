/* eslint-disable consistent-return */
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../client";
import { handleError } from "../utilities";

type GetWorkoutData = {
  userId: string;
  order: "Ascending" | "Descending";
};

type GetWorkoutDataResponse = {
  workoutNames: string[];
};

export function useGetWorkoutNames({
  userId,
  order,
}: GetWorkoutData): UseQueryResult<GetWorkoutDataResponse, unknown> {
  return useQuery(
    ["orders", userId, order],
    async () => {
      try {
        return (
          await client.get(`/users/${userId}/WorkoutsNames`, {
            params: {
                order,
            },
          })
        ).data;
      } catch (error) {
        handleError(error);
      }
    }
  );
}
