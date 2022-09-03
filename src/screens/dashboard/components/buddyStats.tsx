import React from "react";
import { Text, Box, Progress, useTheme, Heading } from "native-base";
import { useStore } from "store";
import { Card } from "components";

export function BuddyStats() {
  const { user } = useStore();
  const theme = useTheme();

  if (!user) {
    return null;
  }

  const createStats = (name: string, state: number) => (
    <Box marginTop="2" key={name}>
      <Text>
        {name}: {state} / 10
      </Text>
      <Progress
        borderWidth="2"
        borderColor={theme.colors.coolGray[600]}
        bg={theme.colors.coolGray[400]}
        value={state}
        max={10}
        mx={4}
        size="md"
      />
    </Box>
  );

  return (
    <Card
      w="90%"
      backgroundColor={theme.colors.white}
      marginBottom={4}
      marginTop={4}
      shadow={2}
    >
      <Heading size="md" marginBottom={4} marginLeft={2}>
        Progress
      </Heading>

      {createStats("Speed", user.workoutBuddy.data.speed)}
      {createStats("Strength", user.workoutBuddy.data.strength)}
    </Card>
  );
}
