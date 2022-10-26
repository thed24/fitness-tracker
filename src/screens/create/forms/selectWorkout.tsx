import { useExercises } from 'api';
import { Text, Card, ScrollView, useTheme, Box, Skeleton } from 'native-base';
import { Accordion } from 'components';
import React from 'react';
import { Exercise, MuscleGroups } from 'types';
import { titleCase } from 'utils';
import { ExerciseFilters, Filters } from '../components/exerciseFilters';
import { CreateWorkoutProps } from '../createWorkout';

interface BaseProps {
  incrementIndex: () => void;
}

type Props = BaseProps & CreateWorkoutProps;

interface MuscleGroupData {
  name: string;
  exercises: Exercise[];
  linearGradient: {
    colors: string[];
    start: number[];
    end: number[];
  };
}

export function SelectWorkout({ form, incrementIndex }: Props) {
  const [filters, setFilters] = React.useState<Filters>({
    muscleGroup: undefined,
    equipment: undefined,
    type: undefined,
  });

  const theme = useTheme();
  const { data, isLoading } = useExercises();

  const filteredExercises = React.useMemo(() => {
    if (!data) return [];

    return data.filter((exercise) => {
      if (filters.muscleGroup && exercise.mainMuscleGroup.toLocaleLowerCase() !== filters.muscleGroup.toLocaleLowerCase())
        return false;
      if (filters.equipment && exercise.equipment.toLocaleLowerCase() !== filters.equipment.toLocaleLowerCase())
        return false;
      if (filters.type && exercise.type.toLocaleLowerCase() !== filters.type.toLocaleLowerCase())
        return false;
      return true;
    });
  }, [data, filters]);

  const handleExerciseChange = (exercise: Exercise) => {
    if (exercise) {
      if (form.values.exerciseType === 'strength') {
        form.setFieldValue('activity', {
          ...exercise,
          reps: null,
          sets: null,
          weight: null,
          targetReps: 0,
          targetSets: 0,
          targetWeight: 0,
        });
      }
      if (form.values.exerciseType === 'cardio') {
        form.setFieldValue('activity', {
          ...exercise,
          distance: null,
          duration: null,
          targetDistance: 0,
          targetDuration: 0,
        });
      }
      incrementIndex();
    }
  };

  const exercisesFor = (muscleGroup: string): MuscleGroupData => {
    const linearGradient = {
      colors: [theme.colors.primary[300], theme.colors.primary[600]],
      start: [0, 0],
      end: [1, 0],
    };

    const exercises = filteredExercises.filter((exercise) => {
      const compareStrings = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
      const muscleGroups = exercise.otherMuscleGroups.concat(exercise.mainMuscleGroup).concat(exercise.detailedMuscleGroup ?? "Unknown");
      return muscleGroups.some((curr) => compareStrings(curr, muscleGroup));
    });

    return { name: muscleGroup, exercises, linearGradient };
  };

  const whereExercisesExist = (muscleGroup: MuscleGroupData) => muscleGroup.exercises.length > 0;

  const createCard = (muscleGroup: MuscleGroupData) => (
    <Card my={2} key={`card-${muscleGroup.name}`}>
      <Accordion
        title={titleCase(muscleGroup.name)}
        secondTitle={`${muscleGroup.exercises.length} exercises`}
        key={`${muscleGroup.name}-accordion`}
        short
      >
        <Box key={`${muscleGroup.name}-box`}>
          {muscleGroup.exercises.map((exercise) => (
            <Text
              onPress={() => handleExerciseChange(exercise)}
              color="black"
              key={`${muscleGroup.name}-${exercise.name}`}
            >
              {exercise.name}
            </Text>
          ))}
        </Box>
      </Accordion>
    </Card>
  );

  const skeletons = Array.from({ length: 10 }, (_, i) => i).map(() => (
    <Skeleton
      rounded={10}
      startColor={theme.colors.gray[100]}
      endColor={theme.colors.gray[200]}
      height={100}
      my={2}
    />
  ));

  return (
    <ScrollView nestedScrollEnabled>
      <Box mt={4}>
        <ExerciseFilters filters={filters} setFilters={setFilters} />
        {isLoading
          ? skeletons
          : MuscleGroups
              .map(exercisesFor)
              .filter(whereExercisesExist)
              .map(createCard)}
      </Box>
    </ScrollView>
  );
}
