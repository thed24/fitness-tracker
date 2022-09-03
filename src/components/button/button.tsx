import React from "react";
import { Button as BaseButton, useTheme } from "native-base";
import {
  ColorSchemeType,
  ColorType,
} from "native-base/lib/typescript/components/types";

interface Props {
  disabled?: boolean;
  onPress?: (event: any) => void;
  centered?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  colorScheme?: ColorSchemeType;
  children: React.ReactNode;
}

export function Button({
  disabled,
  colorScheme,
  size,
  onPress,
  children,
  centered,
}: Props) {
  const theme = useTheme();
  const color: ColorType = disabled ? theme.colors.gray[300] : theme.colors.primary[500];

  let width;
  if (size === "sm") {
    width = "25%";
  } else if (size === "md") {
    width = "50%";
  } else if (size === "lg") {
    width = "80%";
  } else {
    width = "100%";
  }

  let style = {};
  if (centered) {
    style = {
      ...style,
      alignSelf: "center",
    };
  }

  return (
    <BaseButton
      colorScheme={colorScheme}
      textAlign="center"
      w={width}
      rounded={8}
      disabled={disabled}
      bg={color}
      onPress={onPress}
      style={style}
      _text={{
        color: "white",
        fontWeight: "semibold",
      }}
    >
      {children}
    </BaseButton>
  );
}

Button.defaultProps = {
  disabled: false,
  colorScheme: "solid",
  centered: false,
  size: "md",
  onPress: () => {},
};
