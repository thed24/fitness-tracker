import React, { useMemo } from "react";
import { Text, Heading, Box, Progress, Divider, useTheme, Spinner } from "native-base";
import { useStore } from "store";
import { CompletedWorkout, NavigationProps } from "types";
import { Screen } from "components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { useGetWorkoutData } from "api";
import { WorkoutChart } from "./components/workoutChart";

export function Dashboard({ navigation }: NavigationProps) {
  const { user } = useStore();
  const theme = useTheme();
  const [chartedWorkouts, setChartedWorkouts] = React.useState<string>("");

  const {
    data: workoutData,
    isLoading: workoutDataLoading,
    isError: workoutDataError,
    refetch: getWorkoutdata,
  } = useGetWorkoutData({
    exerciseName: chartedWorkouts,
    userId: user?.id ?? "",
    workoutGraphType: "weight",
  });

  if (user === null) {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    return <Text> Hold on, we&apos;re moving you </Text>;
  }

  const completedWorkouts = useMemo(
    () =>
      (user
        ? user.workouts.filter((workout) => workout.completed || workout.past)
        : []) as CompletedWorkout[],
    [user]
  );

  const exerciseNames = useMemo(
    () =>
      completedWorkouts
        .flatMap((workout) => workout.activities)
        .map((exercise) => exercise.name)
        .filter((name, index, self) => self.indexOf(name) === index),
    [completedWorkouts]
  );

  const { width } = Dimensions.get("window");
  const workoutOptions =
    completedWorkouts.length > 0 ? (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Carousel
          snap
          width={width}
          height={width / 6}
          scrollAnimationDuration={1000}
          data={exerciseNames}
          renderItem={({ item, index }) => (
            <Box
              rounded="lg"
              borderRadius="sm"
              borderWidth={2}
              borderColor={theme.colors.primary[700]}
              backgroundColor={theme.colors.primary[500]}
              padding={2}
              margin="auto"
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                onPress={() => {
                  setChartedWorkouts(item);
                  getWorkoutdata();
                }}
              >
                {item}
              </Text>
            </Box>
          )}
        />
      </GestureHandlerRootView>
    ) : (
      <Text> No workouts to graph </Text>
    );

  const createGraphs = () => {
    if (workoutDataLoading && !workoutDataError) {
      return <Spinner> Loading... </Spinner>;
    }

    return workoutData && Object.keys(workoutData.data).length > 0 ? (
      <WorkoutChart data={workoutData.data} />
    ) : (
      <Text> No workouts to graph </Text>
    );
  };

  const createStats = (name: string, state: number) => (
    <Box w="80%" marginTop="2" key={name}>
      <Text>
        {name}: {state} / 10
      </Text>
      <Progress
        borderWidth="2"
        borderColor={theme.colors.coolGray[600]}
        bg={theme.colors.coolGray[400]}
        value={state}
        max={10} // should be upper level range
        mx={4}
        size="md"
      />
    </Box>
  );

  return (
    <Screen scrollable loading={!user}>
      <Heading marginTop="10"> Welcome, {user.firstName}! </Heading>

      <Text fontSize="md" fontWeight="semibold">
        Its time to get your workout on!
      </Text>

      <Divider marginTop="4" w="3/4" bg="gray.400" />

      <Text fontSize="md" fontWeight="bold" marginTop="10">
        Progress
      </Text>

      <Text fontSize="md">
        &quot;Hows your day going?&quot; - {user.workoutBuddy.name}
      </Text>
      {createStats("Speed", user.workoutBuddy.data.speed)}
      {createStats("Strength", user.workoutBuddy.data.strength)}

      <Text fontSize="md" fontWeight="bold" marginTop="10">
        Exercise Progression
      </Text>
      {workoutOptions}
      {createGraphs()}
    </Screen>
  );
}
