import { useExercises } from 'api';
import { Text, Card, ScrollView, useTheme, Box, Skeleton, HStack, Image } from 'native-base';
import { Accordion } from 'components';
import React, { useCallback, useMemo, useState } from 'react';
import { Exercise, MuscleGroups } from 'types';
import { titleCase } from 'utils';
import { FlashList } from "@shopify/flash-list";
import { ExerciseFilters, Filters } from '../components/exerciseFilters';
import { CreateWorkoutProps } from '../createWorkout';

interface BaseProps {
  incrementIndex: () => void;
}

type Props = BaseProps & CreateWorkoutProps;

interface MuscleGroupData {
  name: string;
  exercises: Exercise[];
}

export function SelectWorkout({ form, incrementIndex }: Props) {
  const [filters, setFilters] = useState<Filters>({
    muscleGroup: undefined,
    equipment: undefined,
    type: undefined,
  });

  const theme = useTheme();
  const { data, isLoading } = useExercises();

  const filteredExercises = useMemo(() => {
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

  const createCardContent = useCallback((muscleGroup: MuscleGroupData) => {
    const handleExerciseChange = (exercise: Exercise) => {
      if (exercise) {
        if (exercise.type === 'strength') {
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
        if (exercise.type === 'cardio') {
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

    return (
      <FlashList
        data={muscleGroup.exercises}
        estimatedFirstItemOffset={200}
        renderItem={({ item: exercise }) => (
          <HStack>
            <Text
              maxW="80%"
              onPress={() => handleExerciseChange(exercise)}
              color="black"
              my="auto"
            >
              {exercise.name}
            </Text>
            <Image
              w={50}
              h={50}
              ml="auto"
              alt={exercise.name}
              source={{
                uri: `data:image/${exercise.muscleGroupImage.fileExtension};base64,${exercise.muscleGroupImage.bytes}`,
              }} />
          </HStack>
        )}
        estimatedItemSize={49} />
    );
  }, [form, incrementIndex]);

  const skeletons = Array.from({ length: 10 }, (_, i) => i).map((i) => (
    <Skeleton
      key={`skeleton-${i}`}
      rounded={10}
      startColor={theme.colors.gray[100]}
      endColor={theme.colors.gray[200]}
      height={82}
      my={2}
    />
  ));

  const content = useMemo(() => {
    if (isLoading) return skeletons;

    const exercisesFor = (muscleGroup: string): MuscleGroupData => {
      const exercises = filteredExercises.filter((exercise) => {
        const compareStrings = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
        const muscleGroups = exercise.otherMuscleGroups.concat(exercise.mainMuscleGroup).concat(exercise.detailedMuscleGroup ?? "Unknown");
        return muscleGroups.some((curr) => compareStrings(curr, muscleGroup));
      });
  
      return { name: muscleGroup, exercises };
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
          {createCardContent(muscleGroup)}
        </Accordion>
      </Card>
    );

    return MuscleGroups.map(exercisesFor).filter(whereExercisesExist).map(createCard);
  }, [isLoading, skeletons, filteredExercises, createCardContent]);

  return (
    <ScrollView nestedScrollEnabled>
      <Box mt={4}>
        <ExerciseFilters filters={filters} setFilters={setFilters} />
        {content}
      </Box>
    </ScrollView>
  );
}
