import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "store";
import { client } from "../client";
import { ApiUser, ApiUserToUser } from "../types";
import { queryClient } from "../apiProvider";

type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  buddyName: string;
  height: number;
  weight: number;
  weightUnit: "kilograms" | "pounds";
  measurementUnit: "metric" | "imperial";
  age: number;
  benchPressMax: number | null;
  squatMax: number | null;
  deadliftMax: number | null;
};

type RegisterRawResponse = {
  user: ApiUser;
};

export function useRegister() {
  const { setUserId, userId } = useStore();
  const navigation = useNavigation();

  return useMutation(
    async (request: RegisterRequest) => {
      const { data } = await client.post<RegisterRawResponse>("/users/register", request);
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
