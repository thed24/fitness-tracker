/* eslint-disable react/no-children-prop */
import { Input } from "components";
import {
  Divider,
  InputGroup,
  InputRightAddon,
  Stack,
  useColorModeValue,
  useTheme,
} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  value: string | number | undefined;
  onChange: (value: string) => void;
  icon: string;
  placeholder: string;
  suffix?: string;
}

export function UserField({
  value,
  onChange,
  icon,
  placeholder,
  suffix = undefined,
}: Props) {
  const theme = useTheme();
  const [focused, setFocused] = React.useState(false);
  const text = useColorModeValue(theme.colors.black, theme.colors.white);

  const addSuffix = (child: React.ReactNode) => (
    <Stack w="89%" alignItems="center">
      <InputGroup>
        {child}
        <InputRightAddon borderRadius={10} w={10} children={suffix} />
      </InputGroup>
    </Stack>
  );

  const input = (
    <Input
      w="90%"
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      type="text"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      color={focused ? theme.colors.primary[500] : text}
      leftElement={
        <>
          <Icon
            name={icon}
            size={24}
            color={focused ? theme.colors.primary[500] : theme.colors.gray[400]}
            style={{ marginLeft: 10 }}
          />
          <Divider
            backgroundColor={
              focused ? theme.colors.primary[500] : theme.colors.gray[400]
            }
            orientation="vertical"
            ml={2}
            h="3/4"
          />
        </>
      }
    />
  );

  return suffix ? addSuffix(input) : input;
}
