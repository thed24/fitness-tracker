/* eslint-disable consistent-return */
import { useMutation, UseMutationResult } from "react-query";
import { User } from "types";
import { client } from "../client";
import { apiErrorHandler } from "../errors";

type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  buddyName: string;
  buddyDescription: string;
  buddyIconId: number;
  height: number;
  weight: number;
  age: number;
  benchPressMax: number | null;
  squatMax: number | null;
  deadliftMax: number | null;
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
