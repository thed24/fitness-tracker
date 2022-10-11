import { useExercises } from "api";
import { Autocomplete, Button, Card, FormLabel } from "components";
import { Box, Divider, Text } from "native-base";
import React from "react";
import { useStore } from "store";
import { titleCase } from "../../../utils/formatting";
import { ActionButton } from "../components/actionButton";
import { ActivityEntry } from "../components/activityEntry";
import { ExerciseFilters, Filters } from "../components/exerciseFilters";
import { IncrementBar } from "../components/incrementBar";
import { CreateWorkoutProps } from "../createWorkout";

export function WorkoutDetails({ form }: CreateWorkoutProps) {
  const { data } = useExercises();
  const [workoutName, setWorkoutName] = React.useState("");
  const { workout, activity, exerciseType } = form.values;
  const [filters, setFilters] = React.useState<Filters>({
    muscleGroup: undefined,
    equipment: undefined,
    type: undefined,
  });

  const { user } = useStore();

  if (!user) {
    return <Text>Loading...</Text>;
  }

  const filteredExercises = React.useMemo(() => {
    if (!data) return [];
    return data.exercises.filter((exercise) => {
      if (
        filters.muscleGroup &&
        exercise.mainMuscleGroup.toLocaleLowerCase() !==
          filters.muscleGroup.toLocaleLowerCase()
      )
        return false;
      if (
        filters.equipment &&
        exercise.equipment.toLocaleLowerCase() !==
          filters.equipment.toLocaleLowerCase()
      )
        return false;
      if (
        filters.type &&
        exercise.type.toLocaleLowerCase() !== filters.type.toLocaleLowerCase()
      )
        return false;
      return true;
    });
  }, [data, filters]);

  const handleExerciseChange = (value: string) => {
    const exercise = data?.exercises?.find(
      (currExercise) => currExercise.name === value
    );

    if (exercise) {
      if (exerciseType === "strength") {
        form.setFieldValue("activity", {
          ...exercise,
          reps: null,
          sets: null,
          weight: null,
          targetReps: 0,
          targetSets: 0,
          targetWeight: 0,
        });
      }
      if (exerciseType === "cardio") {
        form.setFieldValue("activity", {
          ...exercise,
          distance: null,
          duration: null,
          targetDistance: 0,
          targetDuration: 0,
        });
      }
    }
  };

  const handleActivityUpdate = (field: string) => (value: string) => {
    if (activity) {
      const stringAsNumber = parseInt(value, 10);
      form.setFieldValue("activity", { ...activity, [field]: stringAsNumber });
    }
  };

  const handleAddActivity = () => {
    if (activity) {
      form.setFieldValue("workout", {
        ...workout,
        activities: [...workout.activities, activity],
      });
    }
    form.setFieldValue("activity", null);
    setWorkoutName("");
  };

  const deleteActivity = (index: number) => () => {
    const newActivities = [...workout.activities];
    newActivities.splice(index, 1);
    form.setFieldValue("workout", { ...workout, activities: newActivities });
  };

  const getActivitySpecificFields = () => {
    if (activity) {
      switch (activity.type) {
        case "strength":
          return (
            <Box mb={4}>
              <IncrementBar
                name="Sets"
                increments={[3, 1, -1, -3]}
                value={activity.targetSets}
                onChange={handleActivityUpdate("targetSets")}
              />
              <IncrementBar
                name="Reps"
                increments={[5, 1, -1, -5]}
                value={activity.targetReps}
                onChange={handleActivityUpdate("targetReps")}
              />
              <IncrementBar
                name="Weight"
                increments={[50, 10, -10, -50]}
                value={activity.targetWeight}
                onChange={handleActivityUpdate("targetWeight")}
                titleAccessory={
                  <ActionButton
                    title="Set as bodyweight"
                    size="sm"
                    onPress={() =>
                      handleActivityUpdate("targetWeight")(
                        user.weight.toString()
                      )
                    }
                  />
                }
              />
            </Box>
          );
        case "cardio":
          return (
            <Box mb={4}>
              <IncrementBar
                name="Distance"
                increments={[5, 1, -1, -5]}
                value={activity.targetDistance}
                onChange={handleActivityUpdate("targetDistance")}
              />

              <IncrementBar
                name="Duration (minutes)"
                increments={[5, 1, -1, -5]}
                value={activity.targetDuration}
                onChange={handleActivityUpdate("targetDuration")}
              />
            </Box>
          );
        default:
          return null;
      }
    }
    return null;
  };

  const summary = React.useMemo(() => {
    type ExerciseSummary = {
      [key: string]: number;
      total: number;
    };

    const summaries = workout.activities.reduce(
      (acc, curr) => {
        const { type } = curr;
        if (type === "strength") {
          const { targetSets, targetReps, targetWeight, mainMuscleGroup } = curr;
          const volume = targetSets * targetReps * targetWeight;
          return {
            ...acc,
            [mainMuscleGroup]: volume + (acc[mainMuscleGroup] || 0),
            total: volume + acc.total,
          };
        }
        return { ...acc };
      },
      { total: 0 } as ExerciseSummary
    );

    const { total } = summaries;
    return Object.entries(summaries)
      .filter(([key]) => key !== "total")
      .map(([key, value]) => {
        const percentage = Math.round((value / total) * 100);
        return `${titleCase(key)}: ${percentage}%`;
      })
      .join(", ");
  }, [workout.activities]);

  return (
    <Box>
      <FormLabel>Activities</FormLabel>

      <Card mb={2} py={-1}>
        <Text mt={2}>{summary}</Text>
        <Divider mt={2} />
        {workout.activities.length > 0 ? (
          workout.activities.map((currentActivity, i) => (
            <ActivityEntry
              key={currentActivity.id}
              activity={currentActivity}
              deleteActivity={deleteActivity(i)}
            />
          ))
        ) : (
          <Text py={4}>No exercises added yet</Text>
        )}
      </Card>

      <FormLabel ml={2}>New Activity</FormLabel>
      <Box>
        <Autocomplete
          isDisabled={!exerciseType}
          w="full"
          placeholder={
            filteredExercises?.length
              ? "Select an exercise"
              : "No exercises found"
          }
          mb={1}
          borderWidth={0}
          mx="auto"
          data={filteredExercises}
          keyExtractor={(item) => item.name}
          value={workoutName}
          onChange={(value) => {
            if (typeof value === "string") {
              setWorkoutName(value);
              handleExerciseChange(value);
            }
          }}
        />
        <ExerciseFilters filters={filters} setFilters={setFilters} />

        {getActivitySpecificFields()}

        <Button
          disabled={activity === null}
          onPress={handleAddActivity}
          size="xl"
        >
          Add Activity
        </Button>
      </Box>
    </Box>
  );
}
