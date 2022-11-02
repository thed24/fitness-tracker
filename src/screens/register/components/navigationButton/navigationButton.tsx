import { Button } from 'components';
import { HStack } from 'native-base';
import React from 'react';

interface Props {
  currentIndex: number;
  disabled: boolean;
  setIndex: (index: number) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export function NavigationButton({
  disabled,
  currentIndex,
  setIndex,
  onSubmit,
  loading = false,
}: Props) {
  const onClickNext = () => {
    setIndex(currentIndex + 1);
  };

  const onClickPrevious = () => {
    setIndex(currentIndex - 1);
  };

  return (
    <>
      {currentIndex === 0 && (
        <Button onPress={onClickNext}>
          Next
        </Button>
      )}

      {currentIndex === 1 && (
        <HStack space={2}>
          <Button onPress={onClickPrevious}>
            Back
          </Button>
          <Button onPress={onClickNext}>
            Next
          </Button>
        </HStack>
      )}

      {currentIndex === 2 && (
        <Button
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
