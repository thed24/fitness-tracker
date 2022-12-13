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
        <Button style={{ width: '90%' }} onPress={onClickNext}>
          Next
        </Button>
      )}

      {currentIndex === 1 && (
        <HStack space={2}>
          <Button style={{ width: '45%' }} onPress={onClickPrevious}>
            Back
          </Button>
          <Button style={{ width: '45%' }} onPress={onClickNext}>
            Next
          </Button>
        </HStack>
      )}

      {currentIndex === 2 && (
        <HStack space={2}>
          <Button style={{ width: '45%' }} onPress={onClickPrevious}>
            Back
          </Button>
          <Button
            style={{ width: '45%' }}
            isDisabled={disabled}
            onPress={onSubmit}
            isLoading={loading}
          >
            Submit
          </Button>
        </HStack>
      )}
    </>
  );
}
