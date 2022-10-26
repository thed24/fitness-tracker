import { Box, Button, HStack } from "native-base";
import React from "react";
import { GestureResponderEvent } from "react-native";

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
    <Box mt={5} mb={2}>
      {currentIndex === 0 && (
        <HStack justifyContent="center" space={2}>
          <Button onPress={onClickNext}>
            Add New Workout
          </Button>
          <Button
            onPress={onSubmit}
            isDisabled={disabled}
            isLoading={loading}
          >
            Submit
          </Button>
        </HStack>
      )}

      {currentIndex === 1 && (
        <Button onPress={onClickPrevious}>
          Back
        </Button>
      )}

      {currentIndex === 2 && (
        <HStack space={2} justifyContent="center">
          <Button onPress={onCancel}>
            Cancel
          </Button>
          <Button onPress={onAddActivity}>
            Add Activity
          </Button>
        </HStack>
      )}
    </Box>
  );
}
