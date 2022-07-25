import React, { useMemo } from 'react';
import {
  Text, Heading, Button, HStack, Card,
} from 'native-base';
import { NavigationProps } from '..';
import { useStore } from '../../store/store';
import { CompletedWorkout, ScheduledWorkout, Screen } from '../../common';
import { Footer, SelectedProfileTab } from './footer/footer';
import { History } from './history/history';
import { Schedule } from './schedule/schedule';

// eslint-disable-next-line no-unused-vars
export function ProfileScreen({ navigation }: NavigationProps) {
  const [selected, setSelected] = React.useState<SelectedProfileTab>('history');
  const { user, logout } = useStore();

  const pastWorkouts: CompletedWorkout[] = useMemo(() => {
    if (user) {
      return user.workouts.filter((workout) => workout.past) as CompletedWorkout[];
    }
    return [];
  }, [user]);

  const scheduledWorkouts: ScheduledWorkout[] = useMemo(() => {
    if (user) {
      return user.workouts.filter((workout) => !workout.past) as ScheduledWorkout[];
    }
    return [];
  }, [user]);

  const onLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <Screen loading={!user}>
      <Heading marginTop="10"> Welcome, {user.name}! </Heading>
      <Text> You are logged in as {user.email} </Text>

      {selected === 'history' && (<History pastWorkouts={pastWorkouts} />)}
      {selected === 'schedule' && (<Schedule scheduledWorkouts={scheduledWorkouts} />)}

      <HStack marginTop="30px" space="5">
        <Button onPress={onLogout}> Logout </Button>
        <Button onPress={() => {}}> Track New Workout </Button>
      </HStack>

      <Footer selected={selected} setSelected={setSelected} />
    </Screen>
  );
}
