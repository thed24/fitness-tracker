import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "store";
import { client } from "../client";
import { ApiUser, ApiUserToUser } from "../types";
import { queryClient } from "../apiProvider";

type LoginRequest = {
  email: string;
  password: string;
};

type RawLoginResponse = {
  user: ApiUser;
};

export function useLogin() {
  const { setUserId, userId } = useStore();
  const navigation = useNavigation();

  return useMutation(
    async (request: LoginRequest) => {
      const { data } = await client.post<RawLoginResponse>("/users/login", request);
      setUserId(data.user.id);
      return ApiUserToUser(data.user);
    },
    {
      onSuccess(response) {
        if (response) {
          queryClient.setQueryData(["user", userId], response);
          navigation.reset({ index: 0, routes: [{ name: "Profile" as never }] });
        }
      },
    }
  );
}
