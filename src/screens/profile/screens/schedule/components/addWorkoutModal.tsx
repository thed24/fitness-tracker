import { Autocomplete, Button, DatePicker, FormInput } from "components";
import {
  Modal,
  Text,
  FormControl,
  Select,
  Divider,
  HStack,
  Slider,
} from "native-base";
import React, { useState } from "react";
import { Activity, ExerciseType, ScheduledWorkout } from "types";
import { useExercises } from "api";

export interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (workout: ScheduledWorkout) => void;
}

export function AddWorkoutModal({ isOpen, setIsOpen, onSubmit }: Props) {
  const { data, isLoading } = useExercises();

  const [step, setStep] = useState(0);
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [repeat, setRepeat] = useState(0);
  const [workout, setWorkout] = useState<ScheduledWorkout>({
    name: "",
    time: date.toString(),
    activities: [],
    id: "0",
    past: false,
    completed: false,
  });

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
      setCurrentActivity({
        ...exercise,
        type: "strength",
        reps: 0,
        sets: 0,
        weight: 0,
      });
    }
  };

  const handleActivityUpdate = (field: string) => (value: string) => {
    if (currentActivity) {
      const stringAsNumber = parseInt(value, 10);
      setCurrentActivity({ ...currentActivity, [field]: stringAsNumber });
    }
  };

  const handleAddActivity = () => {
    if (currentActivity) {
      setWorkout((prevWorkout) => ({
        ...prevWorkout,
        activities: [...prevWorkout.activities, currentActivity],
      }));
      setExerciseType(null);
      setCurrentActivity(null);
    }
  };

  const handleSave = () => {
    for (let i = 0; i < repeat + 1; i += 1) {
      const newTime = date;
      if (i > 0) {
        newTime.setDate(newTime.getDate() + i * 7);
      }
      onSubmit({ ...workout, time: newTime.toISOString() });
    }

    setIsOpen(false);
  };

  if (isLoading || !data?.exercises) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Content maxWidth="500px">
        <Modal.CloseButton />
        <Modal.Header>
          <Autocomplete
            paddingLeft="-5px"
            fontWeight="bold"
            fontSize={18}
            variant="unstyled"
            placeholder="Workout name"
            value={workout.name}
            data={["Chest", "Back", "Legs", "Arms", "Shoulders", "Abs"]}
            keyExtractor={(item: string) => item}
            onChange={(name: string) =>
              setWorkout((prevWorkout) => ({
                ...prevWorkout,
                name,
              }))
            }
          />
        </Modal.Header>

        {step === 0 && (
          <>
            <Modal.Body>
              <FormControl.Label>Workout Date</FormControl.Label>
              <DatePicker date={date} setDate={setDate} mode="date" />

              <FormControl.Label>Repeat for {repeat} weeks</FormControl.Label>
              <Slider
                value={repeat}
                onChange={setRepeat}
                maxValue={10}
                step={1}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </Modal.Body>

            <Modal.Footer>
              <Button size="xl" onPress={() => setStep(1)}>
                Next
              </Button>
            </Modal.Footer>
          </>
        )}

        {step === 1 && (
          <>
            <Modal.Body>
              <FormControl.Label>Exercises</FormControl.Label>
              {workout.activities.length > 0 ? (
                workout.activities.map((activity) => (
                  <Text>- {activity.name} </Text>
                ))
              ) : (
                <Text>No Exercises</Text>
              )}

              <Divider
                w="3/4"
                alignSelf="center"
                marginTop="2"
                marginBottom="2"
              />

              <FormControl.Label>Exercise Type</FormControl.Label>
              <Select
                placeholder="Select a type of exercise"
                onValueChange={handleExerciseTypeChange}
              >
                <Select.Item value="strength" label="Strength" />
                <Select.Item value="cardio" label="Cardio" />
              </Select>

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
                      <Select.Item
                        value={exercise.name}
                        label={exercise.name}
                      />
                    ))}
              </Select>

              {currentActivity && currentActivity.type === "strength" && (
                <>
                  <FormInput
                    name="Sets"
                    onBlur={() => {}}
                    onChangeText={handleActivityUpdate("sets")}
                    value={currentActivity.sets}
                  />

                  <FormInput
                    name="Reps"
                    onBlur={() => {}}
                    onChangeText={handleActivityUpdate("reps")}
                    value={currentActivity.reps}
                  />

                  <FormInput
                    name="Weight (kg)"
                    onBlur={() => {}}
                    onChangeText={handleActivityUpdate("weight")}
                    value={currentActivity.weight}
                  />
                </>
              )}

              <Button
                disabled={currentActivity === null}
                onPress={handleAddActivity}
                size="xl"
              >
                Add Activity
              </Button>
            </Modal.Body>

            <Modal.Footer>
              <HStack space={2}>
                <Button onPress={() => setStep(0)}>Back</Button>
                <Button
                  disabled={
                    workout.activities.length === 0 && currentActivity === null
                  }
                  onPress={handleSave}
                >
                  Save Workout
                </Button>
              </HStack>
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
}
