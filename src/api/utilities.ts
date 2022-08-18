import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiError, User } from "types";
import { client } from "./client";
import { ApiUser, ApiUserToUser } from "./types";

export function handleError(err: unknown) {
  try {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError<ApiError>;

      throw error?.response?.data
        ? new Error(error.response.data.errors.join("\n"))
        : new Error(error.message);
    }
  } catch (e) {
    throw new Error("Something went wrong, please try again!");
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
      setUser({
        ...ApiUserToUser(response.data.user)
      });
    })
    .catch((error) => {
      handleError(error);
    });
}
