import { HStack, useTheme, Text, View, ChevronRightIcon, Pressable } from "native-base";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardioActivity, Workout } from "types";
import { useGetUser } from "api";
import { getDistanceFormatter } from "utils";
import { useNavigation } from "@react-navigation/native";
import { CardioModal } from "./cardioModal";

interface Props {
  activity: CardioActivity;
  workout: Workout;
}

export function CardioRow({ activity, workout }: Props) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useGetUser();
  const distanceFormatter = getDistanceFormatter(user);

  return (
    <>
      <CardioModal
        activity={activity}
        workout={workout}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Pressable onPress={() => navigation.navigate("Activity" as never, { mainActivityId: activity.id } as never)}>
        <HStack>
          <Text fontSize={16} fontWeight="bold"> Goal </Text>
          <Text my="auto">
            {distanceFormatter(
              `${activity.targetDistance} in ${activity.targetDuration}`,
              false
            )}
          </Text>
          <View ml="auto" mt={2}>
            <ChevronRightIcon />
          </View>
        </HStack>
      </Pressable>

      <HStack>
      <Text fontSize={16} fontWeight="bold"> Result </Text>
        <Text my="auto">
          {activity.distance || activity.duration
            ? distanceFormatter(
                `${activity.distance} in ${activity.duration}`,
                false
              )
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
