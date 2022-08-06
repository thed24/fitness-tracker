import { Button, VStack } from "native-base";
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
    <VStack space={4} alignItems="center" marginTop="10">
      {currentIndex > minSteps && (
        <Button
          margin="15px"
          paddingLeft="70px"
          paddingRight="70px"
          onPress={onClickPrevious}
        >
          Back
        </Button>
      )}

      {currentIndex < maxSteps && (
        <Button
          margin="5px"
          paddingLeft="63px"
          paddingRight="63px"
          onPress={onClickNext}
        >
          Next
        </Button>
      )}

      {currentIndex === maxSteps && (
        <Button
          margin="5px"
          paddingLeft="63px"
          paddingRight="63px"
          onPress={onSubmit}
        >
          Submit
        </Button>
      )}
    </VStack>
  );
}
