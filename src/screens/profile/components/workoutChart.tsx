import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryAxis,
} from "victory-native";
import React, { useMemo } from "react";
import {
  Spinner,
  useTheme,
  Text,
  Select,
  Heading,
  VStack,
  HStack,
  Center,
} from "native-base";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { useGetWorkoutData } from "api";
import { useStore } from "store";
import {
  CompletedWorkout,
  ExerciseType,
  GraphType,
  StrengthData,
  StrengthExercise,
} from "types";
import { Card } from "components";
import { Dropdown } from "./workoutChart.styles";

export function WorkoutChart() {
  const [workoutType, setWorkoutType] =
    React.useState<ExerciseType>("strength");
  const [workoutGraphType, setWorkoutGraphType] =
    React.useState<GraphType>("reps");
  const [selectedExercise, setSelectedExercise] = React.useState<string | null>(
    null
  );
  const [reps, setReps] = React.useState<number>(0);

  const { user } = useStore();
  const theme = useTheme();

  const { data: workoutData, isLoading: workoutDataLoading } =
    useGetWorkoutData({
      exerciseName: selectedExercise,
      userId: user?.id ?? 0,
      workoutGraphType,
      reps,
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

  const options =
    workoutType === "strength" ? ["Reps", "Sets", "Weight"] : ["Distance"];

  const repCounts = useMemo(
    () => [
      ...new Set(
        completedWorkouts
          .flatMap((workout) => workout.activities)
          .filter(
            (exercise) =>
              exercise.name === selectedExercise && exercise.type === "strength"
          )
          .map((exercise) => exercise as StrengthExercise & StrengthData)
          .map((exercise) => exercise.reps)
      ),
    ],
    [completedWorkouts, selectedExercise]
  );

  const content = useMemo(() => {
    if (workoutDataLoading) {
      return <Spinner  mt={10} />;
    }

    if (
      !workoutData ||
      completedWorkouts
        .flatMap((workout) => workout.activities)
        .map((activity) => activity.type === workoutType).length === 0
    ) {
      return <Text mt={10}> No workouts to graph </Text>;
    }

    if (!selectedExercise) {
      return <Text mt={10}> Select an exercise to graph </Text>;
    }

    const highestValue = Math.max(
      ...workoutData.graphData.map((data) => data.exerciseMetaData)
    );

    const chartData = workoutData.graphData.map((data) => ({
      x: data.xAxis.toString(),
      y: data.exerciseMetaData,
      label: new Date(data.timeOfExercise).toLocaleDateString(),
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
    <Card w="90%" marginBottom={4} marginTop={4}>
      <HStack>
        <Heading size="md" marginTop={4}>
          Workout Chart
        </Heading>

        <VStack w="55%" marginTop={4} marginLeft={1}>
          <Dropdown
            selectedValue={workoutType}
            onValueChange={(val) => setWorkoutType(val as ExerciseType)}
          >
            <Select.Item label="Strength" value="strength" />
            <Select.Item label="Cardio" value="cardio" />
          </Dropdown>

          <Dropdown
            selectedValue={selectedExercise ?? ""}
            onValueChange={setSelectedExercise}
            isDisabled={!exerciseNames.length}
            placeholder="Select an exercise"
          >
            {exerciseNames.map((name) => (
              <Select.Item key={name} label={name} value={name} />
            ))}
          </Dropdown>

          <Dropdown
            selectedValue={workoutGraphType ?? ""}
            onValueChange={(val) => setWorkoutGraphType(val as GraphType)}
            isDisabled={!selectedExercise}
            placeholder="Select unit type"
          >
            {options.map((name) => (
              <Select.Item key={name} label={name} value={name} />
            ))}
          </Dropdown>

          {workoutType === "strength" &&
            selectedExercise !== null &&
            workoutGraphType.toLocaleLowerCase() === "weight" && (
              <Dropdown
                selectedValue={reps.toString()}
                onValueChange={(val) => setReps(Number(val))}
                placeholder="Select rep range"
              >
                {repCounts.map((count) => (
                  <Select.Item
                    key={count}
                    label={count.toString()}
                    value={count.toString()}
                  />
                ))}
              </Dropdown>
            )}
        </VStack>
      </HStack>

      <Center marginLeft="auto" marginRight="auto" marginTop={-8}>
        {content}
      </Center>
    </Card>
  );
}
