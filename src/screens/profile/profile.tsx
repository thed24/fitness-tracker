import React from 'react';
import {
  Text, Heading, Button, HStack,
} from 'native-base';
import { Screen } from 'common';
import { useStore } from 'store';
import { NavigationProps } from '..';
import { Footer, SelectedProfileTab } from './footer/footer';
import { History } from './history/history';
import { Schedule } from './schedule/schedule';

// eslint-disable-next-line no-unused-vars
export function ProfileScreen({ navigation }: NavigationProps) {
  const [selected, setSelected] = React.useState<SelectedProfileTab>('history');
  const { user, logout } = useStore();

  const onLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <Screen loading={!user}>
      <Heading marginTop="10"> Welcome, {user?.name}! </Heading>
      <Text> You are logged in as {user?.email} </Text>

      {selected === 'history' && (
        <>
          <History workouts={user?.workouts ?? []} />
          <HStack position="absolute" bottom="20" marginTop="30px" space="5">
            <Button onPress={onLogout}> Logout </Button>
          </HStack>
        </>
      )}

      {selected === 'schedule' && (
        <>
          <Schedule workouts={user?.workouts ?? []} />
          <HStack position="absolute" bottom="20" marginTop="30px" space="5">
            <Button onPress={onLogout}> Logout </Button>
            <Button onPress={() => {}}> Schedule New Workout </Button>
          </HStack>
        </>
      )}

      <Footer selected={selected} setSelected={setSelected} />
    </Screen>
  );
}
