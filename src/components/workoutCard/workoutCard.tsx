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
import { Activity, Workout } from "types";
import dateFormat from "dateformat";
import { useDeleteWorkout } from "api";
import { useStore } from "store";
import { titleCase } from "utils";
import Icon from "react-native-vector-icons/Ionicons";
import { Card } from "../card/card";
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
      <Text padding="1"> {activity.name} </Text>
      <Box padding="2" bgColor={theme.colors.primary[400]}>
        {children}
      </Box>
      <Box backgroundColor={theme.colors.primary[100]} roundedBottom="lg" p={1}>
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

        {workout.past || (!workout.past && workout.completed) && (
          <Badge side="left">
            {workout.completed && (
              <Icon
                name="ios-checkmark-sharp"
                size={20}
                color={theme.colors.white}
              />
            )}

            {!workout.completed && (
              <Icon
                name="ios-close-sharp"
                size={20}
                color={theme.colors.white}
              />
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
              <Divider marginTop={4} marginBottom={3} />
              {footer}
            </>
          )}
        </Card>
      </VStack>
    </View>
  );
}
