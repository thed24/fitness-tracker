import { Alert, HStack, Stack, Text, VStack } from "native-base";
import React from "react";

interface Props {
    title: string;
    description: string;
    variant: "left-accent" | "top-accent" | "subtle" | "solid" | "outline";
    colorScheme: "success" | "error" | "warning" | "info";
}

export function ToastBody({ title, description, variant, colorScheme }: Props) {
    return (
        <Stack w="100%" space={2}>
            <Alert w="100%" status={colorScheme} variant={variant}>
                <HStack space={2} mr="auto">
                    <Alert.Icon my={1} />
                    <VStack space={2} pr={5}>
                        <Text fontSize="md">{title}</Text>
                        <Text mr="auto" fontSize="sm">{description}</Text>
                    </VStack>
                </HStack>
            </Alert>
        </Stack>
    );
};