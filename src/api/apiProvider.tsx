import * as React from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from 'react-native-toast-message';

type ErrorResponse = {
  errors: string[];
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      } else if (error instanceof AxiosError<ErrorResponse>) {
        Toast.show({
          type: "error",
          text1:
            (error?.response?.data as ErrorResponse)?.errors?.join(", ") ??
            error.message ??
            "An unknown error has occured",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "An unknown error has occured",
        });
      }
    },
  }),
});

export default function APIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
