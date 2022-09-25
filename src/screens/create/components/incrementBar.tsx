import { Button, FormLabel, Input } from "components";
import { HStack, useTheme } from "native-base";
import React from "react";

interface Props {
  name: string;
  value: number;
  onChange: (newValue: string) => void;
  increments: number[];
}

export function IncrementBar({ value, onChange, name, increments }: Props) {
  const theme = useTheme();

  const createIncrementHandler = (increment: number) => () => {
    onChange((value + increment).toString());
  };

  const createButton = (increment: number) => (
    <Button
      key={increment}
      onPress={createIncrementHandler(increment)}
      size="xs"
      backgroundColor={theme.colors.white}
      borderColor={theme.colors.gray[300]}
      borderWidth={1}
      textAlign="center"
      _text={{ color: theme.colors.gray[500] }}
    >
      {increment > 0 ? `+\n${increment}` : `-\n${-increment}`}
    </Button>
  );

  const handleInputChange = (newValue: string) => {
    if (newValue === "") {
      onChange("0");
    } else {
      onChange(newValue);
    }
  };

  return (
    <>
      <FormLabel mt={1}>{name}</FormLabel>
      <HStack justifyContent="space-between" alignContent="center">
        {increments
          .filter((i) => i > 0)
          .map((increment) => createButton(increment))}
        <Input
          w={16}
          textDecorationLine="underline"
          value={value.toString()}
          onChangeText={handleInputChange}
          placeholder="0"
          type="text"
          textAlign="center"
        />
        {increments
          .filter((i) => i < 0)
          .map((increment) => createButton(increment))}
      </HStack>
    </>
  );
}
