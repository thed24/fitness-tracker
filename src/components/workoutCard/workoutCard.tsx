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
    <Box rounded={12} key={activity.id} bgColor={theme.colors.primary[600]}>
      <Text mt={2} textAlign="center" fontSize={18} fontWeight="bold"> {activity.name} </Text>
      {children}
      <HStack>
        <Box my={2} p={1} bg={theme.colors.primary[200]} w="100%">
          {Object.keys(activity.muscleGroupStats).map((muscleGroup, i) => (
              <Text key={`${muscleGroup}-${activity.id}`} textAlign="center">{titleCase(muscleGroup)}{i < Object.keys(activity.muscleGroupStats).length - 1 ? ", " : ""}</Text>
          ))}
        </Box>
      </HStack>
    </Box>
  );

  return (
    <View>
      <VStack height="100%">
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

        {(workout.past || workout.completed) && (
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
          )}

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
                      <StrengthRow key={activity.id} activity={activity} workout={workout} />
                    );
                  case "cardio":
                    return createContent(
                      activity,
                      <CardioRow key={activity.id} activity={activity} workout={workout} />
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
