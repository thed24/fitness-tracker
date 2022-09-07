import { useExercises } from "api";
import { Autocomplete, Button, Card, FormInput, FormLabel } from "components";
import { Box, HStack, Text } from "native-base";
import React from "react";
import { ExerciseFilters, Filters } from "../components/exerciseFilters";
import { CreateWorkoutProps } from "../createWorkout";

export function WorkoutDetails({ form }: CreateWorkoutProps) {
  const { data, isLoading } = useExercises();
  const [workoutName, setWorkoutName] = React.useState("");
  const { workout, activity, exerciseType } = form.values;
  const [filters, setFilters] = React.useState<Filters>({
    muscleGroup: undefined,
    equipment: undefined,
    type: undefined,
  });

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
            <Box marginBottom={4}>
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
            <Box marginBottom={4}>
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
    <Box w="80%">
      <FormLabel>Exercises</FormLabel>

      <Card marginBottom={2}>
        {workout.activities.length > 0 ? (
          workout.activities.map((currActivity) => (
            <Box key={currActivity.id}>
              <Text>{currActivity.name}</Text>
            </Box>
          ))
        ) : (
          <Text>No exercises currently selected</Text>
        )}
      </Card>

      <HStack>
        <FormLabel>Exercise</FormLabel>
        <ExerciseFilters filters={filters} setFilters={setFilters} />
      </HStack>

      <Autocomplete
        isDisabled={!exerciseType}
        w="full"
        placeholder="Bench press"
        marginBottom={2}
        marginLeft="auto"
        marginRight="auto"
        data={filteredExercises}
        keyExtractor={(item) => item.name}
        value={workoutName}
        onChange={(value) => {
          setWorkoutName(value);
          handleExerciseChange(value);
        }}
      />

      {getActivitySpecificFields()}

      <Button
        disabled={activity === null}
        onPress={handleAddActivity}
        size="xl"
      >
        Add Activity
      </Button>
    </Box>
  );
}
