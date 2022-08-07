import React from "react";
import { Button as BaseButton } from "native-base";
import {
  ColorSchemeType,
  ColorType,
} from "native-base/lib/typescript/components/types";

interface Props {
  disabled?: boolean;
  onPress?: (event: any) => void;
  centered?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  anchored?: boolean;
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
  anchored,
}: Props) {
  const color: ColorType = disabled ? "gray.300" : "primary.600";
  const borderColor: ColorType = disabled ? "gray.500" : "primary.800";

  let width;
  if (size === "sm") {
    width = "25%";
  } else if (size === "md") {
    width = "50%";
  } else if (size === "lg") {
    width = "75%";
  } else {
    width = "90%";
  }

  let style = {};

  if (centered) {
    style = {
      ...style,
      alignSelf: "center",
    };
  }

  if (anchored) {
    style = {
      ...style,
      posisition: "absolute",
      bottom: 5,
    };
  }

  return (
    <BaseButton
      colorScheme={colorScheme}
      marginTop={4}
      width={width}
      borderWidth={2}
      borderColor={borderColor}
      disabled={disabled}
      bg={color}
      onPress={onPress}
      style={style}
    >
      {children}
    </BaseButton>
  );
}

Button.defaultProps = {
  disabled: false,
  colorScheme: "solid",
  centered: false,
  anchored: false,
  size: "md",
  onPress: () => {},
};
