import { Box, HStack } from "native-base";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Button } from "components";

interface Props {
  currentIndex: number;
  disabled: boolean;
  setIndex: (index: number) => void;
  onSubmit: (event: any) => void;
  onAddActivity: (event: GestureResponderEvent) => void;
  loading?: boolean;
}

export function NavigationButtons({
  disabled,
  currentIndex,
  setIndex,
  onSubmit,
  onAddActivity,
  loading = false,
}: Props) {
  const onClickNext = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIndex(currentIndex + 1);
  };

  const onClickPrevious = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIndex(currentIndex - 1);
  };

  const onCancel = (event: GestureResponderEvent) => {
    event.preventDefault();
    setIndex(0);
  };

  return (
    <Box mt={5} mb={20}>
      {currentIndex === 0 && (
        <HStack space={2} justifyContent="space-between">
          <Button size="md" onPress={onClickNext}>
            Add New Workout
          </Button>
          <Button
            size="md"
            onPress={onSubmit}
            disabled={disabled}
            loading={loading}
          >
            Submit
          </Button>
        </HStack>
      )}

      {currentIndex === 1 && (
        <Button size="xl" onPress={onClickPrevious}>
          Back
        </Button>
      )}

      {currentIndex === 2 && (
        <HStack space={2} justifyContent="space-between">
          <Button variant="outline" size="md" onPress={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={disabled}
            loading={loading}
            size="md"
            onPress={onAddActivity}
          >
            Add Activity
          </Button>
        </HStack>
      )}
    </Box>
  );
}
