import React from "react";
import { Badge as BaseBadge, Spinner, useTheme } from "native-base";

interface Props {
  onClick?: () => void;
  loading?: boolean;
  side: "left" | "right";
  children: React.ReactNode;
  background?: boolean;
}

export function Badge({ onClick, loading, children, side, background = true }: Props) {
  const theme = useTheme();

  return (
    <BaseBadge
      accessibilityLabel="badge"
      onTouchStart={onClick}
      bgColor={background ? theme.colors.primary[600] : "transparent"}
      rounded="full"
      zIndex={1}
      variant="solid"
      alignSelf="flex-end"
      position="absolute"
      top="1"
      right={side === "right" ? "2" : undefined}
      left={side === "left" ? "2" : undefined}
      shadow="10"
    >
      {loading && <Spinner color={theme.colors.primary[300]} />}
      {!loading && children}
    </BaseBadge>
  );
}
