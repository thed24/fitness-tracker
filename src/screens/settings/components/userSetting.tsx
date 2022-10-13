import { Radio, Card, Text, useTheme } from "native-base";
import React from "react";
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
      <Radio.Group
        name={item.title}
        direction="row"
        space={4}
        defaultValue={value}
        onChange={onChange}
      >
        {item.options.map((option) => (
          <Radio value={option.value} key={option.title}>
            <Text>{option.title}</Text>
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
}
