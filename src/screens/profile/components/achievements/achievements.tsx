import React from "react";
import { Text, Box, Progress, useTheme, HStack } from "native-base";
import { useStore } from "store";
import { Accordion, Card } from "components";
import { titleCase } from "utils";

export function Achievements() {
  const { user } = useStore();
  const theme = useTheme();

  if (!user) {
    return null;
  }

  const mockAchievements = [
    {
      title: "First Workout",
      description: "You completed your first workout!",
      progress: 1,
      total: 1,
      rewards: [
        {
          type: "title",
          value: "Newbie",
        },
      ],
    },
    {
      title: "10 Workouts",
      description: "You completed 10 workouts!",
      progress: 1,
      total: 10,
      rewards: [
        {
          type: "title",
          value: "Begginner",
        },
      ],
    },
    {
      title: "100 Workouts",
      description: "You completed 100 workouts!",
      progress: 1,
      total: 100,
      rewards: [
        {
          type: "title",
          value: "Consistent",
        },
      ],
    },
  ];

  return (
    <Card
      w="90%"
      backgroundColor={theme.colors.white}
      marginBottom={4}
      marginTop={4}
      shadow={2}
    >
      <Accordion title="Achievements">
        {mockAchievements.map((achievement) => (
          <Box
            key={achievement.title}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Box w="100%">
              <Text fontSize="md" fontWeight="semibold">
                {titleCase(achievement.title)}
              </Text>
              <Text fontSize="sm" color={theme.colors.gray[500]}>
                {achievement.description}
              </Text>
              <HStack mt={2}>
                <Text fontSize="sm">{achievement.progress}</Text>
                <Text fontSize="sm">/{achievement.total}</Text>
                <Text ml="auto" fontSize="sm">
                  Unlocks,{" "}
                  {achievement.rewards
                    .map(
                      (reward) => `${reward.type} "${reward.value}"`
                    )
                    .join(", ")}
                </Text>
              </HStack>
              <Progress
                style={{ marginTop: 5 }}
                value={achievement.progress}
                size="md"
                max={achievement.total}
                borderWidth="2"
                borderColor={theme.colors.coolGray[600]}
              />
            </Box>
          </Box>
        ))}
      </Accordion>
    </Card>
  );
}
