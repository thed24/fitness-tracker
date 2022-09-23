import { useTheme, Text } from "native-base";
import React from "react";

interface BaseProps {
  children: React.ReactNode;
  textAlign?: "left" | "center" | "right";
  color?: string;
}

type Props = BaseProps & any;

export function FormLabel({ children, textAlign, color }: Props) {
  const theme = useTheme();
  return (
    <Text
      color={color}
      textAlign={textAlign}
      marginBottom={2}
      fontSize={16}
      fontWeight="semibold"
    >
      {children}
    </Text>
  );
}

FormLabel.defaultProps = {
  textAlign: "left",
  color: "black",
};
