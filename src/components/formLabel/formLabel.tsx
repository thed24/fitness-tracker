import { Text } from "native-base";
import React from "react";

interface BaseProps {
  children: React.ReactNode;
  textAlign?: "left" | "center" | "right";
  color?: string;
}

type Props = BaseProps & React.ComponentProps<typeof Text>;

export function FormLabel({ children, textAlign, color, ...props }: Props) {
  return (
    <Text
      color={color}
      textAlign={textAlign}
      marginBottom={2}
      fontSize={16}
      fontWeight="semibold"
      {...props}
    >
      {children}
    </Text>
  );
}

FormLabel.defaultProps = {
  textAlign: "left",
  color: "black",
};
