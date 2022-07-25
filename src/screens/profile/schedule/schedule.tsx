import {
  Card, Heading, HStack, Text,
} from 'native-base';
import React from 'react';
import { ScheduledWorkout } from '../../../common';

interface Props {
  scheduledWorkouts: ScheduledWorkout[];
}

export function Schedule({ scheduledWorkouts }: Props) {
  return (
    <Card marginTop="1/6" padding="8">
      <Heading> Workout Schedule </Heading>
      {scheduledWorkouts.map((workout, i) => (
        <Card textAlign="center" padding="6" marginTop="5" key={workout.id}>
          <Heading size="sm"> {`Workout ${i + 1}`} </Heading>
          <Text> {workout.time.toLocaleDateString()} </Text>
          <Heading size="sm" marginTop="2"> Exercises: </Heading>
          {workout.activities.map((activity) => {
            if (activity.type === 'strength') {
              return (
                <HStack justifyContent="center">
                  <Text> {activity.name}: </Text>
                  <Text> {activity.sets} x {activity.reps} @ {activity.weight} </Text>
                </HStack>
              );
            }

            return (
              <HStack textAlign="center">
                <Text> {activity.name}: </Text>
                <Text> {activity.distance} km in {activity.duration} minutes </Text>
              </HStack>
            );
          })}
        </Card>
      ))}
    </Card>
  );
}
