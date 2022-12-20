import { Button, FormLabel, Input } from 'components';
import { Box, HStack, Text, useTheme } from 'native-base';
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
  const theme = useTheme();

  const createButton = useCallback((increment: number) => {
    const incrementHandler = () => onChange((value + increment).toString());

    return (
      <Button
        key={increment}
        style={{ 
          width: "18%", 
          borderRadius: 0, 
          backgroundColor: increment > 0 ? theme.colors.primary[500] : theme.colors.red[500] }}
        variant="primary"
        onPress={incrementHandler}
      >
        {Math.abs(increment)}
      </Button>
    );
  },
    [onChange, theme.colors.primary, theme.colors.red, value],
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
    <Box w="100%">
      <HStack>
        <FormLabel mt={1}>{name}</FormLabel>
        {titleAccessory && (
          <Text fontSize="xs" ml="auto">
            {titleAccessory}
          </Text>
        )}
        </HStack>
      <HStack alignContent="center">
        {positiveIncrements}
        <Input
          w={16}
          rounded={0}
          value={value.toString()}
          onChangeText={handleInputChange}
          placeholder="0"
          type="text"
          textAlign="center"
          h="99%"
          borderColor={theme.colors.white}
        />
        {negativeIncrements}
      </HStack>
    </Box>
  );
}

export const IncrementBar = React.memo(IncrementBarInternal);