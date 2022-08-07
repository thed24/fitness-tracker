import { Button, FormInput } from "components";
import { Modal, Text, FormControl, Select, Divider, HStack } from "native-base";
import React, { useState } from "react";
import { Activity, ExerciseType, ScheduledWorkout } from "types";
import { Calendar, DateData } from "react-native-calendars";
import { useExercises } from "../../../../api/exercise/useExercises";

export interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (workout: ScheduledWorkout) => void;
}

export function AddWorkoutModal({ isOpen, setIsOpen, onSubmit }: Props) {
  const { data, isLoading } = useExercises();

  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [workout, setWorkout] = useState<ScheduledWorkout>({
    time: date,
    activities: [],
    id: "0",
    past: false,
    completed: false,
  });

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleExerciseTypeChange = (value: string) => {
    if (value === "strength") {
      setExerciseType("strength");
    } else if (value === "cardio") {
      setExerciseType("cardio");
    }
  };

  const handleExerciseChange = (value: string) => {
    const exercise = data?.exercises?.find(
      (currExercise) => currExercise.name === value
    );

    if (exercise && exercise.type === "strength") {
      setCurrentActivity({ ...exercise, type: "strength", reps: 0, sets: 0, weight: 0 });
    }
  };

  const handleActivityUpdate = (field: string) => (value: string) => {
    if (currentActivity) {
      const stringAsNumber = parseInt(value, 10);
      setCurrentActivity({ ...currentActivity, [field]: stringAsNumber });
    }
  };

  const handleAddExercise = () => {
    if (currentActivity) {
      setWorkout((prevWorkout) => ({
        ...prevWorkout,
        activities: [...prevWorkout.activities, currentActivity],
      }));
    }
  };

  const handleDateChange = (value: DateData) => {
    setDate(new Date(value.dateString));
  };

  const handleSave = () => {
    onSubmit(workout);
    setIsOpen(false);
  };

  if (isLoading || !data?.exercises) {
    return <Text>Loading...</Text>;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>New Workout</Modal.Header>

        <Modal.Body>
          <Text>Current Exercises</Text>
          {workout.activities.length > 0 ? (
            workout.activities.map((activity) => <Text>{activity.name}</Text>)
          ) : (
            <Text>No Exercises</Text>
          )}
        </Modal.Body>

        <Divider w="3/4" alignSelf="center" />

        <Modal.Body>
          <FormControl>
            <FormControl.Label>Exercise Type</FormControl.Label>
            <Select
              placeholder="Select at type of exercise"
              onValueChange={handleExerciseTypeChange}
            >
              <Select.Item value="strength" label="Strength" />
              <Select.Item value="cardio" label="Cardio" />
            </Select>
          </FormControl>

          <FormControl.Label>Exercise</FormControl.Label>
          <Select
            onValueChange={handleExerciseChange}
            isDisabled={exerciseType === null}
          >
            {data.exercises.length > 0 &&
              data.exercises
                .filter(
                  (exercise) =>
                    exercise.type.toLocaleLowerCase() === exerciseType
                )
                .map((exercise) => (
                  <Select.Item value={exercise.name} label={exercise.name} />
                ))}
          </Select>

          {currentActivity && currentActivity.type === "strength" && (
            <>
              <FormInput
                name="Sets"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("sets")}
                value={currentActivity.sets.toString()}
              />

              <FormInput
                name="Reps"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("reps")}
                value={currentActivity.reps.toString()}
              />

              <FormInput
                name="Weight"
                onBlur={() => {}}
                onChangeText={handleActivityUpdate("weight")}
                value={currentActivity.weight.toString()}
              />
            </>
          )}

          <Divider w="3/4" alignSelf="center" />

          <Calendar
            minDate={new Date().toDateString()}
            onDayPress={handleDateChange}
            collapsable
            theme={{
              foregroundColor: "#eaeaea",
            }}
            markedDates={{
              [date.toLocaleDateString("en-CA")]: {
                selected: true,
                selectedColor: "blue",
              },
            }}
          />

          <HStack space={2}>
            <Button
              disabled={currentActivity === null}
              onPress={handleAddExercise}
            >
              Add Activity
            </Button>

            <Button disabled={currentActivity === null} onPress={handleSave}>
              Save Workout
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
