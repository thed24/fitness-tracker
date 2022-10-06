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
  size: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
}

export function NavigationButton({
  minSteps = 0,
  maxSteps = 1,
  disabled,
  currentIndex,
  setIndex,
  onSubmit,
  size,
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

  let width;
  switch (size) {
    case "sm":
      width = "50%";
      break;
    case "md":
      width = "75%";
      break;
    case "lg":
      width = "86%";
      break;
    case "xl":
      width = "100%";
      break;
    default:
      width = "100%";
  }

  return (
    <HStack
      justifyContent="center"
      space={4}
      alignItems="center"
      marginTop={5}
      marginBottom={20}
      w={width}
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
        <Button disabled={disabled} size="md" onPress={onSubmit} loading={loading}>
          Submit
        </Button>
      )}
    </HStack>
  );
}
