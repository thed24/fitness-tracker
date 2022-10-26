import { Button, HStack } from 'native-base';
import React from 'react';
import { GestureResponderEvent } from 'react-native';

interface Props {
  currentIndex: number;
  disabled: boolean;
  setIndex: (index: number) => void;
  onSubmit: (event: any) => void;
  loading?: boolean;
}

export function NavigationButton({
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
    <>
      {currentIndex === 0 && (
        <Button w="70%" onPress={onClickNext}>
          Next
        </Button>
      )}

      {currentIndex === 1 && (
        <HStack space={2}>
          <Button w="34%" onPress={onClickPrevious}>
            Back
          </Button>
          <Button w="34%" onPress={onClickNext}>
            Next
          </Button>
        </HStack>
      )}

      {currentIndex === 2 && (
        <Button
          w="70%"
          isDisabled={disabled}
          onPress={onSubmit}
          isLoading={loading}
        >
          Submit
        </Button>
      )}
    </>
  );
}
