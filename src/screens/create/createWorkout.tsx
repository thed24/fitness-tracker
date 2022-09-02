import { Autocomplete, NavigationButton, Screen } from "components";

import React, { useEffect, useState } from "react";
import { Activity, ExerciseType, ScheduledWorkout } from "types";
import { useAddWorkout, useGetWorkoutNames } from "api";
import { useStore } from "store";
import { Formik, FormikProps } from "formik";
import { Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ActivityDetails } from "./forms/activityDetails";
import { WorkoutDetails } from "./forms/workoutDetails";
import { CreateWorkoutSchema } from "./createWorkoutSchema";

export interface CreateWorkoutValues {
  workout: ScheduledWorkout;
  repeat: number;
  date: Date;
  activity: Activity | null;
  exerciseType: ExerciseType;
}

export interface CreateWorkoutProps {
  form: FormikProps<CreateWorkoutValues>;
}

export function CreateWorkout() {
  const { user } = useStore();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const { data: workoutNames } = useGetWorkoutNames({
    userId: user?.id ?? "",
    order: "Ascending",
  });

  const {
    isLoading: addLoading,
    mutate: addWorkout,
    isSuccess: addSuccess,
  } = useAddWorkout();

  useEffect(() => {
    if (addSuccess) {
      navigation.reset({ index: 0, routes: [{ name: "Schedule" as never }] });
    }
  }, [addSuccess, navigation]);

  const getStep = (props: CreateWorkoutProps) => {
    switch (index) {
      case 0:
        return <ActivityDetails form={props.form} />;
      case 1:
        return <WorkoutDetails form={props.form} />;
      default:
        return <Text>Well, this is awkward</Text>;
    }
  };

  const handleSave = (createWorkoutValues: CreateWorkoutValues) => {
    for (let i = 0; i < createWorkoutValues.repeat + 1; i += 1) {
      const newTime = createWorkoutValues.date;
      if (i > 0) {
        newTime.setDate(newTime.getDate() + i * 7);
      }
      addWorkout({
        workout: { ...createWorkoutValues.workout, time: newTime.toISOString() },
        userId: user?.id ?? "",
      });
    }
  };


  return (
    <Screen loading={addLoading}>
      <Formik
        validationSchema={CreateWorkoutSchema}
        validateOnChange
        initialValues={{
          workout: {
            id: "0",
            name: "",
            time: new Date().toString(),
            past: false,
            completed: false,
            activities: [],
          },
          repeat: 1,
          date: new Date(),
          activity: null,
          exerciseType: "strength",
        }}
        onSubmit={handleSave}
      >
        {(form) => (
          <>
            <Autocomplete
              width="80%"
              paddingTop={4}
              variant="unstyled"
              fontWeight="bold"
              fontSize={18}
              placeholder="Workout name"
              value={form.values.workout.name}
              data={workoutNames?.workoutNames ?? []}
              keyExtractor={(item: string) => item}
              onChange={(name: string) => form.setFieldValue("workout", { ...form.values.workout, name })}
            />
            {getStep({ form })}
            <NavigationButton
              disabled={Object.keys(form.errors).length > 0}
              minSteps={0}
              maxSteps={1}
              currentIndex={index}
              setIndex={setIndex}
              onSubmit={form.handleSubmit}
            />
          </>
        )}
      </Formik>
    </Screen>
  );
}
