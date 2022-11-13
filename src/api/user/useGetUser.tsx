import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useStore } from "store";
import { User } from "types";
import { client } from "../client";
import { handleError, updateUser } from "../utilities";

type GetUserRequest = {
  userId: number;
};

type GetUserResponse = {
  user: User;
};

export function useGetUser({
  userId,
}: GetUserRequest): UseQueryResult<GetUserResponse, unknown> {
  const { setUser } = useStore();

  return useQuery(
    ["userId", userId],
    async () => {
      try {
        return (
          await client.get(`/users/${userId}`)
        ).data;
      } catch (error) {
        handleError(error);
      }
    },
    {
      onSuccess(response) {
        if (response.user) {
          updateUser(response.user, setUser);
        }
      },
    }
  );
}
