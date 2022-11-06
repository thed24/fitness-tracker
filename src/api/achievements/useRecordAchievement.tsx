import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { Reward } from "../../types/domain";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";

type RecordAchievementRequest = {
  userId: number;
  achievementId: number;
};

type RecordAchievementResponse = {
  rewards: Reward[];
};

export function useRecordAchievement() {
  const { user, setUser } = useStore();

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
        if (user) {
          updateUser(user, setUser);
        }
      },
    }
  );
}
