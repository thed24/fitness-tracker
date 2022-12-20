import { useGetUser } from 'api';
import { Button, FormLabel } from 'components';
import { Box, Card, HStack, Heading, Text, VStack, View } from 'native-base';
import React, { useMemo } from 'react';
import {
  CardioData,
  CardioExercise,
  StrengthData,
  StrengthExercise,
} from 'types';
import { getDistanceFormatter, getWeightFormatter } from 'utils';
import { ActionButton } from '../components/actionButton';
import { IncrementBar } from '../components/incrementBar';
import { CreateWorkoutProps } from '../createWorkout';

export function WorkoutDetails({ form }: CreateWorkoutProps) {
  const { activity } = form.values;
  const { data: user } = useGetUser();

  const distanceFormatter = getDistanceFormatter(user);
  const weightFormatter = getWeightFormatter(user);

  const max = useMemo(
    () => user?.maxes?.find((curr) => curr.exercise === activity?.name),
    [activity?.name, user?.maxes]
  );

  const activitySpecificFields = useMemo(() => {
    const handleActivityUpdate = (field: string) => (value: string) => {
      if (activity) {
        const stringAsNumber = parseInt(value, 10);
        form.setFieldValue('activity', {
          ...activity,
          [field]: stringAsNumber,
        });
      }
    };

    const createCardioFields = (
      cardioActivity: CardioData & CardioExercise
    ) => (
      <Box mb={4}>
        <IncrementBar
          name={distanceFormatter('Distance')}
          increments={[5, 1, -1, -5]}
          value={cardioActivity.targetDistance}
          onChange={handleActivityUpdate('targetDistance')}
        />

        <IncrementBar
          name="Duration"
          increments={[5, 1, -1, -5]}
          value={cardioActivity.targetDuration}
          onChange={handleActivityUpdate('targetDuration')}
        />
      </Box>
    );

    const createWeightFields = (
      strengthActivity: StrengthData & StrengthExercise
    ) => (
      <Box>
        <IncrementBar
          name="Sets"
          increments={[3, 1, -1, -3]}
          value={strengthActivity.targetSets}
          onChange={handleActivityUpdate('targetSets')}
        />
        <IncrementBar
          name="Reps"
          increments={[5, 1, -1, -5]}
          value={strengthActivity.targetReps}
          onChange={handleActivityUpdate('targetReps')}
        />
        <IncrementBar
          name={weightFormatter('Weight')}
          increments={[50, 10, -10, -50]}
          value={strengthActivity.targetWeight}
          onChange={handleActivityUpdate('targetWeight')}
          titleAccessory={
            <ActionButton
              title="Set as bodyweight"
              onPress={() =>
                handleActivityUpdate('targetWeight')(
                  user?.weight?.toString() ?? '0'
                )
              }
            />
          }
        />
      </Box>
    );

    if (activity) {
      switch (activity.type) {
        case 'strength':
          return createWeightFields(activity);
        case 'cardio':
          return createCardioFields(activity);
        default:
          return null;
      }
    }
    return null;
  }, [activity, distanceFormatter, form, user?.weight, weightFormatter]);

  const maxFields = useMemo(() => (
    <View>
      <Heading size="md" mt={2}>
        Training Maxes
      </Heading>
      {!max && (<Text>Not enough data is present to estimate your training maxes</Text>)}
      {max && (
        <>
          <Text mb={2}>
            {`We have estimated your one rep max to be ${weightFormatter(max.estimatedOneRepMax.toString())}. You can set your weight to percentages of this max below:`}
          </Text>
          <HStack mt={2} justifyContent="space-between">
            <VStack alignItems="center">
              <Button onPress={() =>form.setFieldValue('activity', {...activity,targetWeight: max.estimatedOneRepMax,})}>
                100%  
              </Button>
              <Text>1 Rep</Text>
            </VStack>
            <VStack alignItems="center">
              <Button onPress={() =>form.setFieldValue('activity', {...activity,targetWeight: max.estimatedOneRepMax * 0.9,})}>
                90% 
              </Button>
              <Text>3 Reps</Text>
            </VStack>
            <VStack alignItems="center">
              <Button onPress={() =>form.setFieldValue('activity', {...activity,targetWeight: max.estimatedOneRepMax * 0.8,})}>
                80% 
              </Button>
              <Text>5 Reps</Text>
            </VStack>
            <VStack alignItems="center">
              <Button onPress={() =>form.setFieldValue('activity', {...activity,targetWeight: max.estimatedOneRepMax * 0.75,})}>
                75% 
              </Button>
              <Text>8-12 Reps</Text>
            </VStack>
          </HStack>
        </>
      )}
    </View>
  ), [activity, form, max, weightFormatter]);

  if (!user || !activity) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card mt={4}>
      <FormLabel fontWeight="bold" fontSize={24}>
        {activity.name}
      </FormLabel>
      {activitySpecificFields}
      {maxFields}
    </Card>
  );
}
