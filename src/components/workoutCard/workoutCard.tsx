import {
  Box,
  Divider,
  Heading,
  ScrollView,
  Text,
  useTheme,
  View,
  VStack,
  Card,
} from 'native-base';
import React, { useMemo, useState } from 'react';
import { Activity, Workout } from 'types';
import dateFormat from 'dateformat';
import { useDeleteWorkout, useGetUser } from 'api';
import Icon from 'react-native-vector-icons/Ionicons';
import { titleCase } from 'utils';
import { Badge } from '../badge/badge';
import { StrengthRow } from './components/strengthRow';
import { CardioRow } from './components/cardioRow';

interface Props {
  workout: Workout;
  footer: React.ReactNode | null;
}

export function WorkoutCard({ workout, footer }: Props) {
  const [deleting, setDeleting] = useState(false);

  const { data: user } = useGetUser();
  const { mutate: deleteWorkout } = useDeleteWorkout();
  const theme = useTheme();

  const createContent = (activity: Activity, children: React.ReactNode) => {
    const muscles = Object.keys(activity.muscleGroupStats).map((muscleGroup) =>
      titleCase(muscleGroup)
    );
    return (
      <Box key={activity.id}>
        <Text mt={2} textAlign="left" fontSize={18} fontWeight="bold">
          {' '}
          {activity.name} | {muscles}{' '}
        </Text>
        {children}
      </Box>
    );
  };

  const badges = useMemo(
    () =>
      (workout.past || workout.completed) && (
        <>
          {workout.completed && (
            <Badge side="right" background={false}>
              <Icon
                name="ios-checkmark-sharp"
                size={25}
                color={theme.colors.green[500]}
              />
            </Badge>
          )}

          {!workout.completed && (
            <Badge side="right" background={false}>
              <Icon
                name="ios-close-sharp"
                size={25}
                color={theme.colors.red[500]}
              />
            </Badge>
          )}
        </>
      ),
    [workout, theme.colors.green, theme.colors.red]
  );

  const footerContent = useMemo(
    () =>
      footer && (
        <>
          <Divider marginTop={4} marginBottom={3} bg={theme.colors.gray[200]} />
          {footer}
        </>
      ),
    [footer, theme.colors.gray]
  );

  const mainContent = useMemo(
    () => (
      <ScrollView>
        <VStack space={2}>
          {workout.activities.map((activity) => {
            switch (activity.type) {
              case 'strength':
                return createContent(
                  activity,
                  <StrengthRow
                    key={activity.id}
                    activity={activity}
                    workout={workout}
                  />
                );
              case 'cardio':
                return createContent(
                  activity,
                  <CardioRow
                    key={activity.id}
                    activity={activity}
                    workout={workout}
                  />
                );
              default:
                return null;
            }
          })}
        </VStack>
      </ScrollView>
    ),
    [workout]
  );

  return (
    <View>
      <VStack height="85%">
        <Badge
          side="left"
          loading={deleting}
          onClick={() => {
            setDeleting(true);
            deleteWorkout({ userId: user?.id ?? -1, workoutId: workout.id });
          }}
        >
          <Icon name="ios-trash-sharp" size={20} color={theme.colors.white} />
        </Badge>

        {badges}

        <Card accessibilityLabel="workout-card" height="90%" width={350}>
          <Heading justifyContent="center" textAlign="center" marginTop="1">
            {workout.name}
          </Heading>
          <Text justifyContent="center" textAlign="center" marginBottom="1">
            {dateFormat(new Date(workout.time), 'dddd, mmmm dS')}
          </Text>
          <Divider mt="4" mb="6" />

          {mainContent}

          {footerContent}

        </Card>
      </VStack>
    </View>
  );
}
