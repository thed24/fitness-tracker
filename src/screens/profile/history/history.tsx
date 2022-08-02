import {
  Box,
  Card, Heading, HStack, Text,
} from 'native-base';
import React, { useMemo } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { CompletedWorkout, Workout } from 'common';

interface Props {
    workouts: Workout[];
}

export function History({ workouts }: Props) {
  const pastWorkouts: CompletedWorkout[] = useMemo(
    () => workouts.filter((workout) => workout.past) as CompletedWorkout[],
    [workouts],
  );

  const content = pastWorkouts.length > 0 ? (
    <Carousel
      width={350}
      height={350}
      mode="parallax"
      pagingEnabled
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 35,
        parallaxAdjacentItemScale: 0.8,
      }}
      data={pastWorkouts}
      renderItem={({ item }) => (
        <Card shadow="8" height="5/6">
          <Heading> Workout on {item.time.toLocaleDateString()} </Heading>
          <Heading size="md" margin="2"> Exercises </Heading>
          {item.activities.map((activity) => {
            switch (activity.type) {
              case 'strength':
                return (
                  <HStack justifyContent="center">
                    <Text> {activity.name}: </Text>
                    <Text> {activity.sets} x {activity.reps} at {activity.weight}kg </Text>
                  </HStack>
                );
              case 'cardio':
                return (
                  <HStack justifyContent="center">
                    <Text> {activity.name}: </Text>
                    <Text> {activity.distance} km in {activity.duration} minutes </Text>
                  </HStack>
                );
              default:
                return null;
            }
          })}
        </Card>
      )}
    />
  ) : (
    <Text margin="4"> No past workouts exist </Text>
  );

  return (
    <Box marginTop="1/6" textAlign="center">
      <Heading margin="4"> Workout History </Heading>
      {content}
    </Box>
  );
}
