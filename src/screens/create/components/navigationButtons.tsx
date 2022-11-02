import { Button } from "components";
import { Box, HStack } from "native-base";
import React, { useCallback } from "react";

interface Props {
  currentIndex: number;
  disabled: boolean;
  setIndex: (index: number) => void;
  onSubmit: () => void;
  onAddActivity: () => void;
  loading?: boolean;
}

export function NavigationButtons({
  disabled,
  currentIndex,
  setIndex,
  onSubmit,
  onAddActivity,
  loading = false,
}: Props) {
  const onClickNext = useCallback(() => {
    setIndex(currentIndex + 1);
  }, [currentIndex, setIndex]);

  const onClickPrevious = useCallback(() => {
    setIndex(currentIndex - 1);
  }, [currentIndex, setIndex]);

  const onCancel = useCallback(() => {
    setIndex(0);
  }, [setIndex]);

  return (
    <Box mt={5} mb={2}>
      {currentIndex === 0 && (
        <HStack justifyContent="center" space={2}>
          <Button onPress={onClickNext}>
            Add New Activity
          </Button>
          <Button
            onPress={onSubmit}
            isDisabled={disabled}
            isLoading={loading}
          >
            Submit
          </Button>
        </HStack>
      )}

      {currentIndex === 1 && (
        <Button onPress={onClickPrevious}>
          Back
        </Button>
      )}

      {currentIndex === 2 && (
        <HStack space={2} justifyContent="center">
          <Button onPress={onCancel}>
            Cancel
          </Button>
          <Button onPress={onAddActivity}>
            Add Activity
          </Button>
        </HStack>
      )}
    </Box>
  );
}
