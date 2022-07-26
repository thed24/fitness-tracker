import { Text, useTheme, View } from 'native-base';
import React from 'react';
import { Screen, Carousel } from 'components';
import { ScheduledWorkout } from 'types';
import { useEditWorkout, useGetUser } from 'api';
import { getScheduledWorkouts } from 'utils';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { ScheduledWorkoutCard } from './components/scheduledWorkoutCard';

export function Schedule() {
  const { isLoading: editLoading, mutate: editWorkout } = useEditWorkout();
  const naviagtion = useNavigation();
  const theme = useTheme();
  const { data: user } = useGetUser();

  const scheduledWorkouts = getScheduledWorkouts(user);

  if (!user) {
    return <Text>An error has occured, please sign out and try again.</Text>;
  }

  const renderItem = (item: ScheduledWorkout, index: number) => (
    <View margin="auto">
      <ScheduledWorkoutCard
        scheduledWorkout={item}
        onComplete={() =>
          editWorkout({
            userId: user.id,
            workout: { ...item, completed: true, past: true },
          })
        }
        key={index}
      />
    </View>
  );

  const content =
    scheduledWorkouts.length > 0 ? (
      <Carousel renderItem={renderItem} items={scheduledWorkouts} />
    ) : (
      <Text fontSize="md" mt={10}>
        No workouts scheduled
      </Text>
    );

  return (
    <Screen loading={editLoading}>
      {content}
      <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: theme.colors.primary[400] }}
        onPress={() => naviagtion.navigate('Create' as never)}
        color={theme.colors.white}
        mode="flat"
      />
    </Screen>
  );
}
