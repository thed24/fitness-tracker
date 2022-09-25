import { useExercises } from "api";
import { Autocomplete, Button, Card, FormLabel } from "components";
import { Box, HStack, ScrollView, Text } from "native-base";
import React from "react";
import { useStore } from "store";
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

  const { user, weightFormatter, distanceFormatter } = useStore();

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
            <Box marginBottom={4}>
              <IncrementBar
                name="Sets"
                increments={[3, 1, -1, -3]}
                value={activity.sets}
                onChange={handleActivityUpdate("sets")}
              />
              <IncrementBar
                name="Reps"
                increments={[5, 1, -1, -5]}
                value={activity.reps}
                onChange={handleActivityUpdate("reps")}
              />
              <IncrementBar
                name="Weight"
                increments={[50, 10, -10, -50]}
                value={activity.weight}
                onChange={handleActivityUpdate("weight")}
              />
            </Box>
          );
        case "cardio":
          return (
            <Box marginBottom={4}>
              <IncrementBar
                name="Distance"
                increments={[5, 1, -1, -5]}
                value={activity.duration}
                onChange={handleActivityUpdate("duration")}
              />

              <IncrementBar
                name="Duration (minutes)"
                increments={[5, 1, -1, -5]}
                value={activity.duration}
                onChange={handleActivityUpdate("duration")}
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
    <ScrollView w="90%">
      <FormLabel>Activities</FormLabel>

      <Card mb={2} py={-1}>
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

      <HStack>
        <FormLabel>New Activity</FormLabel>
        <ExerciseFilters filters={filters} setFilters={setFilters} />
      </HStack>

      <Autocomplete
        isDisabled={!exerciseType}
        w="full"
        placeholder="Bench press"
        rounded={8}
        marginBottom={1}
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
    </ScrollView>
  );
}
