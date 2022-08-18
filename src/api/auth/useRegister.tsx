import { useMutation } from "@tanstack/react-query";
import { useStore } from "store";
import { useNavigation } from "@react-navigation/native";
import { client } from "../client";
import { handleError } from "../utilities";
import { ApiUser, ApiUserToUser } from "../types";

type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  confirmPassword: string;
};

type RegisterRawResponse = {
  user: ApiUser;
};

export function useRegister() {
  const { setUser } = useStore();
  const navigation = useNavigation();

  return useMutation(
    async (data: RegisterRequest) => {
      try {
        const rawResponse = (
          await client.post<RegisterRawResponse>("/users/register", data)
        ).data;
        return ApiUserToUser(rawResponse.user);
      } catch (error) {
        handleError(error);
      }
      return undefined;
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
