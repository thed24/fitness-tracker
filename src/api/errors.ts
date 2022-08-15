import axios, { AxiosError } from "axios";
import { ApiError } from "types";

export function apiErrorHandler(err: unknown) {
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
