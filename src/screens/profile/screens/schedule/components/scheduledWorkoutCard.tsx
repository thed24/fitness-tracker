import {
  Box,
  Card,
  Divider,
  Heading,
  Text,
  useTheme,
  VStack,
} from "native-base";
import React from "react";
import Animated from "react-native-reanimated";
import {
  Activity,
  CardioData,
  CardioExercise,
  ScheduledWorkout,
  StrengthData,
  StrengthExercise,
} from "types";
import dateFormat from "dateformat";
import { Button } from "components";

interface Props {
  scheduledWorkout: ScheduledWorkout;
  onComplete: () => void;
}

export function ScheduledWorkoutCard({ scheduledWorkout, onComplete }: Props) {
  const theme = useTheme();

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
    <Animated.View>
      <Card backgroundColor={theme.colors.white} marginTop="4" width={300}>
        <Heading justifyContent="center" textAlign="center" marginTop="1" marginBottom="1">
          {dateFormat(new Date(scheduledWorkout.time), "dddd, mmmm dS")}
        </Heading>
        <Divider marginTop="2" marginBottom="6" />
        <VStack space={2}>
          {scheduledWorkout.activities.map((activity) => {
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
        <Divider marginTop="4" />
        <Button onPress={() => onComplete()} size="xl"> Complete Workout </Button>
      </Card>
    </Animated.View>
  );
}
