import { FormControl, VStack, Text, HStack } from "native-base";
import React from "react";
import { FormLabel } from "../formLabel/formLabel";
import { Input } from "../input/input";

interface Props {
  required?: boolean;
  error?: string;
  helpText?: string;
  name: string;
  placeholder?: string | undefined;
  value: string | number | undefined;
  onBlur: (e: any) => void;
  onChangeText: (value: string) => void;
  hideLabel?: boolean;
  type?: "text" | "password";
}

export function FormInput({
  name,
  value,
  onChangeText,
  onBlur,
  hideLabel = false,
  placeholder = undefined,
  error = undefined,
  helpText = undefined,
  required = false,
  type = "text",
}: Props) {
  return (
    <VStack width="100%">
      <FormControl isRequired={required}>
        <HStack>
          {!hideLabel && <FormLabel>{name}</FormLabel>}
          {required && !hideLabel && (
            <Text textAlign="left" fontSize="xs" color="red.400">
              {" "}
              *
            </Text>
          )}
        </HStack>

        <Input
          type={type}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
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
