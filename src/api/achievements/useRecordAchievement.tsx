import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Reward } from "../../types/domain";
import { client } from "../client";
import { handleError } from "../utilities";

type RecordAchievementRequest = {
  userId: number;
  achievementId: number;
};

type RecordAchievementResponse = {
  rewards: Reward[];
};

export function useRecordAchievement() {
  const queryClient = useQueryClient();

  return useMutation(
    async (request: RecordAchievementRequest) => {
      try {
        return (
          await client.post<RecordAchievementResponse>(`/Users/${request.userId}/RecordAchievement/${request.achievementId}`)
        ).data;
      } catch (error) {
        handleError(error);
      }
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["userAchievements"]);
      },
    }
  );
}
