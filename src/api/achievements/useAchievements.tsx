import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Achievement } from "types";
import { client } from "../client";
import { handleError } from "../utilities";

type RawGetAchievementsResponse = {
  achievements: Achievement[];
};

type GetAchievementsResponse = Achievement[];

export function useAchievements(): UseQueryResult<GetAchievementsResponse, unknown> {
  return useQuery(["achievements"], async () => {
    try {
      return (await (await client.get("/Achievements")).data) as RawGetAchievementsResponse;
    } catch (error) {
      handleError(error);
    }
  });
}
