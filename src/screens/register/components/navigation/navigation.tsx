import { Button, HStack } from "native-base";
import React from "react";
import { GestureResponderEvent } from "react-native";

interface Props {
  minSteps: number;
  maxSteps: number;
  currentIndex: number;
  setIndex: (index: number) => void;
  onSubmit: (event: any) => void;
}

export function Navigation({
  minSteps = 0,
  maxSteps = 1,
  currentIndex,
  setIndex,
  onSubmit,
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
    <HStack space={4} alignItems="center" marginTop="10">
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
        <Button onPress={onSubmit}>
          Submit
        </Button>
      )}
    </HStack>
  );
}
