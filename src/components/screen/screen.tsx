import { Heading, HStack, Spinner, useTheme } from "native-base";
import React, { ReactNode } from "react";
import * as SC from "./screen.style";

interface Props {
  children: ReactNode | ReactNode[];
  loading?: boolean;
  scrollable?: boolean;
}

export function Screen({
  children,
  scrollable = false,
  loading = false,
}: Props) {
  const theme = useTheme();

  if (loading) {
    return (
      <SC.Container backgroundColor={theme.colors.gray[300]}>
        <HStack mt={10} space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading page" />
          <Heading color={theme.colors.primary[500]} fontSize="md">
            Loading
          </Heading>
        </HStack>
      </SC.Container>
    );
  }

  return scrollable 
  ? (
    <SC.ScrollableContainer
      backgroundColor={theme.colors.gray[300]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {children}
    </SC.ScrollableContainer>
  ) 
  : (
    <SC.Container backgroundColor={theme.colors.gray[300]}>
      {children}
    </SC.Container>
  );
}
