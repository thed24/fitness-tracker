/* eslint-disable consistent-return */
import { useMutation } from "react-query";
import { client } from "../client";
import { apiErrorHandler } from "../errors";
import { ApiUser, ApiUserToUser } from "../types";

type LoginRequest = {
  email: string;
  password: string;
};

type RawLoginResponse = {
  user: ApiUser;
};

export function useLogin() {
  return useMutation(async (data: LoginRequest) => {
    try {
      const rawResponse = (await client.post<RawLoginResponse>("/users/login", data)).data;
      return ApiUserToUser(rawResponse.user);
    } catch (error) {
      apiErrorHandler(error);
    }
  });
}
