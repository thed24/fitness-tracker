import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Reward } from "../../types/domain";
import { client } from "../client";

type RecordAchievementRequest = {
  userId: number;
  achievementId: number;
};

type RawRecordAchievementResponse = {
  rewards: Reward[];
};

type RecordAchievementResponse = Reward[];

export function useRecordAchievement() {
  const queryClient = useQueryClient();

  return useMutation(
    async (request: RecordAchievementRequest) => {
      const { data } = await client.post<RawRecordAchievementResponse>(`/Users/${request.userId}/RecordAchievement/${request.achievementId}`);
      return data.rewards;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["userAchievements"]);
      },
    }
  );
}
