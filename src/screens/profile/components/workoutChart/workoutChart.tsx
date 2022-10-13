import {
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
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
import { ExerciseType, GraphType, StrengthData, StrengthExercise } from "types";
import { Card } from "components";
import { Dropdown } from "./workoutChart.styles";

export function WorkoutChart() {
  const [reps, setReps] = React.useState<number>(0);
  const [workoutType, setWorkoutType] = React.useState<ExerciseType | null>("strength");
  const [workoutGraphType, setWorkoutGraphType] = React.useState<GraphType>("Reps");
  const [selectedExercise, setSelectedExercise] = React.useState<string | null>(null);

  const { user, getPastWorkouts } = useStore();
  const theme = useTheme();
  const pastWorkouts = getPastWorkouts();

  const { data: workoutData, isLoading: workoutDataLoading } =
    useGetWorkoutData({
      exerciseName: selectedExercise,
      userId: user?.id ?? 0,
      workoutGraphType,
      reps,
    });

  const exerciseNames = useMemo(
    () => pastWorkouts
        .flatMap((workout) => workout.activities)
        .map((exercise) => exercise.name)
        .filter((name, index, self) => self.indexOf(name) === index), [pastWorkouts]);

  const options = workoutType === "strength" ? ["Reps", "Sets", "Weight"] : ["Distance"];
  const repCounts = useMemo(
    () => [
      ...new Set(pastWorkouts
          .flatMap((workout) => workout.activities)
          .filter((exercise) => exercise.name === selectedExercise && exercise.type === "strength")
          .map((exercise) => exercise as StrengthExercise & StrengthData)
          .map((exercise) => exercise.reps)
          .filter((currReps) => currReps) as number[]
      ),
    ],
    [pastWorkouts, selectedExercise]
  );

  const content = useMemo(() => {
    if (workoutDataLoading) {
      return <Spinner mt={10} />;
    }

    if (
      !workoutData || pastWorkouts
        .flatMap((workout) => workout.activities)
        .map((activity) => activity.type === workoutType).length === 0
    ) {
      return <Text mt={10}> No workouts to graph </Text>;
    }

    if (!selectedExercise) {
      return <Text mt={10}> Select an exercise to graph </Text>;
    }

    const chartData = workoutData.graphData.map((data) => ({
      x: data.xAxis.toString(),
      y: data.exerciseMetaData,
      label: new Date(data.timeOfExercise).toLocaleDateString(),
    }));

    const highestValue = Math.max(
      ...workoutData.graphData.map((data) => data.exerciseMetaData)
    );

    return (
      <VictoryChart
        height={400}
        width={350}
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
      >
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
          labelComponent={<VictoryTooltip renderInPortal={false} />}
          labels={({ datum }) => `${datum.label}: ${datum.y}`}
          domainPadding={{ x: 2 }}
          domain={{ y: [0, highestValue * 1.2] }}
          style={{
            data: {
              fill: "url(#gradient)",
              strokeWidth: 3,
              zIndex: 1,
              stroke: theme.colors.primary[500],
              width: 10,
            },
          }}
          data={chartData}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "transparent" },
            grid: { stroke: "transparent" },
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
  }, [workoutDataLoading, workoutData, pastWorkouts, selectedExercise, theme.colors.primary, workoutType]);

  return (
    <Card w="90%" marginBottom={4} marginTop={4}>
      <HStack>
        <Heading size="md">Workout Graphs</Heading>

        <VStack w="55%" marginLeft={1}>
          <Dropdown
            selectedValue={workoutType || ""}
            onValueChange={(val) => {
              if (val === "") {
                setWorkoutType(null);
                setSelectedExercise(null);
              } else {
                setWorkoutType(val);
              }
            }}
          >
            <Select.Item label="Clear" value="" />
            <Select.Item label="Strength" value="strength" />
            <Select.Item label="Cardio" value="cardio" />
          </Dropdown>

          <Dropdown
            selectedValue={selectedExercise ?? ""}
            onValueChange={setSelectedExercise}
            isDisabled={!exerciseNames.length || workoutType === null}
            placeholder="Select an exercise"
          >
            {exerciseNames.map((name) => (
              <Select.Item key={name} label={name} value={name} />
            ))}
          </Dropdown>

          <Dropdown
            selectedValue={workoutGraphType ?? ""}
            onValueChange={(val) => {
              if (val === "weight") {
                setReps(0);
              }
              setWorkoutGraphType(val as GraphType);
            }}
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

      <Center marginLeft="auto" marginRight="auto">
        {content}
      </Center>
    </Card>
  );
}
