import React from "react";
import {
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
} from "native-base";

interface Props {
  errors: string[];
  clearErrors: () => void;
}

export function ErrorAlert({ errors, clearErrors }: Props) {
  return (
    <Alert marginTop="10" w="80%" status="error" colorScheme="info">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack flexShrink={1} space={2} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
              Error!
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            onPress={clearErrors}
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" color="coolGray.600" />}
          />
        </HStack>
        {errors.map((error: string) => (
          <Text key={error.length} fontSize="sm" color="coolGray.600">
            {error}
          </Text>
        ))}
      </VStack>
    </Alert>
  );
}
