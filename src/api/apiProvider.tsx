import * as React from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toast } from "native-base";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error instanceof Error) {
        Toast.show({
          title: "Error",
          placement: "top",
          description: error.message,
          duration: 5000,
        });
      } else if (error instanceof AxiosError) {
        Toast.show({
          title: "Error",
          placement: "top",
          description:
            error?.response?.data ??
            error.message ??
            "An unknown error has occured",
          duration: 5000,
        });
      } else {
        Toast.show({
          title: "Error",
          placement: "top",
          description: "An unknown error has occured",
          duration: 5000,
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
