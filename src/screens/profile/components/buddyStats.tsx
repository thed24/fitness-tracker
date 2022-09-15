import React from "react";
import { Text, Box, Progress, useTheme } from "native-base";
import { useStore } from "store";
import { Accordion, Card } from "components";

export function BuddyStats() {
  const { user } = useStore();
  const theme = useTheme();

  if (!user) {
    return null;
  }

  const createStats = (name: string, state: number, index: number) => (
    <Box key={`${name}-${index}-container`} marginTop="2">
      <Text key={`${name}-${index}-text`}>
        {name}: {state} / 10
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

  return (
    <Card
      w="90%"
      backgroundColor={theme.colors.white}
      marginBottom={4}
      marginTop={4}
      shadow={2}
    >
      <Accordion title="Progress">
      {user.workoutBuddy.data.anatomy.sort(a => a.level).map((anatomy, i) =>
        createStats(anatomy.muscleGroup, anatomy.level, i)
      )}
      </Accordion>
    </Card>
  );
}
