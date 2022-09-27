import React from "react";
import { Badge as BaseBadge, Spinner, useTheme } from "native-base";

interface Props {
  onClick?: () => void;
  loading?: boolean;
  side: "left" | "right";
  children: React.ReactNode;
}

export function Badge({ onClick, loading, children, side }: Props) {
  const theme = useTheme();

  return (
    <BaseBadge
      onTouchStart={onClick}
      bgColor={theme.colors.primary[600]}
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
