import { Button } from "components";
import { VStack } from "native-base";
import React from "react";
import { GestureResponderEvent } from "react-native";

interface Props {
  minSteps: number;
  maxSteps: number;
  currentIndex: number;
  disabled: boolean;
  setIndex: (index: number) => void;
  onSubmit: (event: any) => void;
}

export function Navigation({
  minSteps = 0,
  maxSteps = 1,
  disabled,
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
    <VStack position="absolute" bottom={5} space={4} alignItems="center" marginTop="10" w="75%">
      {currentIndex > minSteps && (
        <Button
          disabled={disabled}
          size="xl"
          onPress={onClickPrevious}
        >
          Back
        </Button>
      )}

      {currentIndex < maxSteps && (
        <Button
          disabled={disabled}
          size="xl"
          onPress={onClickNext}
        >
          Next
        </Button>
      )}

      {currentIndex === maxSteps && (
        <Button
          disabled={disabled}
          size="xl"
          onPress={onSubmit}
        >
          Submit
        </Button>
      )}
    </VStack>
  );
}
