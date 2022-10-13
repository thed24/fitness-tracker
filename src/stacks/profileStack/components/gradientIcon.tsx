import { Box, useTheme } from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  name: string;
  focused: boolean;
}

export function GradientIcon({ name, focused }: Props) {
  const theme = useTheme();

  const color = () => focused ? theme.colors.primary[500] : theme.colors.gray[300];
  const gradient = () => {
    const value = {
      colors: focused
        ? [theme.colors.primary[400], theme.colors.violet[700]]
        : [theme.colors.gray[300], theme.colors.gray[400]],
      start: [0, 0],
      end: [1, 0],
    };
    return value;
  };

  return (
    <Box
      bg={{
        linearGradient: gradient(),
      }}
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: -3.5,
        height: 45,
        width: 45,
        borderRadius: 45,
      }}
    >
      <Icon
        name={name}
        size={50}
        color="white"
        selectionColor={color()}
        style={{
          position: "absolute",
          top: -3,
          left: -1,
        }}
      />
    </Box>
  );
}
