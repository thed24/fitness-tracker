import React from "react";
import { Text, Card, Box, Progress, useTheme } from "native-base";
import { Accordion } from "components";
import { titleCase } from "utils";
import { useGetUser } from "api";

export function BuddyStats() {
  const { data: user } = useGetUser();
  const theme = useTheme();

  if (!user) {
    return null;
  }

  const createStats = (name: string, state: number, index: number) => (
    <Box key={`${name}-${index}-container`} marginTop="2">
      <Text key={`${name}-${index}-text`}>
        {titleCase(name)}: {state} / 10
      </Text>
      <Progress
        key={`${name}-${index}-progress`}
        value={state}
        max={10}
      />
    </Box>
  );

  const { anatomy } = user.workoutBuddy.data;
  const level = user.workoutBuddy.data.levelStats.overall;

  return (
    <Card
      w="90%"
      marginTop={4}
    >
      <Accordion title="Stats" secondTitle={`Level ${level}`}>
      {anatomy.sort((a, b) => a.level < b.level ? 1 : -1).map((bodyPart, i) =>
        createStats(bodyPart.muscleGroup, bodyPart.level, i)
      )}
      </Accordion>
    </Card>
  );
}
