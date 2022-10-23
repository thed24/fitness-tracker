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
  Card,
} from "native-base";
import React from "react";
import { Activity, Workout } from "types";
import dateFormat from "dateformat";
import { useDeleteWorkout } from "api";
import { useStore } from "store";
import { titleCase } from "utils";
import Icon from "react-native-vector-icons/Ionicons";
import { Badge } from "../badge/badge";
import { StrengthRow } from "./components/strengthRow";
import { CardioRow } from "./components/cardioRow";

interface Props {
  workout: Workout;
  footer: React.ReactNode | null;
}

export function WorkoutCard({ workout, footer }: Props) {
  const [deleting, setDeleting] = React.useState(false);
  const { user } = useStore();
  const { mutate: deleteWorkout } = useDeleteWorkout();

  const theme = useTheme();

  const createContent = (activity: Activity, children: React.ReactNode) => (
    <Box key={activity.id} rounded="lg" bgColor={theme.colors.primary[600]}>
      <Text p={1}> {activity.name} </Text>
      <Box p={2} bgColor={theme.colors.primary[400]}>
        {children}
      </Box>
      <Box px={2} py={1} backgroundColor={theme.colors.primary[100]} roundedBottom="lg">
        <HStack>
          {Object.keys(activity.muscleGroupStats).map((muscleGroup, i) => (
            <Text key={muscleGroup}>
              {titleCase(muscleGroup)}{i < Object.keys(activity.muscleGroupStats).length - 1 ? ", " : ""}
            </Text>
          ))}
        </HStack>
      </Box>
    </Box>
  );

  return (
    <View>
      <VStack height="100%">
        <Badge
          side="right"
          loading={deleting}
          onClick={() => {
            setDeleting(true);
            deleteWorkout({ userId: user?.id ?? -1, workoutId: workout.id });
          }}
        >
          <Icon name="ios-trash-sharp" size={20} color={theme.colors.white} />
        </Badge>

        {workout.past ||
          (!workout.past && workout.completed && (
            <>
              {workout.completed && (
                <Badge side="left">
                  <Icon
                    name="ios-checkmark-sharp"
                    size={20}
                    color={theme.colors.white}
                  />
                </Badge>
              )}

              {!workout.completed && (
                <Badge side="left">
                  <Icon
                    name="ios-close-sharp"
                    size={20}
                    color={theme.colors.white}
                  />
                </Badge>
              )}
            </>
          ))}

        <Card
          accessibilityLabel="workout-card"
          backgroundColor={theme.colors.white}
          height="100%"
          width={300}
        >
          <Heading justifyContent="center" textAlign="center" marginTop="1">
            {workout.name}
          </Heading>
          <Text justifyContent="center" textAlign="center" marginBottom="1">
            {dateFormat(new Date(workout.time), "dddd, mmmm dS")}
          </Text>
          <Divider mt="4" mb="6" />
          <ScrollView>
            <VStack space={2}>
              {workout.activities.map((activity) => {
                switch (activity.type) {
                  case "strength":
                    return createContent(
                      activity,
                      <StrengthRow activity={activity} workout={workout} />
                    );
                  case "cardio":
                    return createContent(
                      activity,
                      <CardioRow activity={activity} workout={workout} />
                    );
                  default:
                    return null;
                }
              })}
            </VStack>
          </ScrollView>
          {footer && (
            <>
              <Divider
                marginTop={4}
                marginBottom={3}
                bg={theme.colors.gray[200]}
              />
              {footer}
            </>
          )}
        </Card>
      </VStack>
    </View>
  );
}
