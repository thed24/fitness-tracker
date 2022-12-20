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
  maxes: Record<string, {reps: number, weight: number}>;
};

type RegisterRawResponse = {
  user: ApiUser;
};

export function useRegister() {
  const { setUserId, userId } = useStore();
  const navigation = useNavigation();

  return useMutation(
    async (request: RegisterRequest) => {
      const updatedRequest = {
        ...request,
        maxes: Object.entries(request.maxes).map(([k,v]) => ({
            exercise: k,
            reps: v.reps,
            weight: v.weight
          }))
      };
      const { data } = await client.post<RegisterRawResponse>("/users/register", updatedRequest);
      setUserId(data.user.id);
      return ApiUserToUser(data.user);
    },
    {
      onSuccess(response) {
        if (response) {
          queryClient.setQueryData(["user", userId], response);
          navigation.reset({ index: 0, routes: [{ name: "Drawer" as never }] });
        }
      },
    }
  );
}
