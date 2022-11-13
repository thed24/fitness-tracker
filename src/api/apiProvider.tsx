import * as React from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

type ErrorResponse = {
  errors: string[];
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
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
