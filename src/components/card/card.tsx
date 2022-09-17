/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Card as BaseCard, useTheme } from "native-base";
import { InterfaceCardProps } from "native-base/lib/typescript/components/composites/Card/types";

interface BaseProps {
  children: React.ReactNode;
  shadow?: string | number | undefined;
}

type Props = BaseProps & InterfaceCardProps;

export function Card({ children, shadow, ...props }: Props) {
  const theme = useTheme();
  return (
    <BaseCard
      bg={theme.colors.white}
      shadow={shadow ?? "none"}
      borderRadius={4}
      {...props}
    >
      {children}
    </BaseCard>
  );
}

Card.defaultProps = {
  shadow: 2
};
