import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryAxis,
} from "victory-native";
import React, { useMemo } from "react";
import {
  Card,
  Spinner,
  useTheme,
  Text,
  Select,
  Heading,
  VStack,
  HStack,
} from "native-base";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { useGetWorkoutData } from "api";
import { useStore } from "store";
import { CompletedWorkout, ExerciseType } from "types";

export function WorkoutChart() {
  const { user } = useStore();
  const theme = useTheme();

  const [workoutType, setWorkoutType] =
    React.useState<ExerciseType>("strength");
  const [selectedExercise, setSelectedExercise] = React.useState<string | null>(
    null
  );

  const { data: workoutData, isLoading: workoutDataLoading } =
    useGetWorkoutData({
      exerciseName: selectedExercise,
      userId: user?.id ?? "",
      workoutGraphType: "weight",
    });

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

  const content = useMemo(() => {
    if (workoutDataLoading) {
      return <Spinner />;
    }

    if (!workoutData || Object.keys(workoutData.data).length === 0) {
      return <Text marginLeft={4}> No workouts to graph </Text>;
    }

    if (!selectedExercise) {
      return <Text marginLeft={4}> Select an exercise to graph </Text>;
    }

    const highestValue = Math.max(...Object.values(workoutData.data));
    const chartData = Object.entries(workoutData.data).map(([key, value]) => ({
      x: (Number.parseInt(key, 10) + 1).toString(),
      y: value,
    }));

    return (
      <VictoryChart height={400} width={350} theme={VictoryTheme.material}>
        <Defs>
          {/*
          // @ts-ignore */}
          <LinearGradient id="gradient" x2="0" y2="1">
            <Stop
              offset="100%"
              stopColor={theme.colors.primary[500]}
              stopOpacity="0"
            />
            <Stop
              offset="50%"
              stopColor={theme.colors.primary[300]}
              stopOpacity="0.1"
            />
            <Stop
              offset="0%"
              stopColor={theme.colors.primary[500]}
              stopOpacity="0.2"
            />
          </LinearGradient>
        </Defs>
        <VictoryArea
          interpolation="natural"
          domain={{ y: [0, highestValue * 1.2] }}
          domainPadding={{ x: 2 }}
          minDomain={{ y: 1 }}
          style={{
            data: {
              fill: "url(#gradient)",
              strokeWidth: 3,
              stroke: theme.colors.primary[500],
            },
          }}
          data={chartData}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "transparent" },
            grid: { stroke: theme.colors.gray[300] },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 15 },
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            grid: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 15, padding: -20 },
          }}
        />
      </VictoryChart>
    );
  }, [
    workoutData,
    workoutDataLoading,
    theme.colors.gray,
    theme.colors.primary,
  ]);

  return (
    <Card
      w="90%"
      backgroundColor={theme.colors.white}
      marginBottom={4}
      marginTop={4}
      shadow={2}
    >
      <HStack>
        <Heading size="md" marginTop={4} marginLeft={4}>
          Workout Chart
        </Heading>

        <VStack w="55%" marginTop={1}>
          <Select
            textAlign="right"
            selectedValue={workoutType}
            variant="unstyled"
            onValueChange={(val) => setWorkoutType(val as ExerciseType)}
          >
            <Select.Item label="Strength" value="strength" />
            <Select.Item label="Cardio" value="cardio" />
          </Select>

          <Select
            textAlign="right"
            variant="unstyled"
            selectedValue={selectedExercise ?? ""}
            onValueChange={setSelectedExercise}
            placeholder="Select an exercise"
          >
            {exerciseNames.map((name) => (
              <Select.Item key={name} label={name} value={name} />
            ))}
          </Select>
        </VStack>
      </HStack>

      {content}
    </Card>
  );
}
