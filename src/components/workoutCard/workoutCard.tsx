import {
  Box,
  Divider,
  Heading,
  HStack,
  ScrollView,
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
import { titleCase } from "utils";
import Icon from "react-native-vector-icons/Ionicons";
import { Card } from "../card/card";
import { Badge } from "../badge/badge";

interface Props {
  workout: Workout;
  footer: React.ReactNode | null;
}

export function WorkoutCard({ workout, footer }: Props) {
  const theme = useTheme();
  const [deleting, setDeleting] = React.useState(false);
  const { user, getWeightFormatter, getWeasurementFormatter } = useStore();
  const { mutate } = useDeleteWorkout();

  const weightFormatter = getWeightFormatter();
  const measurementFormatter = getWeasurementFormatter();

  const createContent = (activity: Activity, children: React.ReactNode) => (
    <Box key={activity.id} rounded="lg" bgColor={theme.colors.primary[600]}>
      <Text padding="1"> {activity.name} </Text>
      <Box padding="2" bgColor={theme.colors.primary[400]}>
        {children}
      </Box>
      <Box
          backgroundColor={theme.colors.primary[100]}
          roundedBottom="lg"
          p={1}
        >
          <HStack>
            {Object.entries(activity.muscleGroupStats).map(
              ([muscleGroup, stats]) => (
                <Text key={muscleGroup}>
                  {titleCase(muscleGroup)} +{stats}
                </Text>
              )
            )}
          </HStack>
        </Box>
    </Box>
  );

  const createStrengthContent = (activity: StrengthExercise & StrengthData) => {
    const text = (
      <Text my="auto">
        {weightFormatter(
          `${activity.sets} x ${activity.reps} at ${activity.weight}`,
          false
        )}
      </Text>
    );

    return createContent(activity, text);
  };

  const createCardioContent = (activity: CardioExercise & CardioData) => {
    const text = (
        <Text>
          {measurementFormatter(
            `${activity.distance} km in ${activity.duration} minutes`,
            false
          )}
        </Text>
    );

    return createContent(activity, text);
  };

  return (
    <View>
      <VStack height="100%">
        <Badge
          side="right"
          loading={deleting}
          onClick={() => {
            setDeleting(true);
            mutate({ userId: user?.id ?? -1, workoutId: workout.id });
          }}
        >
          <Icon name="ios-trash-sharp" size={20} color={theme.colors.white} />
        </Badge>

        {workout.past && (
          <Badge
            side="left"
          >
            {workout.completed && (
              <Icon name="ios-checkmark-sharp" size={20} color={theme.colors.white} />
            )}
            
            {!workout.completed && (
              <Icon name="ios-close-sharp" size={20} color={theme.colors.white} />
            )}
          </Badge>
        )}

        <Card
          backgroundColor={theme.colors.white}
          marginTop="4"
          height="100%"
          width={300}
        >
          <Heading justifyContent="center" textAlign="center" marginTop="1">
            {workout.name}
          </Heading>
          <Text justifyContent="center" textAlign="center" marginBottom="1">
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
