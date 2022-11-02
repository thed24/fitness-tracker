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
  const key = (opt: { title: string, value: string }) => `${item.key}-${opt.value}-${value}`;

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
          <HStack key={`${key(option)}-stack`} textAlign="center">
            <RadioButton key={`${key(option)}-radio`} color={theme.colors.primary[600]} value={option.value}/>
            <Text key={`${key(option)}-text`} mt="1.5">{option.title}</Text>
          </HStack>
        ))}
        </RadioButton.Group>
    </Card>
  );
}
