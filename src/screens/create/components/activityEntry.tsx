import { useStore } from "store";
import { Activity } from "types";
import { DeleteIcon, HStack, IconButton, Text } from "native-base";
import React from "react";

interface Props {
  activity: Activity;
  deleteActivity: () => void;
}

export function ActivityEntry({ activity, deleteActivity }: Props) {
  const { weightFormatter, distanceFormatter } = useStore();

  const createChild = (currActivity: Activity) => {
    switch (currActivity.type) {
      case "strength":
        return (
          <Text key={`${currActivity.name}-text`}>
            <Text fontWeight="bold" key={`${currActivity.name}-text-title`}>
              {currActivity.name.trim()}
            </Text>
            {": "}
            {currActivity.sets}x{currActivity.reps},{" "}
            {weightFormatter(currActivity.weight.toString(), false)}
          </Text>
        );
      case "cardio":
        return (
          <Text key={`${currActivity.name}-text`}>
            <Text fontWeight="bold" key={`${currActivity.name}-text-title`}>
              {currActivity.name}
            </Text>
            {": "}
            {distanceFormatter(currActivity.distance.toString(), false)} in{" "}
            {currActivity.duration} minutes
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
            color="coolGray.600"
          />
        }
      />
    </HStack>
  );
}
