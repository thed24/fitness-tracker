/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Card as BaseCard, useTheme } from "native-base";
import { InterfaceCardProps } from "native-base/lib/typescript/components/composites/Card/types";

interface BaseProps {
    children: React.ReactNode;
}

type Props = BaseProps & InterfaceCardProps;

export function Card({ children, ...props }: Props) {
  const theme = useTheme();
  return (
    <BaseCard {...props} bg={theme.colors.white} shadow={2} borderRadius={4}>
      {children}
    </BaseCard>
  );
}
