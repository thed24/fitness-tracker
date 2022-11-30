import { FormControl, VStack, HStack } from "native-base";
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
            <FormLabel variant="error">
              {" "}
              *
            </FormLabel>
          )}
        </HStack>

        <Input
          accessibilityLabel={`${name} input`}
          mb={2}
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
          <FormLabel variant="error">
            {error}
          </FormLabel>
        )}
      </FormControl>
    </VStack>
  );
}
