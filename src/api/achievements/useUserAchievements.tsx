import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UserAchievement } from "types";
import { client } from "../client";
import { handleError } from "../utilities";

type RawGetUserAchievementsResponse = {
  UserAchievements: UserAchievement[];
};

type GetUserAchievementsResponse = UserAchievement[];

type GetUserAchievements = {
  userId: number;
};

export function useUserAchievements({
  userId,
}: GetUserAchievements): UseQueryResult<GetUserAchievementsResponse, unknown> {
  return useQuery(["userAchievements", userId], async () => {
    try {
      return (await (await client.get(`Users/${userId}/Achievements`)).data) as RawGetUserAchievementsResponse;
    } catch (error) {
      handleError(error);
    }
  });
}
