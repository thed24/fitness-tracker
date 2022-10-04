import React from "react";
import { Card as BaseCard, useTheme } from "native-base";

interface BaseProps {
  children: React.ReactNode;
  shadow?: string | number | undefined;
  full?: boolean;
}

type Props = BaseProps & React.ComponentProps<typeof BaseCard>;

export function Card({ children, shadow, full = true, ...props }: Props) {
  const theme = useTheme();

  const extraProps = full
    ? {}
    : {
        w: "95%",
        mx: "auto",
      };

  return (
    <BaseCard
      backgroundColor={theme.colors.white}
      shadow="none"
      style={{
        borderRadius: 10,
      }}
      {...extraProps}
      {...props}
    >
      {children}
    </BaseCard>
  );
}

Card.defaultProps = {
  shadow: 2,
};
