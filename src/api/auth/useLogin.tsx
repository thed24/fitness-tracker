import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { useNavigation } from "@react-navigation/native";
import { client } from "../client";
import { handleError } from "../utilities";
import { ApiUser, ApiUserToUser } from "../types";

type LoginRequest = {
  email: string;
  password: string;
};

type RawLoginResponse = {
  user: ApiUser;
};

export function useLogin() {
  const { setUser } = useStore();
  const navigation = useNavigation();

  return useMutation(
    async (data: LoginRequest) => {
      try {
        const rawResponse = (
          await client.post<RawLoginResponse>("/users/login", data)
        ).data;

        return ApiUserToUser(rawResponse.user);
      } catch (error) {
        handleError(error);
      }
    },
    {
      onSuccess(response) {
        if (response) {
          setUser(response);
          navigation.reset({ index: 0, routes: [{ name: "Profile" as never }] });
        }
      },
    }
  );
}
