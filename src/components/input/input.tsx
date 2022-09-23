/* eslint-disable react/require-default-props */
import React from "react";
import { Input as InputBase, useTheme } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  value: string | undefined;
  onChangeText: (value: string) => void;
  onBlur?: (value: any) => void;
  placeholder: string | undefined;
  type: "text" | "password";
}

export function Input({
  value,
  onChangeText,
  placeholder,
  type,
  onBlur = () => {},
}: Props) {
  const [hidden, setHidden] = React.useState(type === "password");
  const theme = useTheme();

  const rightElement =
    type === "password" ? (
      <Icon
        style={{
          fontSize: 20,
          color: theme.colors.gray[400],
          paddingRight: 10,
        }}
        name={hidden ? "ios-eye-off-sharp" : "ios-eye-sharp"}
        onPress={() => setHidden(!hidden)}
      />
    ) : undefined;

  return (
    <InputBase
      value={value}
      onChangeText={onChangeText}
      borderRadius={10}
      backgroundColor="white"
      type={type === "password" || hidden ? "password" : "text"}
      rightElement={rightElement}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
}