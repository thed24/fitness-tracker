import { useExercises } from "api";
import { Text, ScrollView, useTheme, Box, Skeleton } from "native-base";
import { Accordion, Card } from "components";
import React from "react";
import { Exercise, MuscleGroups } from "types";
import { ExerciseFilters, Filters } from "../components/exerciseFilters";
import { CreateWorkoutProps } from "../createWorkout";

interface BaseProps {
  incrementIndex: () => void;
}

type Props = BaseProps & CreateWorkoutProps;

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

  const handleExerciseChange = (exercise: Exercise) => {
    if (exercise) {
      if (form.values.exerciseType === "strength") {
        form.setFieldValue("activity", {
          ...exercise,
          reps: null,
          sets: null,
          weight: null,
          targetReps: 0,
          targetSets: 0,
          targetWeight: 0,
        });
      }
      if (form.values.exerciseType === "cardio") {
        form.setFieldValue("activity", {
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

  const muscleGroups = MuscleGroups.map((muscleGroup, i) => {
    const linearGradient = {
      colors: [theme.colors.primary[300], theme.colors.primary[600]],
      start: [0, 0],
      end: [1, 0],
    };
    const exercises = filteredExercises.filter(
      (exercise) =>
        exercise.mainMuscleGroup.toLowerCase() === muscleGroup.toLowerCase() ||
        exercise.otherMuscleGroups.some(
          (otherMuscleGroup) =>
            otherMuscleGroup.toLowerCase() === muscleGroup.toLowerCase()
        ) ||
        exercise.detailedMuscleGroup?.toLowerCase() ===
          muscleGroup.toLowerCase()
    );
    return { name: muscleGroup, exercises, linearGradient };
  });

  return (
    <ScrollView nestedScrollEnabled>
      <Box mt={4}>
        <ExerciseFilters filters={filters} setFilters={setFilters} />
        {isLoading ? (
          <>
            <Skeleton
              rounded={10}
              startColor={theme.colors.gray[100]}
              endColor={theme.colors.gray[200]}
              height={100}
              my={4}
            />
            <Skeleton
              rounded={10}
              startColor={theme.colors.gray[100]}
              endColor={theme.colors.gray[200]}
              height={100}
              my={4}
            />
          </>
        ) : (
          muscleGroups
            .filter((muscleGroup) => muscleGroup.exercises.length > 0)
            .map((muscleGroup) => (
              <Card my={2} key={muscleGroup.name}>
                <Accordion
                  title={muscleGroup.name}
                  secondTitle={`${muscleGroup.exercises.length} exercises`}
                  key={`${muscleGroup.name}-accordion`}
                >
                  <Box key={`${muscleGroup.name}-box`}>
                    {muscleGroup.exercises.map((exercise) => (
                      <Text onPress={() => handleExerciseChange(exercise)} color="black" key={exercise.id}>
                        {exercise.name}
                      </Text>
                    ))}
                  </Box>
                </Accordion>
              </Card>
            ))
        )}
      </Box>
    </ScrollView>
  );
}
