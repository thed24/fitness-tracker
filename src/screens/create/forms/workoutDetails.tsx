import { useExercises } from "api";
import { Button, FormInput } from "components";
import { Box, Divider, FormControl, Select, Text } from "native-base";
import React from "react";
import { CreateWorkoutProps } from "../createWorkout";

export function WorkoutDetails({ form }: CreateWorkoutProps) {
  const { data, isLoading } = useExercises();
  const { workout, activity, exerciseType } = form.values;

  const handleExerciseTypeChange = (value: string) => {
    form.setFieldValue("exerciseType", value);
  };

  const handleExerciseChange = (value: string) => {
    const exercise = data?.exercises?.find(
      (currExercise) => currExercise.name === value
    );

    if (exercise) {
      if (exerciseType === "strength") {
        form.setFieldValue("activity", {
          ...exercise,
          reps: 0,
          sets: 0,
          weight: 0,
        });
      }
      if (exerciseType === "cardio") {
        form.setFieldValue("activity", {
          ...exercise,
          distance: 0,
          duration: 0,
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
  };

  const getActivitySpecificFields = () => {
    if (activity) {
      switch (activity.type) {
        case "strength":
          return (
            <Box w="80%">
              <FormInput
                name="Sets"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("sets")}
                value={activity.sets}
              />

              <FormInput
                name="Reps"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("reps")}
                value={activity.reps}
              />

              <FormInput
                name="Weight (kg)"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("weight")}
                value={activity.weight}
              />
            </Box>
          );
        case "cardio":
          return (
            <Box w="80%">
              <FormInput
                name="Distance (km)"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("distance")}
                value={activity.distance}
              />

              <FormInput
                name="Duration (min)"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("duration")}
                value={activity.duration}
              />
            </Box>
          );
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <>
      <FormControl.Label>Exercises</FormControl.Label>
      {workout.activities.length > 0 ? (
        workout.activities.map((currActivity) => (
          <Text>- {currActivity.name} </Text>
        ))
      ) : (
        <Text>No Exercises</Text>
      )}

      <Divider w="3/4" alignSelf="center" marginTop="2" marginBottom="2" />

      <FormControl.Label>Exercise Type</FormControl.Label>
      <Select
        w="80%"
        placeholder="Select a type of exercise"
        onValueChange={handleExerciseTypeChange}
      >
        <Select.Item key="strength" value="strength" label="Strength" />
        <Select.Item key="cardio" value="cardio" label="Cardio" />
      </Select>

      <FormControl.Label>Exercise</FormControl.Label>
      <Select
        w="80%"
        onValueChange={handleExerciseChange}
        isDisabled={exerciseType === null}
      >
        {data &&
          data.exercises.length > 0 &&
          data.exercises
            .filter(
              (exercise) => exercise.type.toLocaleLowerCase() === exerciseType
            )
            .map((exercise) => (
              <Select.Item value={exercise.name} label={exercise.name} />
            ))}
      </Select>

      {getActivitySpecificFields()}

      <Button
        disabled={activity === null}
        onPress={handleAddActivity}
        size="lg"
      >
        Add Activity
      </Button>
    </>
  );
}
