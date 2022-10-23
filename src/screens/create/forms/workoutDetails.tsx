import { FormLabel } from "components";
import { Box, Text } from "native-base";
import React, { useMemo } from "react";
import { useStore } from "store";
import { CardioData, CardioExercise, StrengthData, StrengthExercise } from "../../../types/domain";
import { ActionButton } from "../components/actionButton";
import { IncrementBar } from "../components/incrementBar";
import { CreateWorkoutProps } from "../createWorkout";

export function WorkoutDetails({ form }: CreateWorkoutProps) {
  const { activity } = form.values;
  const { user } = useStore();

  const activitySpecificFields = useMemo(() => {
    const handleActivityUpdate = (field: string) => (value: string) => {
      if (activity) {
        const stringAsNumber = parseInt(value, 10);
        form.setFieldValue("activity", { ...activity, [field]: stringAsNumber });
      }
    };

    const createCardioFields = (cardioActivity: CardioData & CardioExercise) => (
      <Box mb={4}>
        <IncrementBar
          name="Distance"
          increments={[5, 1, -1, -5]}
          value={cardioActivity.targetDistance}
          onChange={handleActivityUpdate("targetDistance")}
        />
  
        <IncrementBar
          name="Duration (minutes)"
          increments={[5, 1, -1, -5]}
          value={cardioActivity.targetDuration}
          onChange={handleActivityUpdate("targetDuration")}
        />
      </Box>
    );
  
    const createWeightFields = (strengthActivity: StrengthData & StrengthExercise) => (
      <Box mb={4}>
        <IncrementBar
          name="Sets"
          increments={[3, 1, -1, -3]}
          value={strengthActivity.targetSets}
          onChange={handleActivityUpdate("targetSets")}
        />
        <IncrementBar
          name="Reps"
          increments={[5, 1, -1, -5]}
          value={strengthActivity.targetReps}
          onChange={handleActivityUpdate("targetReps")}
        />
        <IncrementBar
          name="Weight"
          increments={[50, 10, -10, -50]}
          value={strengthActivity.targetWeight}
          onChange={handleActivityUpdate("targetWeight")}
          titleAccessory={
            <ActionButton
              title="Set as bodyweight"
              size="sm"
              onPress={() =>
                handleActivityUpdate("targetWeight")(
                  user?.weight?.toString() ?? "0"
                )
              }
            />
          }
        />
      </Box>
    )

    if (activity) {
      switch (activity.type) {
        case "strength":
          return createWeightFields(activity);
        case "cardio":
          return createCardioFields(activity);
        default:
          return null;
      }
    }
    return null;
  }, [activity, form, user]);

  if (!user || !activity) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <FormLabel fontWeight="bold" fontSize={24} mt={4}>{activity.name}</FormLabel>
      <Box>
        {activitySpecificFields}
      </Box>
    </Box>
  );
}
