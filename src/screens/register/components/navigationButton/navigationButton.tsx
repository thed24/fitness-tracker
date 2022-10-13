import { HStack, Button } from "native-base";
import React from "react";
import { GestureResponderEvent } from "react-native";

interface Props {
  minSteps: number;
  maxSteps: number;
  currentIndex: number;
  disabled: boolean;
  setIndex: (index: number) => void;
  onSubmit: (event: any) => void;
  loading?: boolean;
}

export function NavigationButton({
  minSteps = 0,
  maxSteps = 1,
  disabled,
  currentIndex,
  setIndex,
  onSubmit,
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

  return (
    <HStack
      justifyContent={currentIndex > minSteps ? "space-between" : "center"}
      space={4}
      mt={5}
      mb={20}
    >
      {currentIndex > minSteps && (
        <Button onPress={onClickPrevious}>
          Back
        </Button>
      )}

      {currentIndex < maxSteps && (
        <Button onPress={onClickNext}>
          Next
        </Button>
      )}

      {currentIndex === maxSteps && (
        <Button disabled={disabled} onPress={onSubmit} isLoading={loading}>
          Submit
        </Button>
      )}
    </HStack>
  );
}
