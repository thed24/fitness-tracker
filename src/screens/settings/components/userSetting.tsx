import { Card, Text, useTheme, HStack } from "native-base";
import React from "react";
import { RadioButton } from "react-native-paper";
import { SettingSection } from "../settingsSections";

interface Props {
  item: SettingSection;
  onChange: (value: string) => void;
  value: string;
}

export function UserSetting({ item, onChange, value }: Props) {
  const theme = useTheme();

  return (
    <Card
      w="95%"
      marginLeft="auto"
      marginRight="auto"
      _text={{ fontSize: "md" }}
      my={2}
      px={2}
    >
      <Text mb={2}>{item.title}</Text>
      <RadioButton.Group onValueChange={onChange} value={value}>
        {item.options.map((option) => (
          <HStack textAlign="center">
            <RadioButton color={theme.colors.primary[600]} value={option.value} key={option.title} />
            <Text mt="1.5">{option.title}</Text>
          </HStack>
        ))}
        </RadioButton.Group>
    </Card>
  );
}
