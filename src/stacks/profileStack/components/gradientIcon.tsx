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
        bottom: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: 57,
        borderRadius: 100,
      }}
    >
      <Icon
        name={name}
        style={{ marginLeft: 2 }}
        size={50}
        color="white"
        selectionColor={color()}
      />
    </Box>
  );
}
