import {
  Badge,
  Box,
  Card,
  Divider,
  Heading,
  ScrollView,
  Spinner,
  Text,
  useTheme,
  View,
  VStack,
} from "native-base";
import React from "react";
import {
  Activity,
  CardioData,
  CardioExercise,
  Workout,
  StrengthData,
  StrengthExercise,
} from "types";
import dateFormat from "dateformat";
import { useDeleteWorkout } from "api";
import { useStore } from "store";

interface Props {
  workout: Workout;
  footer: React.ReactNode | null;
}

export function WorkoutCard({ workout, footer }: Props) {
  const theme = useTheme();
  const { user } = useStore();
  const { isLoading, mutate } = useDeleteWorkout();

  const createContent = (activity: Activity, children: React.ReactNode) => (
    <Box key={activity.id} rounded="md" bgColor={theme.colors.primary[600]}>
      <Text padding="1"> {activity.name} </Text>
      <Box padding="2" roundedBottom="md" bgColor={theme.colors.primary[500]}>
        {children}
      </Box>
    </Box>
  );

  const createStrengthContent = (activity: StrengthExercise & StrengthData) => {
    const text = (
      <Text>
        {activity.sets} x {activity.reps} at {activity.weight}kg
      </Text>
    );

    return createContent(activity, text);
  };

  const createCardioContent = (activity: CardioExercise & CardioData) => {
    const text = (
      <Text>
        {activity.distance} km in {activity.duration} minutes
      </Text>
    );

    return createContent(activity, text);
  };

  return (
    <View>
      <VStack height="100%">
        <Badge
          onTouchStart={() =>
            mutate({ userId: user?.id ?? "-1", workoutId: workout.id })
          }
          bgColor={theme.colors.primary[600]}
          rounded="full"
          zIndex={1}
          variant="solid"
          alignSelf="flex-end"
          position="absolute"
          top="1"
          right="2"
          shadow="10"
        >
          {isLoading && <Spinner color={theme.colors.primary[300]} />}
          {!isLoading && <Text color={theme.colors.white}>Remove</Text>}
        </Badge>
        <Card
          backgroundColor={theme.colors.white}
          marginTop="4"
          height="100%"
          width={300}
        >
          <Heading
            justifyContent="center"
            textAlign="center"
            marginTop="1"
          >
            {workout.name}
          </Heading>
          <Text
            justifyContent="center"
            textAlign="center"
            marginBottom="1"
          >
            {dateFormat(new Date(workout.time), "dddd, mmmm dS")}
          </Text>
          <Divider marginTop="2" marginBottom="6" />
          <ScrollView>
            <VStack space={2}>
              {workout.activities.map((activity) => {
                switch (activity.type) {
                  case "strength":
                    return createStrengthContent(activity);
                  case "cardio":
                    return createCardioContent(activity);
                  default:
                    return null;
                }
              })}
            </VStack>
          </ScrollView>
          {footer && (
            <>
              <Divider marginTop="4" />
              {footer}
            </>
          )}
        </Card>
      </VStack>
    </View>
  );
}
