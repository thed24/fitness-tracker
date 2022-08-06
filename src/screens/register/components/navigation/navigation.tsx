import { Button, VStack } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
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

  const color: ColorType = disabled ? "gray.300" : "primary.600";

  return (
    <VStack space={4} alignItems="center" marginTop="10" w="75%">
      {currentIndex > minSteps && (
        <Button
          marginLeft="auto"
          marginRight="auto"
          disabled={disabled}
          w="90%"
          bg={color}
          onPress={onClickPrevious}
        >
          Back
        </Button>
      )}

      {currentIndex < maxSteps && (
        <Button
          marginLeft="auto"
          marginRight="auto"
          disabled={disabled}
          w="90%"
          bg={color}
          onPress={onClickNext}
        >
          Next
        </Button>
      )}

      {currentIndex === maxSteps && (
        <Button
          marginLeft="auto"
          marginRight="auto"
          disabled={disabled}
          w="90%"
          bg={color}
          onPress={onSubmit}
        >
          Submit
        </Button>
      )}
    </VStack>
  );
}
