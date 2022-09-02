import { HStack } from "native-base";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Button } from "../button/button";

interface Props {
  minSteps: number;
  maxSteps: number;
  currentIndex: number;
  disabled: boolean;
  setIndex: (index: number) => void;
  onSubmit: (event: any) => void;
}

export function NavigationButton({
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
    <HStack
      justifyContent="center"
      position="absolute"
      bottom={5}
      space={4}
      alignItems="center"
      marginTop="10"
      w="75%"
    >
      {currentIndex > minSteps && (
        <Button size="md" onPress={onClickPrevious}>
          Back
        </Button>
      )}

      {currentIndex < maxSteps && (
        <Button size="md" onPress={onClickNext}>
          Next
        </Button>
      )}

      {currentIndex === maxSteps && (
        <Button disabled={disabled} size="md" onPress={onSubmit}>
          Submit
        </Button>
      )}
    </HStack>
  );
}
