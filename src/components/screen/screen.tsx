/* eslint-disable react/require-default-props */
import { Heading, HStack, Spinner } from "native-base";
import React, { ReactNode } from "react";
import * as SC from "./screen.style";

interface Props {
  children: ReactNode | ReactNode[];
  loading?: boolean;
}

export function Screen({ children, loading = false }: Props) {
  if (loading) {
    return (
      <SC.Container>
        <HStack marginTop="10" space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading page" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </SC.Container>
    );
  }

  return <SC.Container>{children}</SC.Container>;
}
