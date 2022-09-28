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

  const extraProps = full ? { } : {
    w: "95%",
    mx: "auto"
  };

  return (
    <BaseCard
      backgroundColor={theme.colors.white}
      shadow={shadow ?? "none"}
      style={{
        shadowColor: theme.colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5.84,
        elevation: 4,
      }}
      rounded={8}
      {...extraProps}
      {...props}
    >
      {children}
    </BaseCard>
  );
}

Card.defaultProps = {
  shadow: 2
};
