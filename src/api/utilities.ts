import axios, { AxiosError, AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import { ApiError, User } from 'types';
import { log } from 'utils';
import { client } from './client';
import { ApiUser, ApiUserToUser } from './types';

export function handleError(err: unknown) {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<ApiError>;
    const errorMessage = error?.response?.data
      ? error.response.data.errors.join('\n')
      : error.message;

    log(errorMessage, 'error');

    Toast.show({
      type: 'error',
      text1: 'An error has occured',
      text2: errorMessage,
    });

    throw new Error(errorMessage);
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
        ...ApiUserToUser(response.data.user),
      });
    })
    .catch((error) => {
      handleError(error);
    });
}
