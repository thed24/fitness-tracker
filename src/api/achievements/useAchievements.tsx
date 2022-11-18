import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Achievement } from "types";
import { client } from "../client";

type RawGetAchievementsResponse = {
  achievements: Achievement[];
};

type GetAchievementsResponse = Achievement[];

export function useAchievements(): UseQueryResult<GetAchievementsResponse, unknown> {
  return useQuery(["achievements"], async () => {
    const { data } = await client.get<RawGetAchievementsResponse>("/Achievements");
    return data.achievements;
  });
}
