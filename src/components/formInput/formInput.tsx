/* eslint-disable react/require-default-props */
import { FormControl, Input, VStack, Text } from "native-base";
import React from "react";

interface Props {
  required?: boolean;
  error?: string;
  helpText?: string;
  name: string;
  value: string;
  onBlur: (e: any) => void;
  onChangeText: (value: string) => void;
  type?: "text" | "password";
}

export function FormInput({
  name,
  value,
  onChangeText,
  onBlur,
  error = undefined,
  helpText = undefined,
  required = false,
  type = "text",
}: Props) {
  return (
    <VStack width="90%" mx="3" maxW="300px">
      <FormControl isRequired={required}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          {name}
        </FormControl.Label>
        <Input
          type={type}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
        />

        {helpText && (
          <FormControl.HelperText
            _text={{
              fontSize: "xs",
            }}
          >
            {helpText}
          </FormControl.HelperText>
        )}

        {error && (
          <Text textAlign="left" fontSize="xs" color="red.400">
            {error}
          </Text>
        )}
      </FormControl>
    </VStack>
  );
}
