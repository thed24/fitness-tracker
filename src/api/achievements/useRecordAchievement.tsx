import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../store/store";
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
  const { userId } = useStore();

  return useMutation(
    async (request: RecordAchievementRequest) => {
      const { data } = await client.post<RawRecordAchievementResponse>(`/Users/${request.userId}/RecordAchievement/${request.achievementId}`);
      return data.rewards;
    },
    {
      onSuccess() {
        if (userId) {
          queryClient.invalidateQueries(["user", userId]);
          queryClient.invalidateQueries(["userAchievements", userId]);
        }
      },
    }
  );
}
