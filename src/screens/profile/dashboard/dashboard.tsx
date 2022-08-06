import React from "react";
import { Text, Heading } from "native-base";
import { useStore } from "store";
import { NavigationProps } from "types";
import { Screen } from "../../../components";

export function Dashboard({ navigation }: NavigationProps) {
  const { user } = useStore();

  if (!user) {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  }

  return (
    <Screen loading={!user}>
      <Heading marginTop="10"> Welcome, {user?.firstName}! </Heading>
      <Text> You are logged in as {user?.email} </Text>
    </Screen>
  );
}
