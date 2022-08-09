import React from "react";
import { Text, Heading, Box } from "native-base";
import { useStore } from "store";
import { NavigationProps } from "types";
import { Screen } from "../../../../components";

export function Dashboard({ navigation }: NavigationProps) {
  const { user } = useStore();

  if (user === null) {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    return <Text> Hold on, we&apos;re moving you </Text>;
  }

  const createStats = (name: string, state: number) => (
    <Box marginTop="2" key={name}>
      <Text fontWeight="semibold">
        {`${name}: `}
        <Text fontWeight="normal">{state}</Text>
      </Text>
    </Box>
  );

  return (
    <Screen loading={!user}>
      <Heading marginTop="10"> Welcome, {user.firstName}! </Heading>
      <Text> You are logged in as {user.email} </Text>

      <Text fontSize="md" marginTop="10">
        &quot;Hows your day going?&quot; - {user.workoutBuddy.name}
      </Text>
      <Text fontWeight="bold" marginTop="4">
        Buddy Progress
      </Text>
      {createStats("Muscle", user.workoutBuddy.data.muscle)}
      {createStats("Power", user.workoutBuddy.data.power)}
      {createStats("Speed", user.workoutBuddy.data.speed)}
      {createStats("Stamina", user.workoutBuddy.data.stamina)}
      {createStats("Strength", user.workoutBuddy.data.strength)}
    </Screen>
  );
}
