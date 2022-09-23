import {
  Badge,
  Box,
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
import { Card } from "../card/card";

interface Props {
  workout: Workout;
  footer: React.ReactNode | null;
}

export function WorkoutCard({ workout, footer }: Props) {
  const theme = useTheme();
  const [deleting, setDeleting] = React.useState(false);
  const { user, weightFormatter, measurementFormatter } = useStore();
  const { mutate } = useDeleteWorkout();

  const createContent = (activity: Activity, children: React.ReactNode) => (
    <Box key={activity.id} rounded="md" bgColor={theme.colors.primary[600]}>
      <Text padding="1"> {activity.name} </Text>
      <Box padding="2" roundedBottom="md" bgColor={theme.colors.primary[400]}>
        {children}
      </Box>
    </Box>
  );

  const createStrengthContent = (activity: StrengthExercise & StrengthData) => {
    const text = (
      <Text>
        {weightFormatter(`${activity.sets} x ${activity.reps} at ${activity.weight}`, false)}
      </Text>
    );

    return createContent(activity, text);
  };

  const createCardioContent = (activity: CardioExercise & CardioData) => {
    const text = (
      <Text>
        {measurementFormatter(`${activity.distance} km in ${activity.duration} minutes`, false)}
      </Text>
    );

    return createContent(activity, text);
  };

  return (
    <View>
      <VStack height="100%">
        <Badge
          onTouchStart={() => {
            setDeleting(true);
            mutate({ userId: user?.id ?? -1, workoutId: workout.id })
          }}
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
          {deleting && <Spinner color={theme.colors.primary[300]} />}
          {!deleting && <Text color={theme.colors.white}>Remove</Text>}
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
              <Divider marginTop={4} marginBottom={3} />
              {footer}
            </>
          )}
        </Card>
      </VStack>
    </View>
  );
}
