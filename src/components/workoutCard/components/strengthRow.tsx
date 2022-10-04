import { HStack, useTheme, Text } from "native-base";
import React from "react";
import { useStore } from "store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StrengthData, StrengthExercise, Workout } from "types";
import { StrengthModal } from "./strengthModal";

interface Props {
  activity: StrengthExercise & StrengthData;
  workout: Workout;
}

export function StrengthRow({ activity, workout }: Props) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const { getWeightFormatter } = useStore();
  const weightFormatter = getWeightFormatter();

  return (
    <>
      <StrengthModal
        activity={activity}
        workout={workout}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Text my="auto">
        Goal:{" "}
        {weightFormatter(
          `${activity.targetSets} x ${activity.targetReps} at ${activity.targetWeight}`,
          false
        )}
      </Text>
      <HStack>
        <Text my="auto">
          Result:{" "}
          {activity.sets || activity.reps || activity.weight
            ? weightFormatter(
                `${activity.sets} x ${activity.reps} at ${activity.weight}`,
                false
              )
            : "Uncompleted"}
        </Text>
        {!workout.completed && (
          <Icon
            name="square-edit-outline"
            style={{ marginLeft: theme.space[1], paddingTop: 3 }}
            onPress={() => {
              setIsOpen(true);
            }}
            size={20}
            color={theme.colors.primary[900]}
          />
        )}
      </HStack>
    </>
  );
}
