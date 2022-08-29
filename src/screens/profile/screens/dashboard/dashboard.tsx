import React, { useMemo } from "react";
import { Text, Heading, Box, Progress, Divider, useTheme } from "native-base";
import { useStore } from "store";
import { CompletedWorkout, NavigationProps } from "types";
import { Screen } from "components";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions, StyleSheet, View } from "react-native";
import { useGetWorkoutData } from "api";

export function Dashboard({ navigation }: NavigationProps) {
  const { user } = useStore();
  const theme = useTheme();
  const [chartedWorkouts, setChartedWorkouts] = React.useState<string>("");

  const { data: workoutData, refetch: getWorkoutdata } = useGetWorkoutData({
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
        ? user.workouts.filter((userFromState) => userFromState.completed)
        : []) as CompletedWorkout[],
    [user]
  );

  const { width } = Dimensions.get("window");
  const workoutOptions =
    completedWorkouts.length > 0 ? (
      <GestureHandlerRootView>
        <Carousel
          width={width / 1.4}
          height={width / 6}
          scrollAnimationDuration={1000}
          data={completedWorkouts.flatMap((workout) =>
            workout.activities.map((activity) => activity.name)
          )}
          renderItem={({ item, index }) => (
            <Box
              rounded="lg"
              borderRadius="sm"
              borderColor={theme.colors.blue[700]}
              backgroundColor={theme.colors.blue[300]}
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff",
    },
  });

  const createGraphs = () =>
    workoutData && Object.keys(workoutData.data).length > 0 ? (
      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar
            data={Object.entries(workoutData.data).map(([key, value]) => ({
              x: key,
              y: value,
            }))}
            x="workout"
            y="weight"
          />
        </VictoryChart>
      </View>
    ) : (
      <Text> No workouts to graph </Text>
    );

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
    <Screen loading={!user}>
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
