import { HStack, useTheme, Text, ChevronRightIcon, View } from "native-base";
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

      <HStack>
          <Text fontSize={16} fontWeight="bold"> Goal </Text>
          <Text>
            {weightFormatter(
              `${activity.targetSets} x ${activity.targetReps} at ${activity.targetWeight}`,
              false
            )}
          </Text>
          <View ml="auto" mt={2}>
            <ChevronRightIcon />
          </View>
      </HStack>

      <HStack>
      <Text fontSize={16} fontWeight="bold"> Result </Text>
        <Text>
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
            onPress={() => { setIsOpen(true); }}
            size={20}
            style={{ marginTop: 2, marginLeft: 5 }}
            color={theme.colors.primary[500]}
          />
        )}
      </HStack>
    </>
  );
}
