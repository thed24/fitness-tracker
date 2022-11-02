import { Autocomplete, FormLabel, Screen } from "components";

import React, { useState } from "react";
import { Activity, ExerciseType, ScheduledWorkout } from "types";
import { useAddWorkout, useGetWorkoutNames } from "api";
import { useStore } from "store";
import { Formik, FormikProps } from "formik";
import { Box, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ActivityDetails } from "./forms/activityDetails";
import { CreateWorkoutSchema } from "./createWorkoutSchema";
import { SelectWorkout } from "./forms/selectWorkout";
import { NavigationButtons } from "./components/navigationButtons";
import { WorkoutDetails } from "./forms/workoutDetails";

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
    userId: user?.id ?? -1,
    order: "Ascending",
  });

  const { isLoading: addLoading, mutate: addWorkout } = useAddWorkout();

  const getStep = (props: CreateWorkoutProps) => {
    switch (index) {
      case 0:
        return <ActivityDetails form={props.form} />;
      case 1:
        return (
          <SelectWorkout form={props.form} incrementIndex={() => setIndex(2)} />
        );
      case 2:
        return <WorkoutDetails form={props.form} />;
      default:
        return <Text>Well, this is awkward</Text>;
    }
  };

  const handleSave = (createWorkoutValues: CreateWorkoutValues) => {
    for (let i = 0; i < createWorkoutValues.repeat; i += 1) {
      const newTime = createWorkoutValues.date;
      if (i > 0) {
        newTime.setDate(newTime.getDate() + i * 7);
      }
      addWorkout({
        workout: {
          ...createWorkoutValues.workout,
          completed: false,
          time: newTime.toISOString(),
        },
        userId: user?.id ?? -1,
      });
    }
    setIndex(0);
    navigation.reset({ index: 0, routes: [{ name: "Profile" as never }] });
  };

  return (
    <Screen loading={addLoading}>
      <Formik
        validationSchema={CreateWorkoutSchema}
        initialErrors={{ workout: { name: "Enter a workout name" } }}
        validateOnChange
        initialValues={{
          workout: {
            id: 0,
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
        {(form) => {
          const handleAddActivity = () => {
            form.setFieldValue("workout", {
              ...form.values.workout,
              activities: [...form.values.workout.activities, form.values.activity],
            });
            form.setFieldValue("activity", null);
            setIndex(0);
          };

          const errors = [form.errors.workout?.name ?? "", form.errors.workout?.activities ?? ""]
                         .filter((e) => e !== "");

          return (
            <ScrollView nestedScrollEnabled w="100%">
              <Box w="90%" mx="auto">
                {index === 0 && (
                  <Autocomplete
                    variant="unstyled"
                    ml={-1.5}
                    mt={2}
                    borderWidth={0}
                    backgroundColor="transparent"
                    fontWeight="bold"
                    fontSize={24}
                    placeholder="Workout name"
                    value={form.values.workout.name}
                    data={workoutNames?.workoutNames ?? []}
                    keyExtractor={(item: string) => item}
                    onChange={(name: string) =>
                      form.setFieldValue("workout", {
                        ...form.values.workout,
                        name,
                      })
                    }
                  />
                )}

                {getStep({ form })}

                <VStack>
                  <NavigationButtons
                    loading={addLoading}
                    disabled={Object.keys(form.errors).length > 0}
                    currentIndex={index}
                    setIndex={setIndex}
                    onAddActivity={handleAddActivity}
                    onSubmit={form.handleSubmit}
                  />
                  {errors.length > 0 && index === 0 && (
                    <FormLabel textAlign="center" variant="error">{errors.join("\n")}</FormLabel>
                  )}
                </VStack>
              </Box>
            </ScrollView>
          );
        }}
      </Formik>
    </Screen>
  );
}
