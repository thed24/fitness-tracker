import React from "react";
import { Input as InputBase, useTheme } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

interface InputProps {
  value: string | number | undefined;
  onChangeText: (value: string) => void;
  onBlur?: (value: any) => void;
  placeholder: string | undefined;
  type: "text" | "password";
}

type Props = Omit<React.ComponentProps<typeof InputBase>, "value"> & InputProps;

export function Input({
  value,
  onChangeText,
  placeholder,
  type,
  onBlur = () => {},
  ...props
}: Props) {
  const [hidden, setHidden] = React.useState(type === "password");
  const theme = useTheme();

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
      accessibilityLabel={`${value} input`}
      value={valueAsString}
      onChangeText={onChangeText}
      borderRadius={10}
      borderWidth={1}
      backgroundColor="white"
      type={hidden ? "password" : "text"}
      rightElement={rightElement}
      onBlur={onBlur}
      caretHidden={false}
      placeholder={placeholder}
      color={theme.colors.black}
      _input={{
        _focus: {
          borderColor: theme.colors.primary[500],
        },
        _hover: {
          borderColor: theme.colors.primary[500],
        },
        _invalid: {
          borderColor: theme.colors.red[500],
        },
      }}
      {...props}
    />
  );
}
