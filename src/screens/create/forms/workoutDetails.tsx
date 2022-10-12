import { FormLabel } from "components";
import { Box, Text } from "native-base";
import React from "react";
import { useStore } from "store";
import { ActionButton } from "../components/actionButton";
import { IncrementBar } from "../components/incrementBar";
import { CreateWorkoutProps } from "../createWorkout";

export function WorkoutDetails({ form }: CreateWorkoutProps) {
  const { activity } = form.values;
  const { user } = useStore();

  if (!user || !activity) {
    return <Text>Loading...</Text>;
  }

  const handleActivityUpdate = (field: string) => (value: string) => {
    if (activity) {
      const stringAsNumber = parseInt(value, 10);
      form.setFieldValue("activity", { ...activity, [field]: stringAsNumber });
    }
  };

  const getActivitySpecificFields = () => {
    if (activity) {
      switch (activity.type) {
        case "strength":
          return (
            <Box mb={4}>
              <IncrementBar
                name="Sets"
                increments={[3, 1, -1, -3]}
                value={activity.targetSets}
                onChange={handleActivityUpdate("targetSets")}
              />
              <IncrementBar
                name="Reps"
                increments={[5, 1, -1, -5]}
                value={activity.targetReps}
                onChange={handleActivityUpdate("targetReps")}
              />
              <IncrementBar
                name="Weight"
                increments={[50, 10, -10, -50]}
                value={activity.targetWeight}
                onChange={handleActivityUpdate("targetWeight")}
                titleAccessory={
                  <ActionButton
                    title="Set as bodyweight"
                    size="sm"
                    onPress={() =>
                      handleActivityUpdate("targetWeight")(
                        user.weight.toString()
                      )
                    }
                  />
                }
              />
            </Box>
          );
        case "cardio":
          return (
            <Box mb={4}>
              <IncrementBar
                name="Distance"
                increments={[5, 1, -1, -5]}
                value={activity.targetDistance}
                onChange={handleActivityUpdate("targetDistance")}
              />

              <IncrementBar
                name="Duration (minutes)"
                increments={[5, 1, -1, -5]}
                value={activity.targetDuration}
                onChange={handleActivityUpdate("targetDuration")}
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
    <Box>
      <FormLabel mt={4}>{activity.name}</FormLabel>
      <Box>
        {getActivitySpecificFields()}
      </Box>
    </Box>
  );
}
