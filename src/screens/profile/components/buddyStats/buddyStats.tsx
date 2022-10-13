import React from "react";
import { Text, Card, Box, Progress, useTheme } from "native-base";
import { useStore } from "store";
import { Accordion } from "components";
import { titleCase } from "utils";

export function BuddyStats() {
  const { user } = useStore();
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

  const { anatomy } = user.workoutBuddy.data;

  return (
    <Card
      w="90%"
      backgroundColor={theme.colors.white}
      marginBottom={4}
      marginTop={4}
      shadow={2}
    >
      <Accordion title="Stats" secondTitle="Level 1">
      {anatomy.sort((a, b) => a.level < b.level ? 1 : -1).map((bodyPart, i) =>
        createStats(bodyPart.muscleGroup, bodyPart.level, i)
      )}
      </Accordion>
    </Card>
  );
}
