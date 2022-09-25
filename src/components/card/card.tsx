import React from "react";
import { Card as BaseCard, useTheme } from "native-base";

interface BaseProps {
  children: React.ReactNode;
  shadow?: string | number | undefined;
}

type Props = BaseProps & React.ComponentProps<typeof BaseCard>;

export function Card({ children, shadow, ...props }: Props) {
  const theme = useTheme();
  return (
    <BaseCard
      bg={theme.colors.white}
      shadow={shadow ?? "none"}
      rounded={8}
      {...props}
    >
      {children}
    </BaseCard>
  );
}

Card.defaultProps = {
  shadow: 2
};
