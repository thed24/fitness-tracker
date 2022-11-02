import { Button, FormLabel, Input } from 'components';
import { HStack } from 'native-base';
import React, { useCallback, useMemo } from 'react';

interface Props {
  name: string;
  value: number;
  onChange: (newValue: string) => void;
  increments: number[];
  titleAccessory?: React.ReactNode;
}

function IncrementBarInternal({
  value,
  onChange,
  name,
  increments,
  titleAccessory,
}: Props) {
  const createButton = useCallback((increment: number) => {
    const incrementHandler = () => onChange((value + increment).toString());
    const text = increment > 0 ? `+${increment}` : `-${-increment}`;

    return (
      <Button
        key={increment}
        variant="secondary"
        onPress={incrementHandler}
      >
        {text}
      </Button>
    );
  },
    [onChange, value],
  );

  const handleInputChange = (newValue: string) => {
    if (newValue === '') {
      onChange('0');
    } else {
      onChange(newValue);
    }
  };

  const positiveIncrements = useMemo(() => increments.filter((i) => i > 0).map(createButton), [createButton, increments]);
  const negativeIncrements = useMemo(() => increments.filter((i) => i < 0).map(createButton), [createButton, increments]);

  return (
    <>
      <HStack justifyContent="space-between" mb={1}>
        <FormLabel mt={1}>{name}</FormLabel>
        {titleAccessory}
      </HStack>
      <HStack justifyContent="space-between" alignContent="center">
        {positiveIncrements}
        <Input
          w={16}
          textDecorationLine="underline"
          value={value.toString()}
          onChangeText={handleInputChange}
          placeholder="0"
          type="text"
          textAlign="center"
        />
        {negativeIncrements}
      </HStack>
    </>
  );
}

export const IncrementBar = React.memo(IncrementBarInternal);