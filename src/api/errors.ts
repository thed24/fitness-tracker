import axios from "axios";
import { ApiError } from "types";

export function apiErrorHandler(err: unknown) {
  if (axios.isAxiosError(err)) {
    const apiError = err.response?.data as ApiError | undefined;
    throw apiError
      ? new Error(apiError.errors.join("\n"))
      : "An unknown error occurred";
  }

  throw err;
}
