import React from "react";
import { Text, Heading, Box, Progress, Divider } from "native-base";
import { useStore } from "store";
import { NavigationProps } from "types";
import { Screen } from "components";

export function Dashboard({ navigation }: NavigationProps) {
  const { user } = useStore();

  if (user === null) {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    return <Text> Hold on, we&apos;re moving you </Text>;
  }

  const createStats = (name: string, state: number) => (
    <Box w="80%" marginTop="2" key={name}>
      <Text>
        {name}: {state} / 10
      </Text>
      <Progress
        borderWidth="2"
        borderColor="coolGray.600"
        bg="coolGray.400"
        value={state}
        max={10} // should be upper level range
        mx={4}
        size="md"
      />
    </Box>
  );

  return (
    <Screen loading={!user}>
      <Heading marginTop="10"> Welcome, {user.firstName}! </Heading>
      <Text fontSize="md" fontWeight="semibold">
        Its time to get your workout on!
      </Text>
      <Divider marginTop="4" w="3/4" bg="gray.400" /> 
      <Text fontSize="md" fontWeight="bold" marginTop="10">
        Progress
      </Text>
      <Text fontSize="md">
        &quot;Hows your day going?&quot; - {user.workoutBuddy.name}
      </Text>
      {createStats("Speed", user.workoutBuddy.data.speed)}
      {createStats("Strength", user.workoutBuddy.data.strength)}
    </Screen>
  );
}
