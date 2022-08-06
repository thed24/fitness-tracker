/* eslint-disable consistent-return */
import { useMutation, UseMutationResult } from "react-query";
import { User } from "types";
import { client } from "../client";
import { apiErrorHandler } from "../errors";

type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  confirmPassword: string;
  name: string;
  description: string;
  iconUrl: string;
};

type RegisterResponse = {
  user: User;
};

export function useRegister(): UseMutationResult<
  RegisterResponse,
  Error,
  RegisterRequest,
  unknown
> {
  return useMutation(async (data) => {
    try {
      return (await client.post("/users/register", data)).data;
    } catch (error) {
      apiErrorHandler(error);
    }
  });
}
