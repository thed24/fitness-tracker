import { HStack, useTheme, Text, View, ChevronRightIcon } from "native-base";
import React, { useState } from "react";
import { useStore } from "store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardioData, CardioExercise, Workout } from "types";
import { CardioModal } from "./cardioModal";

interface Props {
  activity: CardioExercise & CardioData;
  workout: Workout;
}

export function CardioRow({ activity, workout }: Props) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const { getDistanceFormatter } = useStore();
  const distanceFormatter = getDistanceFormatter();

  return (
    <>
      <CardioModal
        activity={activity}
        workout={workout}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <HStack>
        <Text fontSize={16} fontWeight="bold"> Goal </Text>
        <Text>
          {distanceFormatter(
            `${activity.targetDistance} in ${activity.targetDuration}`,
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
          {activity.distance || activity.duration
            ? distanceFormatter(
                `${activity.distance} in ${activity.duration}`,
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
