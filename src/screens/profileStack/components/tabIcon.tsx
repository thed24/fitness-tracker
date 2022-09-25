import { useTheme } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

export type IoniconsIconsNames = keyof typeof Ionicons.glyphMap;

interface Props {
  name: IoniconsIconsNames;
  focused: boolean;
}

export function TabIcon({ focused, name }: Props) {
  const theme = useTheme();
  const colors = [theme.colors.gray[300], theme.colors.primary[500]];

  return (
    <MotiView animate={{ scale: focused ? 1.2 : 1 }} transition={{ type: "spring" }}>
      <Ionicons name={name} size={30} color={colors[focused ? 1 : 0]} />
    </MotiView>
  );
}
