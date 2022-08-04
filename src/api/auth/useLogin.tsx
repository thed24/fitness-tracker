import { useMutation, UseMutationResult } from "react-query";
import { User } from "types";
import { client } from "../client";
import { apiErrorHandler } from "../errors";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: User;
};

export function useLogin(): UseMutationResult<
  LoginResponse,
  Error,
  LoginRequest,
  unknown
> {
  return useMutation(async (data) => {
    try { return (await client.post("/users/login", data)).data } 
    catch (error) { apiErrorHandler(error); }
  });
}
