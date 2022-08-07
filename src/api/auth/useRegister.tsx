import { useMutation } from "react-query";
import { client } from "../client";
import { apiErrorHandler } from "../errors";
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
  return useMutation(async (data: RegisterRequest) => {
    try {
      const rawResponse = (await client.post<RegisterRawResponse>("/users/register", data)).data;
      return ApiUserToUser(rawResponse.user);
    } catch (error) {
      apiErrorHandler(error);
    }
    return undefined;
  });
}
