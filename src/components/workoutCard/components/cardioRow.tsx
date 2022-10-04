import { HStack, useTheme, Text } from "native-base";
import React from "react";
import { useStore } from "store";
import Icon from "react-native-vector-icons/Ionicons";
import { CardioData, CardioExercise, Workout } from "types";
import { CardioModal } from "./cardioModal";

interface Props {
  activity: CardioExercise & CardioData;
  workout: Workout;
}

export function CardioRow({ activity, workout }: Props) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const { getWeasurementFormatter } = useStore();
  const measurementFormatter = getWeasurementFormatter();

  return (
    <>
      <CardioModal
        activity={activity}
        workout={workout}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Text my="auto">
        Goal:{" "}
        {measurementFormatter(
          `${activity.targetDistance} / ${activity.targetDuration}`,
          false
        )}
      </Text>
      <HStack>
        <Text my="auto">
          Result:{" "}
          {activity.distance || activity.duration
            ? measurementFormatter(
                `${activity.distance} / ${activity.duration}`,
                false
              )
            : "Uncompleted"}
        </Text>
        {!workout.completed && (
          <Icon
            style={{ marginLeft: "auto" }}
            name="ios-build-sharp"
            onPress={() => {
              setIsOpen(true);
            }}
            size={20}
            color={theme.colors.gray[700]}
          />
        )}
      </HStack>
    </>
  );
}
