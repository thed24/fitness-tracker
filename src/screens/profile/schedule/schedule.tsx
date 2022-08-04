import {
  Box,
  Card, Heading, HStack, Text,
} from 'native-base';
import React, { useMemo } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { ScheduledWorkout, Workout } from 'types';

interface Props {
  scheduledWorkouts: ScheduledWorkout[];
}

export function Schedule({ scheduledWorkouts }: Props) {
  const content = scheduledWorkouts.length > 0 ? (
    <Carousel
      width={300}
      height={300}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 35,
        parallaxAdjacentItemScale: 0.8,
      }}
      data={scheduledWorkouts}
      renderItem={({ item }) => (
        <Card height="5/6">
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
    <Text margin="4"> No workouts scheduled </Text>
  );

  return (
    <Box marginTop="1/6" textAlign="center">
      <Heading margin="4"> Workout Schedule </Heading>
      {content}
    </Box>
  );
}
