import axios from "axios";

export interface ApiError {
  errors: string[];
}

export function apiErrorHandler(err: unknown) {
  if (axios.isAxiosError(err)) {
    const apiError = err.response?.data as ApiError | undefined;
    throw apiError
      ? new Error(apiError.errors.join("\n"))
      : "An unknown error occurred";
  }

  throw err;
}
