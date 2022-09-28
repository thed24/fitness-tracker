import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiError, User } from "types";
import { log } from "utils";
import { client } from "./client";
import { ApiUser, ApiUserToUser } from "./types";

export function handleError(err: unknown) {
  log(err, "error");

  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<ApiError>;
    throw error?.response?.data
      ? new Error(error.response.data.errors.join("\n"))
      : new Error(error.message);
  }

  throw err;
}

type RawGetUserResponse = {
  user: ApiUser;
};

export function updateUser(
  currentUser: User,
  setUser: (updatedUser: User) => void
) {
  client
    .get(`/users/${currentUser.id}`)
    .then((response: AxiosResponse<RawGetUserResponse>) => {
      log(response);
      setUser({
        ...ApiUserToUser(response.data.user)
      });
    })
    .catch((error) => {
      handleError(error);
    });
}
