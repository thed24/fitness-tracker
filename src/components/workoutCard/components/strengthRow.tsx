import { HStack, useTheme, Text, ChevronRightIcon, View, Pressable } from "native-base";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StrengthActivity, Workout } from "types";
import { getWeightFormatter } from "utils";
import { useGetUser } from "api";
import { useNavigation } from "@react-navigation/native";
import { StrengthModal } from "./strengthModal";

interface Props {
  activity: StrengthActivity;
  workout: Workout;
}

export function StrengthRow({ activity, workout }: Props) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useGetUser();
  const weightFormatter = getWeightFormatter(user);

  return (
    <>
      <StrengthModal
        activity={activity}
        workout={workout}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Pressable onPress={() => navigation.navigate("Activity" as never, { mainActivityId: activity.id } as never)}>
        <HStack>
            <Text fontSize={16} fontWeight="bold"> Goal </Text>
            <Text my="auto">
              {weightFormatter(`${activity.targetSets} x ${activity.targetReps} at ${activity.targetWeight}`, false)}
            </Text>
            <View ml="auto" mt={2}>
              <ChevronRightIcon />
            </View>
        </HStack>
      </Pressable>

      <HStack>
      <Text fontSize={16} fontWeight="bold"> Result </Text>
        <Text my="auto">
          {activity.sets && activity.reps && activity.weight
            ? weightFormatter(`${activity.sets} x ${activity.reps} at ${activity.weight}`, false)
            : "Uncompleted"}
        </Text>

        {(!workout.completed && !workout.past) && (
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
