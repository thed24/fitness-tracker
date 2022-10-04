import { useStore } from "store";
import { Activity } from "types";
import { DeleteIcon, HStack, IconButton, Text, useTheme } from "native-base";
import React from "react";

interface Props {
  activity: Activity;
  deleteActivity: () => void;
}

export function ActivityEntry({ activity, deleteActivity }: Props) {
  const { getWeightFormatter, getDistanceFormatter } = useStore();
  const theme = useTheme();

  const weightFormatter = getWeightFormatter();
  const distanceFormatter = getDistanceFormatter();

  const createChild = (currActivity: Activity) => {
    switch (currActivity.type) {
      case "strength":
        return (
          <Text key={`${currActivity.name}-text`} my={2}>
            <Text fontWeight="bold" key={`${currActivity.name}-text-title`}>
              {currActivity.name.trim()}
            </Text>
            {"\n"}
            {currActivity.targetSets}x{currActivity.targetReps},{" "}
            {weightFormatter(currActivity.targetWeight.toString(), false)}
          </Text>
        );
      case "cardio":
        return (
          <Text key={`${currActivity.name}-text`} my={2}>
            <Text fontWeight="bold" key={`${currActivity.name}-text-title`}>
              {currActivity.name}
            </Text>
            {"\n"}
            {distanceFormatter(currActivity.targetDistance.toString(), false)} in{" "}
            {currActivity.targetDuration} minutes
          </Text>
        );
      default:
        return <Text key="no-activties-text"> Unsupported exercise type </Text>;
    }
  };

  return (
    <HStack key={`${activity.name}-hstack`} alignItems="center">
      {createChild(activity)}
      <IconButton
        onPress={deleteActivity}
        key={`${activity.name}-delete-button`}
        ml="auto"
        icon={
          <DeleteIcon
            key={`${activity.name}-delete-icon`}
            color={theme.colors.gray[500]}
          />
        }
      />
    </HStack>
  );
}
