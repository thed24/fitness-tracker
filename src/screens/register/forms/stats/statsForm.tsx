import { Autocomplete, Button, FormInput, FormLabel } from 'components';
import { HStack, View } from 'native-base';
import React from 'react';
import { createMeasurementFormatter, createWeightFormatter } from 'utils';
import { Exercise } from '../../../../types/domain';
import { RegisterProps } from '../../register';
import * as SC from '../../register.styles';

type Props = RegisterProps & {
  exercises: Exercise[];
}

export function StatsForm({ form, exercises }: Props) {
  const weightFormatter = createWeightFormatter(form.values.weightUnit);
  const measurementFormatter = createMeasurementFormatter(form.values.measurementUnit);
  const [selectedExercise, setSelectedExercise] = React.useState<Exercise | null>(null);
  const [exerciseText, setExerciseText] = React.useState<string>('');

  const filteredExercises = React.useMemo(() => {
    const exercisesToRemove = Object.keys(form.values.maxes);
    return exercises.filter((exercise) => !exercisesToRemove.includes(exercise.name));
  }, [exercises, form.values.maxes]);

  const createNewMax = (exercise: Exercise) => {
    form.setFieldValue('maxes', {
      ...form.values.maxes,
      [exercise.name]: {
        reps: 0,
        weight: 0,
      },
    });
  };

  const maxes = Object.entries(form.values.maxes).map(([exerciseName, max]) => (
    <View>
      <FormLabel mt={4}>{exerciseName}</FormLabel>
      <HStack space={5} w="30%" alignItems="center" key={exerciseName}>
        <FormInput
          key={`weight-${exerciseName}`}
          onChangeText={form.handleChange(`maxes.${exerciseName}.weight`)}
          onBlur={form.handleBlur(`maxes.${exerciseName}.weight`)}
          value={max.weight.toString()}
          required
          error={
            form.errors.maxes?.[exerciseName]?.weight &&
            form.touched.maxes?.[exerciseName]?.weight
              ? form.errors.maxes?.[exerciseName]?.weight
              : undefined
          }
          name={weightFormatter('Weight')}
        />
        <FormInput
          key={`reps-${exerciseName}`}
          onChangeText={form.handleChange(`maxes.${exerciseName}.reps`)}
          onBlur={form.handleBlur(`maxes.${exerciseName}.reps`)}
          value={max.reps.toString()}
          required
          error={
            form.errors.maxes?.[exerciseName]?.reps &&
            form.touched.maxes?.[exerciseName]?.reps
              ? form.errors.maxes?.[exerciseName]?.reps
              : undefined
          }
          name="Reps"
        />
        <Button
          key={`remove-${exerciseName}`}
          style={{ marginTop: 20 }}
          onPress={() => {
            form.setFieldValue('maxes', Object.fromEntries(
              Object.entries(form.values.maxes).filter(([name]) => name !== exerciseName),
            ));
          }}
        >
          Remove
        </Button>
      </HStack>
    </View>
  ));

  return (
    <SC.Container>
      <FormInput
        onChangeText={form.handleChange('height')}
        onBlur={form.handleBlur('height')}
        value={form.values.height.toString()}
        required
        error={
          form.errors.height && form.touched.height
            ? form.errors.height
            : undefined
        }
        name={measurementFormatter('Height')}
      />
      <FormInput
        onChangeText={form.handleChange('weight')}
        onBlur={form.handleBlur('weight')}
        value={form.values.weight.toString()}
        required
        error={
          form.errors.weight && form.touched.weight
            ? form.errors.weight
            : undefined
        }
        name={weightFormatter('Weight')}
      />
      <FormInput
        onChangeText={form.handleChange('age')}
        onBlur={form.handleBlur('age')}
        value={form.values.age.toString()}
        required
        error={
          form.errors.age && form.touched.age ? form.errors.age : undefined
        }
        name="Age"
      />
      <Autocomplete
        w="100%"
        mt={2}
        placeholder="Select an exercise"
        data={filteredExercises ?? []}
        value={exerciseText}
        keyExtractor={(item: Exercise) => item.name}
        onChange={(value: string) => {
          setSelectedExercise(filteredExercises?.find((e) => e.name === value) ?? null);
          setExerciseText(value);
        }}
      />
      {maxes}
      <Button
        style={{ marginTop: 20, width: '100%' }}
        isDisabled={selectedExercise === null}
        onPress={() => {
          createNewMax(selectedExercise ?? ({} as Exercise))
          setSelectedExercise(null);
          setExerciseText('');
        }}
      >
        Add New Exercise Max
      </Button>
    </SC.Container>
  );
}
