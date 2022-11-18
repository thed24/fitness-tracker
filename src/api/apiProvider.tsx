import * as React from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Toast } from 'native-base';
import { ApiError } from '../types/api';
import { log } from '../utils/helpers';
import { ToastBody } from '../components/toast/toast';

const onErrorHandler = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<ApiError>;
    const errorMessage = error?.response?.data
      ? error.response.data.errors.join('\n')
      : error.message;

    log(errorMessage, 'error');

    Toast.show({
      placement: 'top',
      description: errorMessage,
      render: () => (
        <ToastBody
          title="An error has occured"
          description="Please try again shortly!"
          variant="left-accent"
          colorScheme="error"
        />
      ),
    });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: onErrorHandler
  }),
  mutationCache: new MutationCache({
    onError: onErrorHandler
  })
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
