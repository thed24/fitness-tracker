/* eslint-disable react/require-default-props */
import { FormControl, Input, VStack, Text, HStack } from "native-base";
import React from "react";
import { FormLabel } from "../formLabel/formLabel";

interface Props {
  required?: boolean;
  error?: string;
  helpText?: string;
  name: string;
  value: string | number | undefined;
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
  let valueAsString;

  if (typeof value === "number" && !Number.isNaN(value)) {
    valueAsString = value.toString();
  }
  if (typeof value === "number" && Number.isNaN(value)) {
    valueAsString = "";
  }
  if (typeof value === "string") {
    valueAsString = value;
  }
  if (typeof value === "undefined") {
    valueAsString = "";
  }

  return (
    <VStack width="100%">
      <FormControl isRequired={required}>
        <HStack>
          <FormLabel>{name}</FormLabel>
          {required && <Text textAlign="left" fontSize="xs" color="red.400">
            {" "}*
          </Text>}
        </HStack>
        <Input
          type={type}
          value={valueAsString}
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
