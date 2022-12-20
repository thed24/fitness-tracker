import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useStore } from 'store';
import { User } from 'types';
import { client } from '../client';
import { ApiUser, ApiUserToUser } from '../types';

type GetUserRawResponse = {
  user: ApiUser;
};

type GetUserResponse = User | undefined;

export function useGetUser(): UseQueryResult<GetUserResponse, unknown> {
  const { userId, setUserId } = useStore();

  return useQuery(['user', userId], async () => {
      if (!userId) {
        return undefined;
      }

      const { data } = await client.get<GetUserRawResponse>(`/users/${userId}`);
      console.log('data', data.user.maxes);
      setUserId(data.user.id);
      return ApiUserToUser(data.user);
    }
  );
}
