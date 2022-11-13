import React, { useState } from "react";
import { Pressable, Tooltip as TooltipBase, useTheme } from "native-base";

interface Props {
  children: React.ReactNode;
  label: string;
}

export function Tooltip({ children, label }: Props) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Pressable onPress={handlePress}>
      <TooltipBase
        label={label}
        placement="top"
        zIndex={100}
        bg={theme.colors.primary[600]}
        color={theme.colors.primary[100]}
        openDelay={500}
      >
        {children}
      </TooltipBase>
    </Pressable>
  );
}
