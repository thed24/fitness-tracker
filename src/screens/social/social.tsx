import { Avatar, Button, Input, Screen } from 'components';
import React from 'react';
import { Card, Heading, HStack, Text } from 'native-base';
import { useGetUser, useGetUsers } from 'api';
import { User } from 'types';

export function SocialScreen() {
  const { data: users } = useGetUsers();
  const { data: user } = useGetUser();
  const [searchedUser, setSearchedUser] = React.useState<User | null>(null);
  const [search, setSearch] = React.useState('');

  if (!users) {
    return null;
  }

  const searchableUsers = users.filter((item) => item.id !== user?.id);
  
  return (
    <Screen>
      <HStack mt={5} alignItems="center" space={4}>
        <Input
          w="60%"
          placeholder="Search for friends"
          mx="auto"
          value={search}
          onChangeText={setSearch}
          type="text"
        />

        <Button onPress={() => setSearchedUser(searchableUsers.find((item) => item.username === search) ?? null)}>
          Search
        </Button>
      </HStack>

      {searchedUser && (
        <Card w="90%" mt={4} alignItems="center">
          <Heading size="md"> {searchedUser.username} </Heading>
          <Text> {searchedUser.title?.name ?? ''} </Text>
          <Avatar callback={() => null} user={searchedUser} size="sm" />
        </Card>
      )}
    </Screen>
  );
}
